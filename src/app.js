const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()

// middlewares
app.use(express.json())

const toursPath = path.join(__dirname, 'dev-data/data/tours-simple.json')
const tours = JSON.parse(fs.readFileSync(toursPath))

// get all tours
app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  })
})

// get one tour
app.get('/api/v1/tours/:id', (request, response) => {
  const id = Number(request.params.id)
  const tour = tours[id]

  if (tour) {
    response.status(200).json({
      status: 'success',
      data: { tour }
    })
  } else {
    response.status(404).json({
      status: 'fail',
      message: 'invalid id'
    })
  }
})

// set new tour
app.post('/api/v1/tours', (request, response) => {
  const newId = tours.length
  const newTour = Object.assign({ id: newId }, request.body)

  tours.push(newTour)

  fs.writeFile(toursPath, JSON.stringify(tours), () => {
    response.status(201).json({
      status: 'success',
      data: { newTour }
    })
  })
})

app.listen(3333, (err) => {
  if (err) console.log(`🔴 server error: ${err}`)
  else console.log('🟢 back-end started...')
})
