const Mongoose = require("../../config/connection")

const db = Mongoose.connection

const User = require('../../models/user')


const userId = process.argv[2]


// open connection to db
db.once('open', function () {
    // find a specific list in mongodb
    User.findByIdAndRemove(userId)
        .then
             return list.save()
        
        // printing success or failure
        .then((user) => {
            // turning it to json
            console.log(user.toJSON())
        })
        .catch(console.error)
        // close connection to db
        .finally(() => db.close())
})
