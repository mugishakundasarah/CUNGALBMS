const { postBooks } = require('../../../controllers/Documents/Books/book.controller')

const router = require('express').Router()
router.route('/')
.post(postBooks)


module.exports.bookRoutes = router