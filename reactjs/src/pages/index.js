import React from "react"
import Navbar from "../components/Navbar"
import SearchEngine from "../components/SearchEngine"
import ContactCard from "../components/ContactCard"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import ContactAPI from "../ApiService"

export default function Index(props) {
	const [contactData, setContactData] = React.useState({
			rawData: [],
			processedData: []
	});

	const [searchEngineQuery, setSearchEngineQuery] = React.useState("");

	React.useEffect( () => {
		ContactAPI.getAllContacts().
			then( res => {
				setContactData({
					rawData: res.data.data,
					processedData: res.data.data
			});
			}).catch( (err) => console.log(err));
	}, []);

	React.useEffect( () => {
		setContactData( (prevState) => {
				return {
					...prevState,
					processedData: prevState.rawData.filter( (p) => {

						const exp = new RegExp(
									searchEngineQuery.replace(/\s/g,'|'), 'i','g'
									);
						
						return searchEngineQuery == '' ? true:
							( (p.lname.search(exp) !== -1) || 
							(p.fname.search(exp) != -1 ))
					})
				}
		});	
	},[searchEngineQuery]);


	const handleDelete = (id) => {
		const ifConfirm = window.confirm("Are you sure to delete the contact?");
		if (ifConfirm) {
			ContactAPI.deleteContact(id).then( (res) => {
				alert("Contact deleted successfully");
				setContactData(prevState => ({
					rawData: prevState.rawData.filter(p =>p._id != id),
					processedData: prevState.processedData.filter(p => p._id != id)
				}));
			}).catch((err) => {
				alert("Some error occured");
				console.log(err)
			});
		}
	}

	let navigate = useNavigate(); 
	const handleEdit = (id) => {
		let path = `update-contact/${id}`; 
		navigate(path);
	}

	let html = [];
	contactData.processedData.map(d => {
		html.push(<ContactCard 
					key={d._id} 
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					data={d}/>)
	})


	return (
		<>
			<SearchEngine
					queryValue={searchEngineQuery} 
					setQuery={setSearchEngineQuery} />
			<div className="contact-grid">
				{html}
			</div>
			<Link to="/new-contact">
				<div className="new-btn">New Contact</div>
			</Link>
		</>
	);
}
