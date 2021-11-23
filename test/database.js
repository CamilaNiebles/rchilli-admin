const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

/**
 * Connect to the in-memory database
 */
exports.connect = async () => {
  const mongoTest = await MongoMemoryServer.create()
  // Get the uri
  const uri = mongoTest.getUri()
  // Configure the database options
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  // Generate the connection
  await mongoose.connect(uri, mongooseOpts)
}

exports.closeDatabase = async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
}

exports.clearDatabase = async () => {
  const collections = await mongoose.connection.db.collections()
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}
