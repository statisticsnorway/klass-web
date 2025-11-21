import React, { useEffect } from "react";
import "./frame.scss";

export default function Header() {
	useEffect(() => {
		const searchBox = document.getElementById("searchbox");
		if (searchBox) {
			searchBox.placeholder =
				window.location.pathname.split("/")[1] === "en"
					? "Search in all of ssb.no"
					: "Søk i hele ssb.no";
		} else {
			console.warn('Element with id "searchbox" not found.');
		}
	}, []);

	const lang = window.location.pathname.split("/")[1];
	const cookieText = lang === "en" ? "We use cookies" : "Vi bruker cookies";

	return (
		<div className="header-wrapper">
			<div className="container">
				<div className="row">
					<div className="col">
						<header id="headerArchive" className="header-content">
							<div className="topRow">
								<a href="/" className="logo" title="Lenke til forsiden">
									<img src="./images/SSB_logo_black.svg" alt="SSB Logo" />
								</a>
								<form className="topSearch" action="/sok" method="get">
									<input id="searchbox" type="text" name="sok" placeholder="" />
									<div className="searchBoxIcon">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<circle cx="11" cy="11" r="8"></circle>
											<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
										</svg>
									</div>
								</form>
								<div className="cookies">
									<a href="/diverse/cookies-og-analyseverktoy-for-webstatistikk">
										{cookieText}
									</a>
								</div>
							</div>
							<hr />
						</header>
					</div>
				</div>
			</div>
		</div>
	);
}
