const routes = require('express').Router()
const elks = require('./../services/46elk')


routes.post('/:phone/:message*?', async function (req, res) {
  const phone = req.params.phone.replace('0', '+46')
  elks.sendSms(phone, req.body.message || req.params.message, response => {
    res.status(response.status).end()
  })
})

module.exports = routes