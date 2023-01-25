// require express
const express = require('express')
// require mongoose
const mongoose = require('mongoose')
// require cors
const cors = require('cors')
// require the URI
const db = require('./config/db')

const activityRoutes = require("./routes/activity_routes")
const userRoutes = require("./routes/user_routes")
const listRoutes = require("./routes/list_routes")

const PORT = 8000

mongoose.set('strictQuery', true)

// Create connection with the URI from config/db.js
mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// Using the express function create an express app
const app = express()
app.use(express.json())

app.use(activityRoutes)
app.use(userRoutes)
app.use(listRoutes)

app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})


// exporting app to use elsewhere
module.exports = app