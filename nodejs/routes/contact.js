const express = require('express');
const contactController = require('../controllers/contact');
const router = express.Router();
const cors = require('cors')
	
router.use(cors());

router.use(express.json());

router.get('/', contactController.getAllContacts);
router.get('/:contactID', contactController.getContactDetails);
router.post('/', contactController.addContact);
router.put('/:contactID', contactController.updateContact);
router.delete('/:contactID', contactController.deleteContact);


module.exports = router;
