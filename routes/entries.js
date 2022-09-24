const express = require('express')
const router = express.Router()
const entriesController = require('../controllers/entries')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, entriesController.getEntries)

router.delete('/deleteEntry/:id', entriesController.deleteEntry)

router.post('/addEntry', entriesController.addEntry)

module.exports = router
