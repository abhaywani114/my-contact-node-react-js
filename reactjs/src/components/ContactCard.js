import React from "react"
import UserImg from "../images/user.png"

export default function ContactCard({data, handleDelete, handleEdit}) {
	return (
		<div key={'x'+data._id} className="contact-card-main">
			<div className="contact-card-background">
				<div className="contact-card-options">
					<span onClick={() => {
						handleEdit(data._id)
					}}>Edit</span> | 

					<span onClick={() => {
							handleDelete(data._id)	
						}}>Delete</span>
				</div>
			</div>
			<div className="contact-card-shift">
				<img 
					className="contact-card-user-image" 
					src={UserImg} />
				<div className="contact-card-details">
					<p className="person-name">{data.fname} {data.lname}</p>
					<p className="person-address">{data.address} | {data.email}</p>
					<p className="person-website">{data.website}</p>

					<p className="person-phone-label">Phone number(s)</p>
					<ul className="person-phone-list">
						{data.phone.map( (p,id) => <li key={`${data._id}_${id}`}>{p}</li> )}
					</ul>
				</div>
			</div>
		</div>
	);
}
