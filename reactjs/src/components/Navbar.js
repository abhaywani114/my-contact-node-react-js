import React from "react"
import {Link} from "react-router-dom"
import logoImage from "../images/logo.png"

export default function Navbar() {
	return (
		<nav className="nav-bar">
			<Link to="/">
				<div className="logo-container">
					<img className="logo-icon" src={logoImage} />
					<span className="logo-text">myContacts</span>
				</div>
			</Link>
		</nav>
	);
}
