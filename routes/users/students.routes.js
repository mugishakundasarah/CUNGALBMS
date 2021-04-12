const express = require("express")
const { addStudent, updateStudent, deleteStudent, getStudents, getStudentByClass } = require("../../controllers/users/user.controller")
const studentRoutes = express.Router()

studentRoutes.route('/')
   /**
     * @swagger
     * /students/:
     *   post:
     *     tags:
     *       - student
     *     description: add student
     *     parameters:
     *       - name: body
     *         description: Fields for student
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           properties: 
     *             name:
     *               type: string
     *               description: student's name 
     *             gender:
     *               type: string
     *               description: student's gender("female, male")
     *             Class: 
     *               type: string
     *               description: student's class
     *     responses:
     *       200:
     *         description: OK
     */
 
.post(addStudent)
/**
 * @swagger
 * /students/:
 *   get: 
 *     tags:
 *       - student
 *     description: get student from the database
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
.get(getStudents)

studentRoutes.route('/:id')
/**
* @swagger
* /students/{id}:
*   put:
*     tags:
*       - student
*     description: update student credentials
*     parameters:
*       - name: id
*         description: student id
*         in: path
*         required: true
*         type: string
*       - name: body
*         description: Fields for student
*         in: body
*         required: true
*         schema: 
*           type: object
*           properties: 
*             name:
*               type: string
*               description: student's name 
*             gender:
*               type: string
*               description: student's gender("female, male")
*             Class:
*                type: string
*     responses:
*       200:
*         description: OK
*/
.put(updateStudent)

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     tags: 
 *       - student
 *     description: archive a student
 *
 *     parameters: 
 *        - name: id
 *          description: student id
 *          in: path
 *          required: true
 *          type: string
 *          
 *     responses: 
 *       200: 
 *         description: OK,reader deleted
 *        
 */
 .delete(deleteStudent)


 studentRoutes.route("/class")
 /**
 * @swagger
 * /students/class:
 *   get: 
 *     tags:
 *       - student
 *     description: get student by class name
 *     parameters:
 *       - name: class
 *         description: class name
 *         in: query
 *         type: string 
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
 
 .get(getStudentByClass)
module.exports = {
    studentRoutes : studentRoutes,
}


