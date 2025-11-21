import "./Sidebar.scss";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ApiLinks from "./ApiLinks";
import Contact from "./Contact";
import LocaleSwitcher from "./LocaleSwitcher";
import Subscription from "./Subscription";

class Sidebar extends Component {
	render() {
		const { contactInfo, languages, onLanguageChange, actions, params } =
			this.props;

		function gotClassification() {
			return params != undefined;
		}
		return (
			<div className="sidebar">
				<LocaleSwitcher
					languages={languages}
					onLanguageChange={onLanguageChange}
					actions={actions}
					params={params}
				/>
				<Contact contactInfo={contactInfo} />
				{gotClassification() ? (
					<Subscription actions={actions} params={params} />
				) : (
					""
				)}
				<ApiLinks />
			</div>
		);
	}
}

Sidebar.propTypes = {
	contactInfo: PropTypes.object.isRequired,
	languages: PropTypes.array.isRequired,
	onLanguageChange: PropTypes.func.isRequired,
	params: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
};

export default Sidebar;
