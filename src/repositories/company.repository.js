const RchilliCompany = require('../models/company.model')

const createRecord = async function (rchilliData) {
  try {
    const rchilliRecord = new RchilliCompany(rchilliData)
    const response = await rchilliRecord.save()
    return response
  } catch (error) {
    throw validateError(error)
  }
}

const getByEmail = async function (email) {
  try {
    const response = await RchilliCompany.find({ email }).lean()
    return response
  } catch (error) {
    throw error
  }
}

module.exports = {
  createRecord,
  getByEmail
}
