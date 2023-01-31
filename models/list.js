const mongoose = require("mongoose")
const activitySchema = require("./activity")

const Schema = mongoose.Schema


const listSchema = new Schema (
    {
        title: {
            type: String,
            required: true
        },
        activities: [activitySchema]
        
        
    }, 
    {
        timestamps: true,
    }
)

const List = mongoose.model("List", listSchema)

module.exports = List