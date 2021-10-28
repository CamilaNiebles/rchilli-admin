const {
  createRecord,
  getByEmail,
  updateCompany
} = require('../repositories/proxy')
module.exports = async (rchilliData) => {
  const { email, company: companyArray } = rchilliData
  const [company] = companyArray
  try {
    const response = await createRecord(rchilliData)
    return { body: response, status: 201, message: 'record saved' }
  } catch (error) {
    const isRepeated = isRecordRepeated(error)
    if (isRepeated) {
      await validateCompanies(email, company)
      return { body: rchilliData, status: 201, message: 'record saved' }
    }
  }
}

function isRecordRepeated(error) {
  const { message } = error
  if (message === 'DuplicateKey') {
    return true
  }
  return false
}

async function validateCompanies(email, company) {
  const { company: arrayCompanies } = await getByEmail(email)
  const companyExists = arrayCompanies.includes(company)
  if (companyExists) {
    throw new Error(`${email} already exists`)
  }
  return updateCompany(email, company)
}
