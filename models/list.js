// Remove random blank lines from this file
const mongoose = require("mongoose")
const activitySchema = require("./activity")

const Schema = mongoose.Schema


const listSchema = new Schema (
    {
        title: {
            type: String,
            required: true
        },
        activities: [activitySchema],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            // use double quotes here to fit with the rest of your coding style
            ref: 'User',

   
        }

        
    }, 
    {
        timestamps: true,
    }
)

const List = mongoose.model("List", listSchema)

module.exports = List