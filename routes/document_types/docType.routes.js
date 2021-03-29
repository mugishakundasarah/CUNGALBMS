const express=require('express');
const { postDocTypes, getAllDocTypes, updateDocType, deleteDocType, getDocTypeById } = require('../../controllers/document_types/docType.controller');
const router = express.Router();

router.route('/')
/**
 * @swagger
 * /docType/:
 *   post:
 *     tags:
 *       - Document types
 *     description: Add document types
 *     parameters:
 *      - name:body
 *        description: Fields for document type
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *               type: string
 *               description: Document type's name
 *     responses:
 *       200:
 *         description: OK
 */
.post(postDocTypes)
/**
 * @swagger
 * /docType/:
 *   get:
 *     tags:
 *       - Document types
 *     description: Check created categories
 *     parameters:
 *       - name: page
 *         description: page number
 *         in: query
 *         type: string
 *       - name: limit
 *         description: Elements per page
 *         in: query
 *         type:string
 *    responses:
 *      200:
 *        description: OK
 */
.get(getAllDocTypes)

router.route('/:id')
/**
 * @swagger
 * /docType/{id}:
 *   put:
 *     tags:
 *       - Document types
 *     description: Update a document type's credentials
 *       security:
 *         - bearerAuth: -[]
 *     parameters:
 *       - name: id
 *         description: Document id
 *         in:path
 *         required:true
 *         type: string
*        - name: body
*          description: Updates for books
*          in: body
*          required: true
*          schema: 
*           type: object
*            title: 
 *               type: string
 *               description: Book's title
 */
.get(getDocTypeById).put(updateDocType).delete(deleteDocType)

module.exports.docTypeRoutes = router;