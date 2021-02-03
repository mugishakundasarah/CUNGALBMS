const express = require('express');
const { postNote, getNotes, updateNote, deleteNote, getNoteById } = require('../../controllers/Notes/notes.controller');
const router = express.Router()
router.route('/').post(postNote).get(getNotes)
router.route('/:id').put(updateNote).delete(deleteNote).get(getNoteById)

module.exports.notesRoutes = router;