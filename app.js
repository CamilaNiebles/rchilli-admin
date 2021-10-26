require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const getConnection = require('./src/config/database.init')
const port = process.env.PORT

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

try {
  getConnection('mongodb://localhost/cotti-development')
} catch (error) {
  console.log(error)
}

app.listen(port, () => {
  console.log(`App listen in port ${port}`)
})

module.exports = app
