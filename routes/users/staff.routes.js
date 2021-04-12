const express = require("express")
const { addStaff, updateStaff, deleteStaff, getStaff } = require("../../controllers/users/staff.controller")
const staffRoutes = express.Router()
const {verifyToken} = require("../../utils/checkAuth")

staffRoutes.route('/')
   /**
     * @swagger
     * /staff/:
     *   post:
     *     tags:
     *       - staff
     *     description: add staff member 
     *     parameters:
     *       - name: body
     *         description: Fields for staff
     *         in: body
     *         required: true
     *         schema: 
     *           type: object
     *           properties: 
     *             email: 
     *               type: string
     *             name:
     *               type: string
     *               description: staff's name
     *     responses:
     *       200:
     *         description: OK
     */
 
.post(verifyToken,addStaff)
/**
 * @swagger
 * /staff/:
 *   get: 
 *     tags:
 *       - staff
 *     description: get staff from the database
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
.get(verifyToken,getStaff)

staffRoutes.route('/:id')
/**
* @swagger
* /staff/{id}:
*   put:
*     tags:
*       - staff
*     description: update staff credentials
*     parameters:
*       - name: id
*         description: staff id
*         in: path
*         required: true
*         type: string
*       - name: body
*         description: Fields for staff
*         in: body
*         required: true
*         schema: 
*           type: object
*           properties: 
*             email: 
*               type: string
*             name:
*               type: string
*               description: staff's first name 
*     responses:
*       200:
*         description: OK
*/
.put(verifyToken,updateStaff)

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     tags: 
 *       - staff
 *     description: archive a staff member
 *
 *     parameters: 
 *        - name: id
 *          description: staff id
 *          in: path
 *          required: true
 *          type: string
 *          
 *     responses: 
 *       200: 
 *         description: OK,reader deleted
 *        
 */
 .delete(verifyToken,deleteStaff)

module.exports.staffRoutes = staffRoutes;


