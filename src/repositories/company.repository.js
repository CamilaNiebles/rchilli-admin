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

module.exports = {
  createRecord
}
