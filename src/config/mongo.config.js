const mongoose = require('mongoose')

module.exports = function getConnection({ user, password, cluster, database }) {
  const uri = `mongodb+srv://${user}:${password}@${cluster}/${database}?retryWrites=true&w=majority`
  console.log(uri)
}
