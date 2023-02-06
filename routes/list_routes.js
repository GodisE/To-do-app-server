const express = require('express')
const { requireToken } = require('../config/auth')
const { handle404 } = require('../lib/custom_errors')
// Remove mongoose require here
const mongoose = require('../config/connection')

const List = require("../models/list")

// remove this connection. We are not connecting here we are connecting in server.js
const db = mongoose.connection

// should be `router`
const route = express.Router()



//INDEX
// this comment does not match what is going on here. When copying and pasting make sure you update everything
// GET /characters
route.get('/lists', requireToken,  (req, res, next) => {
    const userId = req.user._id
    List.find( {owner:userId} )
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
route.get('/lists/:id', requireToken, (req, res, next) => {
    
    // req.body.list.owner = req.user._id
    List.findById(req.params.id)
        .then(handle404)
        .then(list => res.status(200).json({ list: list }))
        .catch(next)
})

// CREATE
// POST /characters
route.post('/lists',requireToken, (req, res, next) => {
    req.body.list.owner = req.user._id
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
route.patch('/lists/:id', requireToken, (req, res, next) => {

	List.findById(req.params.id)
		.then(handle404)
		.then((list) => {
			return list.updateOne(req.body.list)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})


// DELETE
// DELETE /characters/:id
route.delete('/lists/:id', requireToken, (req, res, next) => {
    
    List.findById(req.params.id)
        .then(handle404)
        .then(list => {
            return list.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = route
