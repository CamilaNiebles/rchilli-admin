const {
  createRecord,
  getByEmail,
  updateCompany
} = require('../repositories/proxy.repository')
const {
  createRecord: createRecordCompany
} = require('../repositories/company.repository')
module.exports = async (rchilliData) => {
  const { email, company: companyArray, ...rest } = rchilliData
  const [company] = companyArray
  try {
    const response = await createRecord(rchilliData)
    await createRecordCompany({ email, company, ...rest })
    return { body: response, status: 201, message: 'record saved' }
  } catch (error) {
    const isRepeated = isRecordRepeated(error)
    if (isRepeated) {
      await Promise.all([
        validateCompanies(email, company),
        createRecordCompany({ email, company, ...rest })
      ])
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
