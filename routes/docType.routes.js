const express=require('express');
const { postDocTypes, getAllDocTypes, updateDocType, deleteDocType, getDocTypeById } = require('../controllers/docType.controller');
const router = express.Router();

router.route('/').post(postDocTypes).get(getAllDocTypes)

router.route('/:id').get(getDocTypeById).put(updateDocType).delete(deleteDocType)

module.exports.docTypeRoutes = router;