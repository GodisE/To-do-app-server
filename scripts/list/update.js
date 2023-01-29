const Mongoose = require("../../config/connection")

const db = Mongoose.connection

const List = require('../../models/list')

const listId = process.argv[2]
const listKey = process.argv[3]
const listValue = process.argv[4]

db.once('open', function () {
	// find a specific list in mongodb
	List.findById(listId)
		.then((list) => {
			// update the list object with the passed in key and value
			list[listKey] = listValue

			// then save the list document in the database
			return list.save()
		})
		.then((list) => {
			console.log(list.toJSON())
		})
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})

//node scripts/list/update.js <listId> <listKey> <listValue>