const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '/config.env') })

const app = require('./app')

const port = process.env.PORT || 3333
app.listen(port, (err) => {
  if (err) console.log(`🔴 server error: ${err}`)
  else console.log('🟢 back-end started...')
})
