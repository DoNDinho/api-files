const fs = require('fs')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY
  }
})

const uploadFile = async (uploadData) => {
  const { fileName, fileType, data } = uploadData
  const stream = fs.createReadStream(data)
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${fileName}.${fileType}`,
    // ContentType: 'image/png',
    Body: stream
  }
  const command = new PutObjectCommand(uploadParams)
  return await client.send(command)
}

module.exports = { uploadFile }
