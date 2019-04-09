const routes = require('express').Router()
const { getCredentials, url } = require('./../config/46elk')
const base64 = require('base-64')
const request = require('request')

routes.get('/:phone', async (req, res) => {
  console.log('hello getting stuff ', req.param.phone)
  res.send('hello')
})

routes.post('/:phone/:message*?', async function (req, res) {
  const phone = req.params.phone.replace('0', '+46')
  console.log(phone)
  sendSms(phone, req.body.message || req.params.message, response => {
    res.status(response.status === 'created' ? 200 : 400).end()
  })
})

async function sendSms(phoneNumber, message, callback) {
  const auth = await getCredentials()
  console.log('get auth', auth)
  let headers = new Headers()
  headers.set(
    'Authorization',
    'Basic ' + base64.encode(auth.user + ':' + auth.pass)
  )
  request.post(
    {
      url: url,
      form: {
        from: auth.phone,
        to: phoneNumber,
        message: message
      },
      auth: {
        user: auth.user,
        pass: auth.pass
      }
    },
    (error, response, body) => {
      console.log(JSON.parse(body).status)
      callback(JSON.parse(body))
    }
  )
}

module.exports = routes
