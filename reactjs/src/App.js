import React from "react"
import Navbar from "./components/Navbar"
import {BrowserRouter, Route, Link, Routes} from "react-router-dom"

import IndexPage from "./pages/index"
import NewContactPage from "./pages/NewContact"

export default function App() {
	return (
		<BrowserRouter>
			<main>
				<Navbar />
				<Routes>
					<Route path="/" element={<IndexPage/>} />
					<Route path="/new-contact" element={<NewContactPage/>} />
					<Route path="/update-contact/:contactID" element={<NewContactPage/>} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}
