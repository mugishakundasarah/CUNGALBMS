const { postBooks, getAllBooks, updateBook, deleteBook } = require('../../../controllers/Documents/Books/book.controller')
const {Schema} = require('mongoose');

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
 *         description: Entries for books
 *         in: body
 *         required: true
 *         schema: 
 *           type: object
 *           properties: 
 *             title: 
 *               type: string
 *               description: Book's title
 *             total:
 *               type: string
 *               description: Total of the same title 
 *             unitPrice:
 *               type: string
 *               description: One book's cost of its type
 *             publisher: 
 *               type: string
 *               description: The book's publishing agency
 *             category_id:
 *              type: Schema.Types.objectId
 *              description: In identifier of its type
 *             status:
 *              type: string
 *              description: A book's status in the library("Kept","At risk","Lost")
 *     responses:
 *       200:
 *         description: OK
 */
.post(postBooks)

/**
 * @swagger
 * /books/:
 *   get: 
 *     tags:
 *       - Books
 *     description: Get books from the database
 *     parameters:
 *       - name: page
 *         description: page number
 *         in: query
 *         type: string
 *       - name: limit
 *         description: elements per page
 *         in: query
 *         type: string
 *     responses: 
 *       200:
 *         description: OK
 */
.get(getAllBooks)

router.route('/:id')
/**
* @swagger
* /books/{id}:
*   put:
*     tags:
*       - Books
*     description: update books credentials
*       security: 
 *       - bearerAuth: -[]
*     parameters:
*       - name: id
*         description: book id
*         in: path
*         required: true
*         type: string
*       - name: body
*         description: Updates for books
*         in: body
*         required: true
*         schema: 
*           type: object
*            title: 
 *               type: string
 *               description: Book's title
 *             total:
 *               type: string
 *               description: Total of the same title 
 *             unitPrice:
 *               type: string
 *               description: One book's cost of its type
 *             publisher: 
 *               type: string
 *               description: The book's publishing agency
 *             publishingDate:
 *              type: Date
 *              description:  If known,the date of the book's publication
 *             category_id:
 *              type: mongoose.Schema.Types.objectId
 *              description: In identifier of its type
 *             status:
 *              type: 'String'
 *              description: What the book's status is in a library("Kept","At risk","Lost")
 *             responses:
 *              200:
 *              description: OK
 */
.put(updateBook)

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     tags: 
 *       - Books
 *     description: delete  a book in the database
 *     security: 
 *       - bearerAuth: -[]
 *     parameters: 
 *        - name: id
 *          description: book id
 *          in: path
 *          required: true
 *          type: string
 *          
 *     responses: 
 *       200: 
 *         description: OK,reader deleted
 *        
 */
.delete(deleteBook)
module.exports.bookRoutes = router