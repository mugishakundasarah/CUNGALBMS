const { postBooks, getAllBooks, updateBook, deleteBook } = require('../../../controllers/Documents/Books/book.controller')

const router = require('express').Router()
router.route('/')
/**
     * @swagger
     * /books/:
     *   post:
     *     tags:
     *       - Books
     *     description: Add books
     *     parameters:
     *       - name: body
     *         description: Fields for staff
     *         in: body
     *         required: true
     *         schema: 
     *           type: object
     *           properties: 
     *             title: 
     *               type: string
     *             total:
     *               type: string
     *               description: Total of the same title 
     *               unitPrice:
     *               type: string
     *               description: One book's cost of its type
     *             publisher: 
     *               type: string
     *               description: The book's publishing agency
     *            publishingDate:
     *              type: Date()
     *              description:  If known,the date of the book's publication
     *            category_id:
     *              type:mongoose.Schema.Types.objectId
     *              ref:"docTypeSchema"
     *              description: In identifier of its type
     *            status:
     *              type:string
     *              default: 'Kept'
     *              enum:['Kept', 'At risk', 'Lost']
     *              description: What the book's status is in a library
     *     responses:
     *       200:
     *         description: OK
     */
.post(postBooks)
.get(getAllBooks)
.put(updateBook)
.delete(deleteBook)
module.exports.bookRoutes = router