import React from "react"
import {useFormik, FieldArray} from "formik"
import axios from 'axios'
import * as Yup from "yup"
import {useParams} from 'react-router-dom'
import ContactAPI from "../ApiService"

export default function NewContact() {
	const {contactID} = useParams();
	React.useEffect( ()=> {
		if (contactID) {
			const contactDetails =
				 ContactAPI.getContactDetails(contactID).
				then((res)  => {
					console.log(res);
					addContactForm.resetForm({values: res.data.data[0]});
				}).catch(err => console.log(err));
		}
	}, []);

	const addContactForm = useFormik({
		initialValues: {
			fname: "",
			lname:"",
			address: "",
			phone:[''],
			email:"",
			website:""
		},
		validationSchema: Yup.object({
			fname: Yup.string().
						min(3, "Min first name should be 3").
						required("First name is required"),
			lname: Yup.string().
						min(3, "Min last name should be 3").
						required("First last is required"),
			phone: Yup.array().
						min(1, "Min phone no should be 1").
						required("Phone no required"),
			email: Yup.string().
						required("Email is required"),
			website: Yup.string().
						required("Website is required"),
			address: Yup.string().
						min(7, "Min address should be 7").
						required("Address is required"),
			
		}),
		onSubmit: (values, action) => {
					if (contactID) {
						ContactAPI.updateContact(contactID, values).
							then( (res) =>{
								setShowMsg(() => ({
									backgound: "green",
									msg:"Contact updated successfully",
									show: true
								}));

								setTimeout(() => {
									setShowMsg(() => ({
										backgound: "",
										msg:"",
										show: false
									}))
								}, 3500);
						}).
						catch( (res) => console.log(res))

					} else {
						ContactAPI.addContact(values).
						then( (res) =>{
								setShowMsg(() => ({
									backgound: "green",
									msg:"Contact created successfully",
									show: true
								}));

								setTimeout(() => {
									setShowMsg(() => ({
										backgound: "",
										msg:"",
										show: false
									}))
								}, 3500);
						}).
						catch( (res) => console.log(res))
						action.resetForm({values: addContactForm.initialValues});
				}
		}
	});

	function checkError(obj) {
		return addContactForm.errors[obj] && 
			addContactForm.touched[obj] ? 
				<span className="form-error-label">{addContactForm.errors[obj]}</span>:null
		}

	const forceUpdate = React.useReducer(() => ({}), {})[1];
	const phoneNo = addContactForm.values.phone.map((p,index) => (
			<div key={'div'+index}>
			<input 
				key={"unq" + index}
				className="input-form-text input-custom-phone" 
				placeholder="Phone No" 
				name={`phone[${index}]`}
				value={addContactForm.values.phone[index]}	
				onChange={addContactForm.handleChange}
				onBlur={addContactForm.handleBlur}
			/>

			{index > 0 ? (
				<span 
					key={'sp'+index}
					className="input-phone-add"
					 onClick={() => {
						addContactForm.values.phone = addContactForm.
								values.phone.filter((_,id) => id != index);
						forceUpdate();
					}}>-</span>

			): (
				<span className="input-phone-add"
					 onClick={() => {
						addContactForm.values.phone.push('');
						forceUpdate();
					}}>+</span>

			)}
			</div>
		));


	const [showMsg, setShowMsg] = React.useState({
				backgound:"green", msg: "msg example", show: false})
	return (
		<>
			<div className="fulid"></div>
			<div className="create-contact-cointainer">
				{ contactID ? <h1>Update Contact</h1>:<h1>Create a new contact</h1>}
				<div>
					{ showMsg.show &&
					 <span className="action-success" 
						style={{backgroundColor:showMsg.backgound}}>{showMsg.msg}</span>
					}
					
				</div>
				<form onSubmit={addContactForm.handleSubmit}>
					<input
						className="input-form-text" 
						placeholder="First Name" 
						type="text"
						id="fname"
						name="fname"
						value={addContactForm.values.fname}
						onChange={addContactForm.handleChange}
						onBlur={addContactForm.handleBlur}
						/>
					{checkError('fname')}

					<input 
						className="input-form-text" 
						placeholder="Last Name" 
						id="lname"
						name="lname"
						type="text"
						value={addContactForm.values.lname}
						onChange={addContactForm.handleChange}
						onBlur={addContactForm.handleBlur}
						/>
					{checkError('lname')}
		
					{phoneNo}
					{checkError('phone')}

					<input 
						className="input-form-text" 
						placeholder="Email" 
						type="email"
						id="email"
						name="email"
						value={addContactForm.values.email}
						onChange={addContactForm.handleChange}
						onBlur={addContactForm.handleBlur}
						/>
					{checkError('email')}

					<input 
						className="input-form-text" 
						placeholder="Addresss"
						type="text"
						id="address"
						name="address"
						value={addContactForm.values.address}
						onChange={addContactForm.handleChange}
						onBlur={addContactForm.handleBlur}
					 />
					{checkError('address')}

					<input 
						className="input-form-text" 
						placeholder="Website" 
						type="text"
						id="website"
						name="website"
						value={addContactForm.values.website}
						onChange={addContactForm.handleChange}
						onBlur={addContactForm.handleBlur}
					/>
					{checkError('website')}

					<button className="add-new-btn">{contactID ? 'Update':'Add New'}</button>
				</form>
			</div>
		</>
	);
}
