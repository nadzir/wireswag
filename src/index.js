#!/usr/bin/env node
import { start } from './main.js'
import program from 'commander'

program
  .version('1.0.0')
  .option('-s, --swagger [file]', 'swagger files')
  .option('-g, --server [servername]', 'servername')
  .option('-w, --wiremock', 'wiremock')
  .parse(process.argv)

if (!program.swagger) console.warn('please specify a swagger file')
else if (!program.server) console.warn('please specify a servername')
else {
  start(program.swagger, program.server)
}
