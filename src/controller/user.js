
const { Users, Roles, Devisi, Shift } = require("../models");
const { AuthPayload } = require("../middleware/auth");
const { Response } = require("../utils/response/response");
const { EncryptPassword, CheckPassword, GenerateToken, GeneratePassword } = require("../utils/encrypt/encrypt");
const { TimeZoneIndonesia } = require("../utils/times/timezone");
const auth = require("./auth");
const uuid = require('node-uuid');
const { QueryTypes } = require("sequelize");

module.exports = {
   GetDataUser: async (req, res) => {
      try {
         const auth = req.contextAuth
         console.log('auth', auth)
         // const uid = UUID.parse(auth.uid)
         const id = auth.uid
         // const id = uuid.parse(auth.uid, new Buffer(16))
         // console.log('UID', id)
         // var buffer = Buffer.alloc(16, auth.uid);
         // var interface16 = new Uint16Array(buffer);
         // const dd = `UUID_TO_BIN("${id}")`
         const user = await Users.findOne({
            where: {
               id: id,
               deleted_at: null
            },
            include: [
               {
                  model: Devisi,
                  as: "devisi",
               },
               {
                  model: Shift,
                  as: "shift",
               },
               {
                  model: Roles,
                  as: "role",
               },
            ],
         })
         console.log('LOG-user', user)

         if (!user) {
            res.set('Content-Type', 'application/json')
            res.status(404).send(Response(false, "404", "User not found", null))
            return
         }

         const role = await Roles.findOne({
            where: {
               id: user.id,
            },
            // include: [
            //    {
            //       model: Menus,
            //       as: "menu",
            //       where: {
            //          is_publish: true
            //       },
            //       attributes: {
            //          exclude: ["created_at", "updated_at", "deleted_at"]
            //       }
            //    }
            // ]
         })

         // const devisi = await Devisi.findOne({
         //    where: {
         //       id: user?.id
         //    }
         // })
         // console.log('LOG-Devisi',devisi)

         // const shiftSchedule = await Shift.findOne({
         //    where: {
         //       id: shift?.id
         //    }
         // })

         const dataResponse = {
            uid: user.uid,
            username: user.username,
            fullname: user.fullname,
            fullname: user.fullname,
            devisi: {
               id: user?.devisi?.id,
               title: user?.devisi?.title,
            },
            schedule: {
               title: user?.shift?.title,
               clockIn: user?.shift?.clock_in,
               clockOut: user?.shift?.clock_out,
            },
            Role: {
               id: user?.role?.id,
               title: user?.role?.title,
            }
         }


         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data Found", dataResponse))
      } catch (err) {
         console.log('er', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   }
}