const express = require('express')

const Activity = require("../models/activity")
const listSeed = require("../lib/list_seed")
const { requireToken } = require('../config/auth')

const router = express.Router()

const startingActs = [
    {
        name: "Go to moms house",
        location: "Home",
        isComplete: false,
        listId: listSeed[0]
    },
    {
        name: "Clean gutters",
        location: "Home",
        isComplete: false,
        listId: listSeed[1]
    },
    {
        name: "Go to moms house",
        location: "Home",
        isComplete: false,
        listId: listSeed[2]
    }
    

]
router.get("/list", requireToken, (req, res, next) => {
    Activity.deleteMany({})
        .then(() => {
            Activity.create(startingActs)
                .then((lists) => res.status(200).json({ lists: lists }))
        })
})

module.exports = router