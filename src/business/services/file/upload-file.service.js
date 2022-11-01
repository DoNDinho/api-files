'use strict'
const fs = require('fs')
const path = require('path')
const { uploadFile } = require('../../utils/storage/storage')
const FILE_URL = process.env.FILE_URL

const execute = async (file) => {
  try {
    const filePath = path.join(process.cwd(), '/documents/file')
    // const filePath = path.join(__dirname, '../../../../documents/file')
    return { message: filePath }
    await decodeBase64(filePath, file.base64)
    const uploadData = createUploadData(file, filePath)
    await uploadFile(uploadData)
    deleteFile(filePath)
    return { file: { url: createUrl(file) } }
  } catch (error) {
    throw error
  }
}

const decodeBase64 = async (filePath, base64) => {
  await fs.writeFileSync(filePath, base64, 'base64')
}

const createUploadData = (file, filePath) => {
  const uploadData = {
    fileName: file.name,
    fileType: file.type,
    data: filePath
  }
  return uploadData
}

const deleteFile = (filePath) => {
  fs.unlinkSync(filePath)
}

const createUrl = (file) => {
  return `${FILE_URL}${file.name}.${file.type}`
}

module.exports = { execute }
