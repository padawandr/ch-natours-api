const fs = require('fs')
const path = require('path')

const toursPath = path.join(__dirname, '../dev-data/data/tours-simple.json')
const tours = JSON.parse(fs.readFileSync(toursPath))

exports.checkId = (request, response, next, value) => {
  console.log(`tour id: ${value}`)
  if (Number(value) >= tours.length) {
    return response.status(404).json({
      status: 'fail',
      data: 'invalid id'
    })
  }
  next()
}

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
  response.status(200).json({
    status: 'success',
    data: { tour }
  })
}

exports.updateTour = (request, response) => {
  response.status(200).json({
    status: 'success',
    data: {
      tour: '# updated tour here... #'
    }
  })
}

exports.deleteTour = (request, response) => {
  response.status(204).json({
    status: 'success',
    data: null
  })
}
