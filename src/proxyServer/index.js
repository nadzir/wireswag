import express from 'express'
import nineTrack from 'nine-track'
import path from 'path'

export const startProxyServer = (server, proxy) => {
  try {
    express().use(nineTrack({
      url: 'http://' + server,
      fixtureDir: path.join(process.env.PWD, 'directory/to/save/responses')
    })).listen(proxy)
  } catch (error) {
    console.error(error)
  }
}

export const startMockServer = (server, proxy) => {
  try {
    // try {
    //   express().use(function (req, res) {
    //     const response = {
    //       message: 'path was not recorded',
    //       path: req.path
    //     }
    //     res.json(response)
    //   }).listen(server.match(/(\d+)$/i)[0])
    // } catch (error) {
    //   console.error(error)
    // }

    express().use(nineTrack({
      url: 'http://' + server,
      fixtureDir: path.join(process.env.PWD, 'directory/to/save/responses'),
      preventRecording: true
    // normalizeFn: function (info) {
    //   info.url = '/api/products/123'
    // }
    })).listen(proxy)
  } catch (error) {
    console.error(error)
  }
}
