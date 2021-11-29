const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  name: { type: String },
  domain: { type: String },
  active: { type: Boolean }
})

const company = mongoose.model('company', companySchema)

module.exports = company
