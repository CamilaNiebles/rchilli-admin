require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`App listen in port ${port}`)
})

module.exports = app
