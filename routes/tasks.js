const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasks')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, tasksController.getTasks)

router.delete('/deleteTask/:id', tasksController.deleteTask)

router.post('/createTask', tasksController.createTask)

router.post('/updateTask', tasksController.updateTask)

module.exports = router
