const Mongoose = require("../../config/connection")

const db = Mongoose.connection

const List = require('../../models/list')

const userInputTitle = process.argv[2]
const userInputActName = process.argv[3]
const userInputActLocation = process.argv[4]
const userInputIsComplete = process.argv[5]

const actObj = {
    name: userInputActName,
    location: userInputActLocation,
    isComplete: userInputIsComplete
}

db.once('open', function () {
	// save person to mongodb
	List.create({
		title: userInputTitle,
		activities: [actObj]
	})
		// printing success or failure
		.then(console.log)
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})

// node scripts/list/create.js <userInputTitle> <userInputActName> 
                             //<userInputActName> <userInputActName>