const MyContactModel = require('../models/contact');

const getAllContacts = async (req, res) => {
	try {
		const allContacts = await MyContactModel.find({});
		return res.status(200).json({success: true, data:allContacts.reverse()} );
	} catch (err) {
		return res.status(500).json(err);
	}
}

const getContactDetails = async (req, res) => {
	try {
		const {contactID} = req.params;
		const contactDetail = await MyContactModel.find({_id:contactID});
		return res.status(200).
			json({status: !!contactDetail.length, data: contactDetail})
	} catch (err) {
		return res.status(500).json(err);
	}
}

const addContact = async (req, res) => {
	try {
		const data = await MyContactModel.create(req.body);
		return res.status(200).
			json({status: true, data});

	} catch (err) {
		return res.status(500).json(err);
	}
}

const updateContact = async (req, res) => {
	try {
		const {contactID} = req.params;
		const updatedData = await MyContactModel.findOneAndUpdate(
				{_id: contactID}, req.body, {new:true, runValidators:true});
		return res.status(200).json({success: true, data: updatedData});
	} catch (err) {
		return res.status(500).json(err);
	}
}

const deleteContact = async (req, res) => {
	try {
		const {contactID} = req.params;
		const deleteData = await MyContactModel.findOneAndDelete({_id: contactID});
		return res.status(200).json({success: true, data: deleteData});
	} catch (err) {
		return res.status(500).json(err);
	}
}


module.exports = {
	getAllContacts,
	getContactDetails,
	addContact,
	updateContact,
	deleteContact
};

