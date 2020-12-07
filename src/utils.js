'use strict'

const debug = require('debug')
const packageJson = require('../package.json')
const logger = debug(packageJson.name)

function log(...args) {
    logger(args.map(String).join(' '))
}

module.exports = {
    log,
}
