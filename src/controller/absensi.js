const { Op } = require('sequelize');
const { Absensi } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia, GetTime, GetDate } = require("../utils/times/timezone");

module.exports = {
   Live: async (req, res) => {
      try {
         const { userId, type, longitude, latitude, photo } = req.body
         let id = req?.query?.id || 0

         var payload = {
            user_id: userId,
            clock_in: GetTime(),
            longitude_clockin: longitude,
            latitude_clockin: latitude,
            photo_clockin: photo,
            created_at: GetDate()
         }

         var condition = {
            where: {
               [Op.and]: [{ id: id }, { user_id: userId }, { created_at: GetDate() }]
            }
         }

         if (type?.toUpperCase() === "CLOCK_OUT") {
            payload = {
               user_id: userId,
               clock_out: GetTime(),
               longitude_clockout: longitude,
               latitude_clockout: latitude,
               photo_clockout: photo,
               updated_at: GetDate()
            }

            condition = {
               where: {
                  [Op.and]: [{ id: id }, { user_id: userId }, { created_at: GetDate() }]
               }
            }
         }

         const abs = Absensi
            .findOne(condition)
            .then(function (obj) {
               // update
               if (obj)
                  return Absensi.update(payload, condition);
               // insert
               return Absensi.create(payload);
            })

         console.log('LOG-Attendance', abs)

         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success", null))
      } catch (err) {
         console.log('LOG-ERR-Get', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
   GetAllByUserID: async (req, res) => {
      try {
         let userId = req?.params?.userId || 0

         var absensi = await Absensi.findAll({
            where: {
               user_id: userId
            }
         })
         const dataObject = []

         absensi.forEach(v => {
            var data = {
               clockIn: v.clock_in,
               clockOut: v.clock_out,
               longitudeClockin: v.longitude_clockin,
               latitudeClockin: v.latitude_clockin,
               longitudeClockout: v.longitude_clockout,
               latitudeClockout: v.latitude_clockout,
               photoClockin: v.photo_clockin,
               photoClockout: v.photo_clockout,
               date: v.created_at
            }
            dataObject.push(data)
         });


         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success", dataObject.reverse()))
      } catch (err) {
         console.log('LOG-ERR-Get', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }

   }
}