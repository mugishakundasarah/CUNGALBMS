const express = require('express');
const { postNote, getNotes, updateNote, deleteNote, getNoteById } = require('../../controllers/Notes/notes.controller');
const router = express.Router()
router.route('/')
/**
 * @swagger
 * /notes/:
 *   post:
 *     tags:
 *       - Notes
 *     description: Add notes
 *     parameters:
 *       - name: body
 *         description: New note
 *         in: body
 *         required: true
 *         schema: 
 *           type: object
 *           properties: 
 *             title: 
 *               type: string
 *               description: Note's title
 *             body:
 *               type: string
 *               description: The note's body
 *             status:
 *              type: string
 *              description: Note's status (saved/draft)
 *     responses:
 *       200:
 *         description: OK
 */
.post(postNote)
.get(getNotes)
router.route('/:id').put(updateNote).delete(deleteNote).get(getNoteById)

module.exports.noteRoutes = router;