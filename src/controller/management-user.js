const UUID = require('uuid');

const { Admin, Donatur } = require("../models");
const { AuthPayload } = require("../middleware/auth");
const { Response } = require("../utils/response/response");
const { EncryptPassword, CheckPassword, GenerateToken, GeneratePassword } = require("../utils/encrypt/encrypt");
const { SendEmailActive } = require("../utils/mail/mail");
const { TimeZoneIndonesia, GetDate } = require("../utils/times/timezone");
const user = require('./user');
const path = require('path');

module.exports = {
   AdminPage: async (req, res) => {
      const generatePassword = await GeneratePassword()

      const data = await Admin.findAll()
      const datas = data.map((item) => {
         return {
            id: item.id,
            fullname: item.fullname,
            email: item.email,
            username: item.username,
            number_phone: item.number_phone,
            is_active: item.is_active ? 'active' : 'inactive',
            created_at: item.created_at,
            updated_at: item.updated_at,
         }
      }
      )

      res.render(path.join(__dirname, '../../src/views/pages/management-user/administrator.ejs'), { data: datas, generatePassword: generatePassword });
   },
   CreateAdmin: async (req, res) => {
      try {
         const { fullname, username, email, password, noTelp, status } = req.body
         const passwordEncrypted = await EncryptPassword(password)

         const payload = {
            fullname: fullname,
            email: email,
            username: username,
            password: passwordEncrypted,
            number_phone: noTelp,
            is_active: status === 'active' ? 1 : 0,
         }

         await Admin.create(payload)


         res.redirect('/management-user/administrator')
      } catch (err) {
         console.log('LOG-ERR-CreateAdmin', err)
         res.set('Content-Type', 'application/json')
         res.status(422).send(Response(false, "422", "Internal Server Error", err))
      }
   },
   UpdateProfileAdmin: async (req, res) => {
      try {
         const { id, fullname, username, email, password, noTelp, status } = req.body
         const passwordEncrypted = await EncryptPassword(password)

         const payload = {
            fullname: fullname,
            email: email,
            username: username,
            password: passwordEncrypted,
            number_phone: noTelp,
            is_active: status === 'active' ? 1 : 0,
         }

         await Admin.update(payload, {
            where: {
               id: id
            }
         })

         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success", null))
      } catch (err) {
         console.log('LOG-ERR-UpdateAdmin', err)
         res.set('Content-Type', 'application/json')
         res.status(422).send(Response(false, "422", "Internal Server Error", null))
      }
   },
   Donatur: async (req, res) => {
      try {
         const data = await Donatur.findAll()
         const datas = data.map((item) => {
            return {
               id: item.id,
               nama: item.fullname,
               email: item.email,
               alamat: item.address,
               noTelp: item.number_phone,
               status: item.status,
               created_at: item.created_at,
               updated_at: item.updated_at,
               url_verified: `/management-user/verify-donatur/${item.id}/VERIFIED`,
               url_rejected: `/management-user/verify-donatur/${item.id}/REJECT`
            }
         }
         )

         res.render(path.join(__dirname, '../../src/views/pages/donasi/donatur.ejs'), { session: req.session, data: datas });
      } catch (err) {
         console.log('LOG-ERR-Donatur', err)
      }
   },
   VerifyDonatur: async (req, res) => {
      try {
         const { id, status } = req.params
         console.log('REQ-params', req.params)
         console.log('REQ-params-status', typeof status, (status == 'VERIFIED'))


         if (status !== 'VERIFIED' && status !== 'REJECT') {
            return res.status(401).json({
               success: false,
               message: 'status must be active or reject'
            });
         }

         const payload = {
            status: status
         }

         await Donatur.update(payload, {
            where: {
               id: id
            }
         })

         if (status == 'VERIFIED') {
            const data = await Donatur.findOne({
               where: {
                  id: id
               }

            })
            // email send
            await SendEmailActive("coozyme.dev@gmail.com")
         }

         res.redirect('/donasi/donatur')
      } catch (err) {
         console.log('LOG-ERR-VerifyDonatur', err)
      }
   }
}