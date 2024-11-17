const { Op } = require('sequelize');
const { Cuti, RequestCuti } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia, GetTime, GetDate } = require("../utils/times/timezone");

module.exports = {
   SetCuti: async (req, res) => {
      try {
         const { userId, limit } = req.body

         await Cuti
            .findOne({
               where: {
                  user_id: userId
               }
            })
            .then(function (obj) {
               // update
               if (obj)
                  return Cuti.update({
                     user_id: userId,
                     limit: limit,
                     created_at: GetDate()
                  }, {
                     where: {
                        user_id: userId,
                     }
                  });
               return Cuti.create({
                  user_id: userId,
                  limit: limit,
                  created_at: GetDate()
               });
            })


         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success", null))
      } catch (err) {
         console.log('LOG-ERR-Get', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
   RequestCuti: async (req, res) => {
      try {
         const { cutiId, type, reason, startDate, endDate } = req.body


         var dataCuti = await Cuti.findOne({
            where: { id: cutiId }
         })

         var limitCuti = dataCuti?.dataValues?.limit
         // console.log('CUTI-=DATS', dataCuti)
         if (limitCuti <= 0) {
            res.set('Content-Type', 'application/json')
            res.status(422).send(Response(false, "422", "max usage cuti", null))
            return
         }

         await RequestCuti.create({
            cuti_id: cutiId,
            type_cuti: type,
            reason: reason,
            status_cuti: "PENDING",
            start_date: startDate,
            end_date: endDate,
            created_at: GetDate()
         });

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success", null))
      } catch (err) {
         console.log('LOG-ERR-Get', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }

   },
   GetAllCutiByCutiId: async (req, res) => {
      try {
         let cutiId = req?.params?.cutiId || 0

         var reqCuti = await RequestCuti.findAll({
            where: { cuti_id: cutiId }
         });

         var dataObject = []
         reqCuti.forEach(v => {
            var data = {
               id: v.id,
               typeCuti: v.type_cuti,
               statusCuti: v.status_cuti,
               reason: v.reason,
               startDate: v.start_date,
               endDate: v.end_date
            }

            dataObject.push(data)
         });



         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success", dataObject))
      } catch (err) {
         console.log('LOG-ERR-Get', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }

   },
   ApproveCuti: async (req, res) => {
      try {
         const { status } = req.body
         let id = req?.params?.id || 0
         let cutiID = req?.params?.cutiID || 0

         console.log('LOG-ID', id, cutiID)
         var st = status?.toUpperCase()
         var dataCuti = await Cuti.findOne({
            where: { id: cutiID }
         })

         var limitCuti = dataCuti?.dataValues?.limit


         if (limitCuti <= 0) {
            res.set('Content-Type', 'application/json')
            res.status(422).send(Response(false, "422", "max usage cuti", null))
            return
         }


         var reqCuti = await RequestCuti.findOne({
            where: { id: id }
         });

         if (reqCuti.length < 1) {
            res.set('Content-Type', 'application/json')
            res.status(422).send(Response(false, "422", "Failed", null))
            return
         }


         const startDate = new Date(reqCuti?.dataValues?.start_date)
         const endDate = new Date(reqCuti?.dataValues?.end_date)

         const timeDifference = endDate - startDate;

         // Calculate the number of days
         const daysDifference = timeDifference / (1000 * 3600 * 24);
         console.log('LOG-daysDifference', daysDifference)

         if (limitCuti < daysDifference) {
            res.set('Content-Type', 'application/json')
            res.status(422).send(Response(false, "422", "max limit cuti", null))
            return
         }

         if (st === "APPROVED") {
            await Cuti.update({
               limit: limitCuti - daysDifference,
               updated_at: GetDate()
            }, {
               where: { id: cutiID }
            })
            await RequestCuti.update({
               status_cuti: "APPROVED"
            }, {
               where: { id: id }
            });

         } else {
            await RequestCuti.update({
               status_cuti: status
            }, {
               where: { id: id }
            });
         }


         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success", null))
      } catch (err) {
         console.log('LOG-ERR-Get', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
   GetCutiUser: async (req, res) => {
      try {
         const auth = req.contextAuth
         const userId = auth.uid

         const dataCuti = await Cuti.findOne({
            where: { user_id: userId }
         })

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success", dataCuti))
      } catch (err) {
         console.log('LOG-ERR-Get', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   }
}