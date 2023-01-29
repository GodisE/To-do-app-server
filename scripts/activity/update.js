const Mongoose = require("../../config/connection")

const db = Mongoose.connection


const List = require('../../models/list')

const listId = process.argv[2]
const actId = process.argv[3]
const actUpdateKey = process.argv[4]
const actUpdateValue = process.argv[5]

db.once('open', function () {
    // find a specific character in mongodb
    List.findById(listId)
        .then((list)=>{
            let item = list.activities.id(actId)
            item[actUpdateKey] = actUpdateValue
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


// node scripts/activity/update.js <listId> <actId> 
                                 //<actUpdateKey> <actUpdateValue>