
const express = require('express');
const {
  createResource,
  getResources,
  getResource,
  updateResource,
  deleteResource
} = require('../controllers/resourceController.js');
const authMiddleware = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { resourceValidation } = require('../validations/resourceValidation');

const router = express.Router();


router.route('/')
  .get(getResources)
  .post(authMiddleware, authorizeRoles('admin'), validateRequest(resourceValidation), createResource);


router.route('/:id')
  .get(getResource)
  .put(authMiddleware, authorizeRoles('admin'), validateRequest(resourceValidation), updateResource)
  .delete(authMiddleware, authorizeRoles('admin'), deleteResource);

module.exports = router;
