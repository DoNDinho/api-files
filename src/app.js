'use strict'
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
global.logger = require('./business/utils/configs/log4js.config')
const healthRoute = require('./client/routes/health')
const filesRoutes = require('./client/routes/files.routes')
const { errorHandler } = require('./client/middlewares/error-handler/error-handler')
const port = process.env.PORT

const app = express()

// Configurando middlewares
app.use(cors())
app.use(bodyParser.json({ limit: '2mb' }))
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))

// Configurando rutas
app.use(healthRoute)
app.use(filesRoutes)

app.use(async (err, req, res, next) => {
  await errorHandler(err, res)
})

// Iniciando servidor
app.listen(port, () => {
  logger.info('Servidor en puerto', port)
})
