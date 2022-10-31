const express = require('express')
const uploadFileService = require('../../business/services/file/upload-file.service')
const router = express.Router()

router.post(`/Files/v1/files`, async (req, res, next) => {
  try {
    const response = await uploadFileService.execute(req.body.file)
    logger.info({ message: 'Archivo subido' })
    res.json(response)
  } catch (error) {
    console.log('error: ', error.message)
    next(error)
  }
})

module.exports = router
