const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()

// middleware
app.use(express.json())

const toursPath = path.join(__dirname, 'dev-data/data/tours-simple.json')
const tours = JSON.parse(fs.readFileSync(toursPath)) // json to obj

app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({ // obj to json
    status: 'success',
    results: tours.length,
    data: { tours }
  })
})

app.post('/api/v1/tours', (request, response) => {
  const newId = tours.length // tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, request.body) // merge properties

  tours.push(newTour)

  fs.writeFile(toursPath, JSON.stringify(tours), () => { // obj to json
    response.status(201).json({ // obj to json
      status: 'created',
      data: { newTour }
    })
  })
})

app.listen(3333, (err) => {
  if (err) console.log(`🔴 server error: ${err}`)
  else console.log('🟢 back-end started...')
})
