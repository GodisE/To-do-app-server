const express = require('express')
const router = express.Router()

// require list model
const List = require('../models/list')
const { handle404 } = require('../lib/custom_errors')
const { requireToken } = require('../config/auth')

// CREATE
// POST /lists/
router.post('/lists', requireToken, (req, res, next) => {
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
// PATCH /lists/:id
router.patch('/lists/:noteId', requireToken, (req, res, next) => {
	const listId = req.body.activity.listId

	List.findById(listId)
		.then(handle404)
		.then((list) => {
			const activity = list.lists.id(req.params.noteId)
			activity.set(req.body.activity)
			return list.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /lists/:id
router.delete('/lists/:noteId', requireToken, (req, res, next) => {
	const listId = req.body.activity.listId

	List.findById(listId)
		.then(handle404)
		.then((list) => {
			list.lists.id(req.params.noteId).remove()

			return list.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router

