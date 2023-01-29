const Mongoose = require("../../config/connection")

const db = Mongoose.connection

const List = require('../../models/list')

const listId = process.argv[2]

// open connection to db
db.once('open', function () {
	// find a specific character in mongodb
	List.findById(listId)
		// printing success or failure
		.then((list) => {
			// delete the specific character
			return list.deleteOne()
		})
		.then((list) => {
			// turning it to json
			console.log('deleted', list.toJSON())
		})
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})

