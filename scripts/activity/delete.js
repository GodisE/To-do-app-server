const Mongoose = require("../../config/connection")

const db = Mongoose.connection


const List = require('../../models/list')

const listId = process.argv[2]
const actId = process.argv[3]

// open connection to db
db.once('open', function () {
    // find a specific list in mongodb
    List.findById(listId)
        .then((list)=>{
             list.activities.id(actId).remove()
             return list.save()
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

//node scripts/activity/delete.js <listId> <actId>