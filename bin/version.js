const { program } = require('commander')
const path = require('path')

const { version } = require(path.resolve(__dirname, '../package.json'))
program.version(version)
