'use strict'

const express = require('express')
const path = require('path')
const { createMiddleware } = require('../src/index.js')

const app = express()

const options = {
    schemaRootPath: path.resolve(__dirname, '../test/schemas'),
}

const mockMiddleware = createMiddleware(options)

app.use('/graphql', mockMiddleware)

app.listen(4000)
