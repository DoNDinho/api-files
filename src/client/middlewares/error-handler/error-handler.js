'use strict'
const errorHandler = (error, res) => {
  const { httpCode, message, errors } = error
  logger.error(error)
  res.status(httpCode ?? 500).json({ message, errors })
}

module.exports = { errorHandler }
