const express = require("express")

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

    }
)

// const Activity = mongoose.model("Activity", activitySchema)

module.exports = activitySchema