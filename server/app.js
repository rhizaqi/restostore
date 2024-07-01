if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3456
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/', router)



app.use(errorHandler)

app.listen(port, () => {
  console.log(122333, `Hallooo currently iam live on port ${port}`)
})