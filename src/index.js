#!/usr/bin/env node
import { start } from './main.js'
import program from 'commander'
import { setup, validateMandatoryInput } from './cli'
import { startProxyServer, startMockServer } from './ProxyServer'

setup(program)

if (validateMandatoryInput(program)) {
  const {record, proxy, server, swagger, playback} = program

  if (record) {
    console.info(`Wireswag: Starting proxy : ${proxy}`)
    console.info(`Wireswag: Recording server : ${server}`)
    startProxyServer(server, proxy)
    console.info('Wireswag: Begin wiring swag...')
    start(swagger, `localhost:${proxy}`)
  } else if (playback) {
    console.info(`Wireswag: Playing back server : ${server} on port : ${proxy}`)
    try {
      startMockServer(server, proxy)
    } catch (error) {
      console.error(error)
    }
  }
} else {
  console.error('Stopping due to errors.')
}
