//subdoc

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
            ref: 'User'
        }

    }
)

const List = mongoose.model("List", listSchema)

module.exports = List