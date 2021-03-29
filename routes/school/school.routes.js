const express = require("express");
const { checkSuperAdmin } = require("../../controllers/users/admin.controllers");
const {createSchool, updateSchool, deleteSchool, getSchool} = require("../../controllers/schools/school.controller")
const { verifyToken } = require("../../utils/checkAuth");
const schoolRoutes = express.Router()
schoolRoutes.route("/")
 /**
  * @swagger
  * /admin/school:
  *   post:
  *     tags:
  *       - school
  *     description: creating a school to which a certain librarian works 
  *     parameters: 
  *       - name: body
  *         description: fields for school routes
  *         in: body
  *         schema: 
  *           type: object
  *           properties: 
  *             schoolName: 
  *               type: string
  *               description: librarian's user name(advised to use real name)
  *             status: 
  *               type: string
  *               description: choose between boarding and day 
  *     responses:
  *       200:   
  *         description: school added
  *         content: 
  *           text/plain:
  *             schema: 
  *               type: string
  */
.post(createSchool)
/**
 * @swagger
 * /admin/school:
 *   get: 
 *     tags:
 *       - school
 *     description: get admin account credentials from the database
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
.get(checkSuperAdmin,getSchool)

schoolRoutes.route("/:id")
/**
 * @swagger
 * /admin/school/{id}:
 *   delete:
 *     tags: 
 *       - school
 *     description: delete  a school in the database
 *     parameters: 
 *        - name: id
 *          description: school id
 *          in: path
 *          required: true
 *          type: string
 *          
 *     responses: 
 *       200: 
 *         description: OK,school deleted
 *        
 */
.delete(checkSuperAdmin,deleteSchool)
/**
  * @swagger
  * /admin/school/{id}:
  *   put:
  *     tags:
  *       - school
  *     description: update the name or status of the school
  *     parameters: 
  *       - name: id
  *         description: school id
  *         in: path
  *         required: true
  *         type: string
  *       - name: body
  *         description: fields for school updation 
  *         in: body
  *         schema: 
  *           type: object
  *           properties: 
  *             schoolName: 
  *               type: string
  *               description: school's name
  *             status: 
  *               type: string
  *               description: the only valid values are day or boarding
  *     
  *     responses:
  *       200:   
  *         description: school added
  *         content: 
  *           text/plain:
  *             schema: 
  *               type: string
  * 
  */
.put(verifyToken,updateSchool)

module.exports.schoolRoutes = schoolRoutes;