import React from "react";

function Header(props) {
	const darkMode = () => {
		document.querySelector(".section-header").classList.toggle("dark");
		document.querySelector(".container-sidebar").classList.toggle("dark");
		document.querySelector(".notes-area").classList.toggle("dark");
		document.querySelector(".account").classList.toggle("dark");
	};
	return (
		<header className="section-header">
			<h1 className="heading-primary">NOTEapp</h1>
			<div className="container-header">
				<div className="search-box">
					<button className="btn-search">
						<i className="fas fa-search"></i>
					</button>
					<input
						onChange={props.search}
						type="text"
						className="input-search"
						placeholder="Type to Search..."
					/>
				</div>
				<div>
					<input
						type="checkbox"
						className="checkbox"
						id="checkbox"
						onChange={darkMode}
					/>
					<label htmlFor="checkbox" className="label">
						<i className="fas fa-moon"></i>
						<i className="fas fa-sun"></i>
						<div className="ball"></div>
					</label>
				</div>
			</div>
		</header>
	);
}

export default Header;
