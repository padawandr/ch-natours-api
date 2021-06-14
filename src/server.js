const app = require('./app')

app.listen(3333, (err) => {
  if (err) console.log(`🔴 server error: ${err}`)
  else console.log('🟢 back-end started...')
})
