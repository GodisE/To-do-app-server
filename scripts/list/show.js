const Mongoose = require("../../config/connection")

const db = Mongoose.connection

const List = require('../../models/list')

const listId = process.argv[2]
const userActId = process.argv[3]

db.once('open', function () {
    // find a specific list in mongodb
    List.findById(listId)
        .then((list)=>{
            return list.activities.id(userActId)
        })
        // printing success or failure
        .then((list) => {
            // turning it to json
            console.log(list.toJSON())
        })
        .catch(console.error)
        // close connection to db
        .finally(() => db.close())
})

//node scripts/list/show <listId> <userActId>