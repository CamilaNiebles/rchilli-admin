const validateError = function (error) {
  const { code } = error
  if (code === 11000) {
    throw new Error('DuplicateKey')
  }
  return error
}

module.exports = {
  validateError
}
