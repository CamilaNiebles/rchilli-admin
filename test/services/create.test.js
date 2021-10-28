const create = require('../../src/services/create.proxy')
const dbHandler = require('../database')

//validate connection  to in memory mongo server
beforeAll(async () => await dbHandler.connect())

//clear all collection in database
afterEach(async () => await dbHandler.clearDatabase())

//close connection to database
afterAll(async () => await dbHandler.closeDatabase())

describe('Create a rchilli record', () => {
  test('Should return an object with status, body and message', async () => {
    const { body, status, message } = await create()
    expect(body && status && message !== undefined).toBeTruthy()
  })
  test('Should get a status code 201', async () => {
    const { status: response } = await create()
    expect(response).toBe(201)
  })
})
