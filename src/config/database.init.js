const mongoose = require('mongoose')
module.exports = async function createConnection(connectionString) {
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
  }
  mongoose.connect(connectionString, connectionOptions)
}
