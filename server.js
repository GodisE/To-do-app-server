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
const requestLogger = require("./lib/request_logger")
const listSeed = require("./lib/list_seed")
const actSeed = require("./lib/act_seed")

const PORT = 8000

mongoose.set('strictQuery', true)

// Create connection with the URI from config/db.js
mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// Using the express function create an express app
const app = express()

app.use(cors({ origin: `http://127.0.0.1:5501` }))



app.use(express.json())
app.use(requestLogger)
app.use(activityRoutes)
app.use(userRoutes)
app.use(listRoutes)
app.use("/seed" ,listSeed)
app.use("/seed", actSeed)

// app.get("/", (req, res, next) => {
// 	res.send("<h1>This is the root of my page</h1>")
// })

// app.get("/sign-in", (req, res, next) => {
// 	res.send("<h1>This is the sign in pg</h1>")
// })
	
// app.get("/sign-up", (req, res, next) => {
// 	res.send("<h1>This is the sign up pg</h1>")
// })

// app.get("/list", (req, res, next) => {
// 	res.send("<h1>This is the activity page</h1>")
// })

// app.get("/lists", (req, res, next) => {
// 	res.send("<h1>This is where my lists will be</h1>")
// })

// app.get("/list/:activityId", (req, res, next) => {
// 	res.send("<h1>Update, Show, Delete activity</h1>")
// })

// app.get("/list/:activityId", (req, res, next) => {
// 	res.send("<h1>Update, Show, Delete activity</h1>")
// })

// app.get("/lists/:id", (req, res, next) => {
// 	res.send("<h1>Update, Show, Delete list</h1>")
// })

// app.get("/lists", (req, res, next) => {
// 	res.send("<h1>Create, Update list</h1>")
// })

app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})




// exporting app to use elsewhere
module.exports = app