const mongoose = require('mongoose');

const myContact = new mongoose.Schema({
	fname: {
		type: String,
		minLength: [3, "First name length > 2"],
		required: [true,	"First name is required"]
	},
	lname: {
		type: String,
		minLength: [3, "Last name length > 2"],
		required: [true, "Last name is required"],	
	},
	phone: {
		type: Array,
		required: [true, "Phone no is required"]
	},
	email: {
		type: String,
	},
	website: {
		type: String,
	},
	address: {
		type: String,
	},
});

module.exports = new mongoose.model('myContact', myContact);
