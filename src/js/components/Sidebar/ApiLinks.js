import PropTypes from "prop-types";
import React, { Component } from "react";
import Translate from "react-translate-component";

class ApiLinks extends Component {
	render() {
		return (
			<div id="apiLinks">
				<h2>
					<Translate content="API.API_HEADER" />
				</h2>
				<div className="side-content-wrapper">
					<a
						className="apilink"
						href="https://data.ssb.no/api/klass/v1/api-guide.html"
					>
						<Translate content="API.API_LINK" />
					</a>
				</div>
			</div>
		);
	}
}

ApiLinks.propTypes = {};

ApiLinks.defaultProps = {};

export default ApiLinks;
