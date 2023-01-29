const express = require('express')
const { requireToken } = require('../config/auth')

const List = require("../models/list")

const router = express.Router()

const startingList = [
    {
        title: "Self Care"
    },
    {
        title: "Work Week"
    },
    {
        title: "Weekend"
    }
]

router.get("/lists", requireToken, (req, res, next) => {
    List.deleteMany({})
        .then(() => {
                List.create(startingList)
                    .then((lists) => res.status(200).json({ lists: lists }))
        })
        .catch(next)
})

module.exports = router