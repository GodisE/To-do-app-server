const express = require('express')
const { requireToken } = require('../config/auth')
const { handle404 } = require('../lib/custom_errors')

const List = require("../models/list")

const route = express.Router()



// CREATE
// POST /lists
route.post('/lists', requireToken, (req, res, next) => {
    const activityId = req.body.list.activityId

    const lists = req.body.lists

    lists.owner = req.user._id

    // req.body
    // character: {}
    List.findById(activityId)
    .then(handle404)
    .then(list  => {
        list.activities.push(lists)
        //have to save to t-doc when modified
        return list.save()
    })
    .then(list => {
        res.status(201).json({ list: list })
    })
    .catch(next)
})   

// UPDATE
// PATCH /character/:id
// route.patch("/lists/:id", (req, res, next) => {
//     List.findById(req.params.id)
//     //if completed make not complete and vice versa
//     List.checked = !List.checked
//     res.json(Person)
//     .catch(next)
// })

// // DELETE
// // DELETE /characters/:id
// route.delete('/lists/:id', (req, res, next) => {
//     List.findById(req.params.id)
//         .then(handle404)
//         .then(list => {
//             return list.deleteOne()
//         })
//         .then(() => res.sendStatus(204))
//         .catch(next)
// })

module.exports = route