const Mongoose = require("../../config/connection")

const db = Mongoose.connection

const List = require('../../models/list')

const listId = process.argv[2]
const nameinput = process.argv[3]
const locationInput = process.argv[4]
const isCompleteInput = process.argv[5]
const ownerInput = process.argv[6]

db.once("open", function() {
	List.findById(listId)
    .populate("owner")
		.then((list) => {
			list.activities.push({
				name: nameinput,
				location: locationInput,
				isComplete: isCompleteInput,
                owner: ownerInput
			})
			return list.save()
		})
		.then((list) => {
			return list.toJSON()
		})
		.catch(console.error)
		.finally(() => db.close())
})