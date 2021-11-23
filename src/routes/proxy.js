const express = require('express')
const create = require('../services/create.proxy')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const {
      body: { rchilliData }
    } = req
    const response = await create(rchilliData)
    res.send(response)
  } catch (error) {
    res.send({ error }).status(400)
  }
})

module.exports = router
