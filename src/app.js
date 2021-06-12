const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

const express = require('express')
const app = express()

// native middleware
app.use(express.json())
app.use(morgan('dev'))
// custom middleware
app.use((request, response, next) => {
  request.time = new Date().toISOString()
  next()
})

const toursPath = path.join(__dirname, 'dev-data/data/tours-simple.json')
const tours = JSON.parse(fs.readFileSync(toursPath))

const getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: request.time,
    data: { tours }
  })
}

const createTour = (request, response) => {
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

const getAllUsers = (request, response) => {
  response.status(500).json({
    status: 'error',
    message: 'route not yet defined'
  })
}

const createUser = (request, response) => {
  response.status(500).json({
    status: 'error',
    message: 'route not yet defined'
  })
}

const getUser = (request, response) => {
  response.status(500).json({
    status: 'error',
    message: 'route not yet defined'
  })
}

const updateUser = (request, response) => {
  response.status(500).json({
    status: 'error',
    message: 'route not yet defined'
  })
}

const deleteUser = (request, response) => {
  response.status(500).json({
    status: 'error',
    message: 'route not yet defined'
  })
}
// new routes definition
const tourRouter = express.Router()
const userRouter = express.Router()
// middlewares
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

tourRouter.route('/')
  .get(getAllTours)
  .post(createTour)

tourRouter.route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

userRouter.route('/')
  .get(getAllUsers)
  .post(createUser)

userRouter.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

app.listen(3333, (err) => {
  if (err) console.log(`🔴 server error: ${err}`)
  else console.log('🟢 back-end started...')
})
