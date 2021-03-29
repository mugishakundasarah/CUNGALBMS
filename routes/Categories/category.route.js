const express = require('express');
const { createCategory, getCategories } = require('../../controllers/Categories/category.controller');
const router =  express.Router();

router.route('/').post(createCategory).get(getCategories)
router.route('/:id').get()