// Remove random blank lines from this file
const express = require('express')
const router = express.Router()

// require list model
const List = require('../models/list')
const { handle404 } = require('../lib/custom_errors')
const { requireToken } = require('../config/auth')
// Remove `mongoose` imports
const { default: mongoose } = require('mongoose')
const Mongoose = require("../config/connection")


// When naming routes you should always name them after the entity that we are working with. This file is for the activity routes but the routes here are all going to `/list`. They should be going to `/activities`. Also you already have a `/lists` route so having a `/list` route without the `s` could get very confusing.

// CREATE
// POST /activities/
router.post('/list', requireToken, (req, res, next) => {
	const listId = req.body.activity.listId

    const activity = req.body.activity
    activity.owner = req.user._id

	List.findById(listId)
		.then(handle404)
		.then((list) => {
			list.activities.push(req.body.activity)

			return list.save()
		})

		.then((list) => res.status(201).json({ list: list }))
		.catch(next)
})



// UPDATE
// PATCH /activities/:id
router.patch('/list/:activityId', requireToken, (req, res, next) => {
	const listId = req.body.activity.listId

	List.findById(listId)
		.then(handle404)
		.then((list) => {
			const activity = list.activities.id(req.params.activityId)
			activity.set(req.body.activity)
			return list.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /activities/:id
router.delete('/list/:activityId', requireToken, (req, res, next) => {
	const listId = req.body.activity.listId

	List.findById(listId)
		.then(handle404)
		.then((list) => {
			list.activities.id(req.params.activityId).remove()

			return list.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
