const Rchilli = require('../models/rchilli.model')
const { validateError } = require('./utils.repository')

const createRecord = async function (rchilliData) {
  try {
    const rchilliRecord = new Rchilli(rchilliData)
    const response = await rchilliRecord.save()
    return response
  } catch (error) {
    throw validateError(error)
  }
}

const updateCompany = async function (email, company) {
  try {
    const response = await Rchilli.findOneAndUpdate(
      { email },
      { $push: { company } }
    )
    return response
  } catch (error) {
    throw error
  }
}

const getByEmail = async function (email) {
  try {
    const response = await Rchilli.findOne({ email }).lean()
    return response
  } catch (error) {
    throw error
  }
}

module.exports = {
  createRecord,
  getByEmail,
  updateCompany
}
