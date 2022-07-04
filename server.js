'use strict'

const express = require('express')

const app = express()
const PORT = '3000' || process.env.PORT

app.use(express.static('dist'))

app.get('/*', (req, res) => (
  res.sendFile(`${__dirname}/views/index.html`, (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
))

app.listen(PORT, () => (
  console.log(`Cognito server is listening on ${PORT}`)
))
