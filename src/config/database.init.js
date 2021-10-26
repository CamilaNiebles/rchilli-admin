const mongoose = require('mongoose')
module.exports = async function createConnection(connectionString) {
  const connectionOptions = {
    useNewUrlParser: true,
    appname: `${process.env.APP_NAME}`,
    useUnifiedTopology: true
  }
  mongoose.connect(connectionString, connectionOptions)
}
