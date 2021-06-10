const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'dev-data/data/tours-simple.json'))
)

app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  })
})

app.listen(3333, (err) => {
  if (err) console.log(`🔴 server error: ${err}`)
  else console.log('🟢 back-end started...')
})
