const fs = require('fs')
const path = require('path')

const toursPath = path.join(__dirname, '../dev-data/data/tours-simple.json')
const tours = JSON.parse(fs.readFileSync(toursPath))

exports.getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: request.time,
    data: { tours }
  })
}

exports.createTour = (request, response) => {
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

exports.getTour = (request, response) => {
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

exports.updateTour = (request, response) => {
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

exports.deleteTour = (request, response) => {
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
