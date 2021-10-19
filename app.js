require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const getConnection = require('./src/config/mongo.config')
const port = process.env.PORT

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

try {
  getConnection({
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    cluster: process.env.MONGO_CLUSTER,
    database: process.env.MONGO_DATABASE
  })
} catch (error) {
  console.log(error)
}

app.listen(port, () => {
  console.log(`App listen in port ${port}`)
})

module.exports = app
