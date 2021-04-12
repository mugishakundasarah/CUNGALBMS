const express = require("express")
const multer = require('multer')
const { createAdmin, login, updateAccount,deleteAccount, getAccount, uploadProfile } = require("../../controllers/users/admin.controllers")
const { verifyToken } = require("../../utils/checkAuth")
const { imageFilter } = require("../../utils/imageFilter")
const { storage } = require("../../utils/storage")
const adminRoutes = express.Router()
let upload = multer({ storage: storage, fileFilter: imageFilter });
adminRoutes.route("/")
 /**
  * @swagger
  * /admin/:
  *   post:
  *     tags:
  *       - Admin
  *     description: all actions that the librarian might need, including delete, create, update and get account.
  *     parameters: 
  *       - name: body
  *         description: fields for admin routes
  *         in: body
  *         schema: 
  *           type: object
  *           properties: 
  *             userName: 
  *               type: string
  *               description: librarian's user name(advised to use real name)
  *             email: 
  *               type: string
  *               description: eg, *username@gmail.com*
  *             password: 
  *               type: string
  *               description: required to be secure
  *     responses:
  *       200:   
  *         description: librarian added
  *         content: 
  *           text/plain:
  *             schema: 
  *               type: string
  */
.post(createAdmin)
/**
 * @swagger
 * /admin/:
 *   get: 
 *     tags:
 *       - Admin
 *     description: get admin account credentials from the database
 *     security:
 *        - bearerAuth: -[]
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
.get(verifyToken, getAccount)
adminRoutes.route("/login")
 /**
  * @swagger
  * /admin/login:
  *   post:
  *     tags:
  *       - Admin
  *     description: login to our application
  *     parameters: 
  *       - name: body
  *         description: fields for login
  *         in: body
  *         schema: 
  *           type: object
  *           properties: 
  *             email: 
  *               type: string
  *               description: eg, *username@gmail.com*
  *             password: 
  *               type: string
  *               description: required to be secure
  *     responses:
  *       200:   
  *         description: authorisation successful
  *         content: 
  *           text/plain:
  *             schema: 
  *               type: string
  * 
  */
.post(login)
adminRoutes.route('/:id')
/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     tags: 
 *       - Admin
 *     description: delete  a reader in the database
 *     security: 
 *       - bearerAuth: -[]
 *     parameters: 
 *        - name: id
 *          description: admin id
 *          in: path
 *          required: true
 *          type: string
 *          
 *     responses: 
 *       200: 
 *         description: OK,reader updated
 *        
 */
.delete(verifyToken, deleteAccount)
/**
  * @swagger
  * /admin/{id}:
  *   put:
  *     tags:
  *       - Admin
  *     description: all actions that the librarian might need, including delete, create, update and get account.
  *     security: 
  *       - bearerAuth: -[]
  *     parameters: 
  *       - name: id
  *         description: admin id
  *         in: path
  *         required: true
  *         type: string
  *       - name: body
  *         description: fields for admin routes
  *         in: body
  *         schema: 
  *           type: object
  *           properties: 
  *             userName: 
  *               type: string
  *               description: librarian's user name(advised to use real name)
  *             email: 
  *               type: string
  *               description: eg, *username@gmail.com*
  *     
  *     responses:
  *       200:   
  *         description: librarian added
  *         content: 
  *           text/plain:
  *             schema: 
  *               type: string
  * 
  */
.put(verifyToken,updateAccount)
adminRoutes.route("/profile")
 /**
  * @swagger
  * /admin/profile:
  *   post:
  *     tags:
  *       - Admin
  *     description: upload school logo
  *     consumes: 
  *       - multipart/form-data
  *     parameters: 
  *       - in: formData
  *         name: SchoolLogo
  *         type: file
  *     produces:
  *        - text/plain
  *     responses:
  *       200:   
  *         description: librarian added
  *         content: 
  *           text/plain:
  *             schema: 
  *               type: string
  */
.post(upload.single('SchoolLogo'),uploadProfile)

module.exports.adminRoutes = adminRoutes