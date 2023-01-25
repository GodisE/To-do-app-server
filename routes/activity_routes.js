const express = require('express')
const { requireToken } = require('../config/auth')
const { handle404 } = require('../lib/custom_errors')

const Activity = require("../models/activity")

const route = express.Router()

//INDEX
// GET /characters
route.get('/activities',  (req, res, next) => {
    Activity.find()
        .then(activities => {
            // THIS is not Array.protype.map
            // document method (model method) .map
            return activities.map(activity => activity)
        })
        .then(activities => res.status(200).json({ activities: activities }))
        .catch(next)
    })

 // SHOW
// GET /characters/:id
route.get('/activities/:id', (req, res, next) => {
    Activity.findById(req.params.id)
        .then(handle404)
        .then(activity => res.status(200).json({ activity: activity }))
        .catch(next)
})

// CREATE
// POST /characters
route.post('/activities', (req, res, next) => {
    // req.body
    // character: {}
    Activity.create(req.body.activity)
        .then(activity => {
            // top lvl of this object is character
            res.status(201).json({ activity: activity })
        })
        .catch(next)
})   

// UPDATE
// PATCH /character/:id
route.patch("/activities/:id", (req, res, next) => {
    Activity.findById(req.params.id)
    //if completed make not complete and vice versa
    Activity.checked = !Activity.checked
    res.json(Person)
    .catch(next)
})

// DELETE
// DELETE /characters/:id
route.delete('/activities/:id', (req, res, next) => {
    Activity.findById(req.params.id)
        .then(handle404)
        .then(activity => {
            return activity.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = route