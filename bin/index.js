#!/usr/bin/env node
const { program } = require('commander')
require('./version')
require('./image')
require('./qrcode')
program.parse(process.argv)
