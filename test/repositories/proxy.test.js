const dbHandler = require('../database')
const {
  createRecord,
  getByEmail,
  updateCompany
} = require('../../src/repositories/proxy')
const rchilliDocMock = require('../mocks/rchilli.document')

//validate connection  to in memory mongo server
beforeAll(async () => await dbHandler.connect())

//clear all collection in database
afterEach(async () => await dbHandler.clearDatabase())

//close connection to database
afterAll(async () => await dbHandler.closeDatabase())

describe('Create a new record', () => {
  test('Should create the record and return the data sent', async () => {
    const response = await createRecord(rchilliDocMock)
    const { email } = response
    expect(email).toEqual(rchilliDocMock.email)
  })
  test('Should not create a record if the email exists', async () => {
    await createRecord(rchilliDocMock)
    try {
      await createRecord(rchilliDocMock)
    } catch (error) {
      expect(error.message).toEqual('DuplicateKey')
    }
  })
})
describe('Get by email', () => {
  beforeEach(async () => {
    await createRecord(rchilliDocMock)
  })
  test('Should return data with the email mock', async () => {
    const response = await getByEmail(rchilliDocMock.email)
    const { email } = response
    expect(email).toEqual(rchilliDocMock.email)
  })
})
describe('Update company array', () => {
  beforeEach(async () => {
    await createRecord(rchilliDocMock)
  })
  test('Should return two as a length of the company if is updated', async () => {
    const { email } = rchilliDocMock
    await updateCompany(email, 'newCompany')
    const { company } = await getByEmail(email)
    expect(company.length).toBe(2)
  })
})
