const { getByEmail } = require('../../src/repositories/proxy')
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
