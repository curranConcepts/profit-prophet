const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard') 
const entriesController = require('../controllers/entries')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, dashboardController.getDashboard)

router.post('/entries', ensureAuth, entriesController.addEntry)


module.exports = router