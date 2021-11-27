require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const getConnection = require('./src/config/database.init')
const port = process.env.PORT
const proxy = require('./src/routes/proxy')
const company = require('./src/routes/company');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/rchilli', proxy)
app.use('/company', company);

try {
  getConnection(process.env.MONGO_REPLICA_SET)
} catch (error) {
  console.log(error)
}

app.listen(port, () => {
  console.log(`App listen in port ${port}`)
})

module.exports = app
