import axios from "axios"
const baseUrl = "http://127.0.0.1:3000/api/v1"

const getAllContacts = async () => {
	return axios.get(baseUrl);	
}

const deleteContact = async (id) => {
	return axios.delete(`${baseUrl}/${id}`)
}

const addContact = async (data) => {
	return axios.post(baseUrl, data);
}

const getContactDetails = async (id) => {
	return axios.get(`${baseUrl}/${id}`);
}

const updateContact =  async (id, data) => {
	return axios.put(`${baseUrl}/${id}`, data);
}

export default  {
	getAllContacts,
	deleteContact,
	addContact,
	getContactDetails,
	updateContact
};
