const Mongoose = require("../../config/connection")

const db = Mongoose.connection

const List = require('../../models/list')

// open connection to db
db.once('open', function () {
	// find all character documents in mongodb
	List.find()
    
		// printing success or failure
		.then((list) => {
			// loop through each character document
			list.forEach((list) => {
				// turning it to json
				console.log(list.toJSON())
			})
		})
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})
