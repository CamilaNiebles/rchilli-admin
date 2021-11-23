const mongoose = require('mongoose')

const rchilliCompanySchema = new mongoose.Schema({
  email: { type: String },
  fileUrl: { type: String },
  company: { type: String },
  Name: { type: Object },
  DateOfBirth: { type: String },
  Gender: { type: String },
  MaritalStatus: { type: String },
  Nationality: { type: String },
  LanguageKnown: { type: Object },
  PhoneNumber: { type: Object },
  Address: { type: Object },
  CurrentSalary: { type: Object },
  ExpectedSalary: { type: Object },
  SegregatedQualification: { type: Object },
  SegregatedCertification: { type: Object },
  SegregatedSkill: { type: Object },
  SegregatedExperience: { type: Object },
  CurrentEmployer: { type: String },
  JobProfile: { type: String },
  WorkedPeriod: { type: Object },
  GapPeriod: { type: String },
  Summary: { type: String },
  Achievements: { type: String },
  DetailResume: { type: String },
  SegregatedAchievement: { type: Object },
  References: { type: String }
})

const rchilliCompany = mongoose.model('rchilliCompany', rchilliCompanySchema)

module.exports = rchilliCompany
