const express = require('express')
const { requireToken } = require('../config/auth')
const { handle404 } = require('../lib/custom_errors')

const List = require("../models/list")

const route = express.Router()



//INDEX
// GET /characters
route.get('/lists',  (req, res, next) => {
    List.find()
        .then(lists => {
            // THIS is not Array.protype.map
            // document method (model method) .map
            return lists.map(list => list)
        })
        .then(lists => res.status(200).json({ lists: lists }))
        .catch(next)
    })

 // SHOW
// GET /characters/:id
route.get('/lists/:id', (req, res, next) => {
    List.findById(req.params.id)
        .then(handle404)
        .then(list => res.status(200).json({ list: list }))
        .catch(next)
})

// CREATE
// POST /characters
route.post('/lists', (req, res, next) => {
    // req.body
    // character: {}
    List.create(req.body.list)
        .then(list => {
            // top lvl of this object is character
            res.status(201).json({ list: list })
        })
        .catch(next)
})   

// UPDATE
// PATCH /character/:id
route.patch("/lists/:id", (req, res, next) => {
    List.findById(req.params.id)
    //if completed make not complete and vice versa
    List.checked = !List.checked
    res.json(Person)
    .catch(next)
})

// DELETE
// DELETE /characters/:id
route.delete('/lists/:id', (req, res, next) => {
    List.findById(req.params.id)
        .then(handle404)
        .then(list => {
            return list.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = route