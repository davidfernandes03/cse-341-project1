const router = require('express').Router();
const contactsController = require('../controllers/contacts');
const asyncHandler = require('../utils/asyncHandler');
const { contactValidationRules, validate } = require('../middlewares/validation');

router.get('/', asyncHandler(contactsController.getAllContacts));
router.get('/:id', asyncHandler(contactsController.getContactById));
router.post('/', contactValidationRules, validate, asyncHandler(contactsController.createContact));
router.put('/:id', contactValidationRules, validate, asyncHandler(contactsController.updateContact));
router.delete('/:id', asyncHandler(contactsController.deleteContact));

module.exports = router;