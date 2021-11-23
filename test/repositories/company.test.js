const dbHandler = require('../database')
const rchilliDocMock = require('../mocks/company.document')
const { createRecord } = require('../../src/repositories/company.repository')

//validate connection  to in memory mongo server
beforeAll(async () => await dbHandler.connect())

//clear all collection in database
afterEach(async () => await dbHandler.clearDatabase())

//close connection to database
afterAll(async () => await dbHandler.closeDatabase())

describe('Create a new company record', () => {
  test('Should return the new id from the document in the collection', async () => {
    const response = await createRecord(rchilliDocMock)
    const { _id } = response
    expect(_id !== undefined).toBeTruthy()
  })
  test('Should return company as a string', async () => {
    const { company } = await createRecord(rchilliDocMock)
    expect(typeof company).toBe('string')
  })
  test('Should create the record twice, with the same email', async () => {
    const { email: firstEmail } = await createRecord(rchilliDocMock)
    const { email: secondEmail } = await createRecord(rchilliDocMock)
    expect(firstEmail).toEqual(secondEmail)
  })
})
