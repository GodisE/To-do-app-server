const Mongoose = require("../../config/connection")

const db = Mongoose.connection

const User = require('../../models/user')

const usernameInput = process.argv[2]
const passwordInput = process.argv[3]

db.once('open', function () {
	// save person to mongodb
	User.create({
		userName: usernameInput,
		password: passwordInput
	})
		// printing success or failure
		.then(console.log)
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})
