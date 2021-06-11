const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()

// middlewares
app.use(express.json())

const toursPath = path.join(__dirname, 'dev-data/data/tours-simple.json')
const tours = JSON.parse(fs.readFileSync(toursPath))

const getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  })
}

const setNewTour = (request, response) => {
  const newId = tours.length
  const newTour = Object.assign({ id: newId }, request.body)

  tours.push(newTour)

  fs.writeFile(toursPath, JSON.stringify(tours), () => {
    response.status(201).json({
      status: 'success',
      data: { newTour }
    })
  })
}

const getTour = (request, response) => {
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
}

const updateTour = (request, response) => {
  if (Number(request.params.id) < tours.length) {
    response.status(200).json({
      status: 'success',
      data: {
        tour: '# updated tour here... #'
      }
    })
  } else {
    response.status(404).json({
      status: 'fail',
      data: 'invalid id'
    })
  }
}

const deleteTour = (request, response) => {
  if (Number(request.params.id) < tours.length) {
    response.status(204).json({
      status: 'success',
      data: null
    })
  } else {
    response.status(404).json({
      status: 'fail',
      data: 'invalid id'
    })
  }
}

app.route('/api/v1/tours')
  .get(getAllTours)
  .post(setNewTour)

app.route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

app.listen(3333, (err) => {
  if (err) console.log(`🔴 server error: ${err}`)
  else console.log('🟢 back-end started...')
})
