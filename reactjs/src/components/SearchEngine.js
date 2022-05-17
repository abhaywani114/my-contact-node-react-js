import React from "react"

export default function SearchEngine(props) {

	const handleChange = (event) => {
		props.setQuery(event.target.value);
	}

	return (
		<div className="search-engine-holder">
			<input 
				className="search-engine-input"
				placeholder="Search Contact" 
				value={props.queryValue}
				onChange={handleChange}
				/>
		</div>
	);
}
