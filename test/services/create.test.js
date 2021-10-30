const { getByEmail } = require('../../src/repositories/proxy.repository')
const {
  getByEmail: getByEmailInCompany
} = require('../../src/repositories/company.repository')
const create = require('../../src/services/create.proxy')
const dbHandler = require('../database')
const rchilliDocMock = require('../mocks/rchilli.document')

//validate connection  to in memory mongo server
beforeAll(async () => await dbHandler.connect())

//clear all collection in database
afterEach(async () => await dbHandler.clearDatabase())

//close connection to database
afterAll(async () => await dbHandler.closeDatabase())

describe('Create a rchilli record', () => {
  test('Should return an object with status, body and message', async () => {
    const { body, status, message } = await create(rchilliDocMock)
    expect(body && status && message !== undefined).toBeTruthy()
  })
  test('Should get a status code 201', async () => {
    const { status: response } = await create(rchilliDocMock)
    expect(response).toBe(201)
  })
  test('If the email exists but the data has a new company, the record should be updated', async () => {
    await create(rchilliDocMock)
    const { company, ...rest } = rchilliDocMock
    await create({
      company: ['new company'],
      ...rest
    })
    const { company: newCompaniesArray } = await getByEmail(
      rchilliDocMock.email
    )
    expect(newCompaniesArray.length).toEqual(2)
  })
})

describe('Create also the record in company collection', () => {
  beforeEach(async () => {
    await create(rchilliDocMock)
  })
  test('Should create the register in rchilli and company collection', async () => {
    const { email } = rchilliDocMock
    const { _id } = await getByEmail(email)
    const recordInCompany = await getByEmailInCompany(email)
    expect(_id !== undefined).toBeTruthy()
    expect(recordInCompany.length).toBe(1)
  })
  test('Should not return two register from the company collection if the email is repeated', async () => {
    const { email } = rchilliDocMock
    try {
      await create(rchilliDocMock)
      const recordInCompany = await getByEmailInCompany(email)
      expect(recordInCompany.length).toBe(1)
    } catch (error) {
      expect(error.message).toEqual(`${email} already exists`)
    }
  })
  test('Should return two elements from company collection if the company is new', async () => {
    const { company, email, ...rest } = rchilliDocMock
    await create({
      company: ['new company'],
      email,
      ...rest
    })
    const [firstRecord, secondRecord] = await getByEmailInCompany(email)
    expect(firstRecord.company === secondRecord.company).toBeFalsy()
  })
})
