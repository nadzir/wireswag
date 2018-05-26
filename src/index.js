#!/usr/bin/env node
import { start } from './main.js'
import program from 'commander'
import { setup, validateMandatoryInput } from './cli'

setup(program)

if (validateMandatoryInput(program)) {
  console.info('Wireswag: Begin wiring swag...')
  start(program.swagger, program.server)
} else {
  console.error('Stopping due to errors.')
}
