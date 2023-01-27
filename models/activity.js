

const mongoose = require("mongoose")

const Schema = mongoose.Schema

const activitySchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        isComplete: {
            type: Boolean,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
   
        }


    }
)



module.exports = activitySchema