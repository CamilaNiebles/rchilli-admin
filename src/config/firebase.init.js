require('dotenv').config()
const admin = require('firebase-admin')
admin.initializeApp({
  projectId: process.env.PROJECT_ID,
  serviceAccountId: process.env.CLIENT_EMAIL
})
const db = admin.firestore()

module.exports = {
  db
}
