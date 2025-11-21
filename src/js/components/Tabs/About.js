import counterpart from "counterpart";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Translate from "react-translate-component";

class About extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return !_.isEqual(this.props.version, nextProps.version);
	}

	renderLevels(levels) {
		return levels.map((level, key) => (
			<tr key={key}>
				<td className="align-right">{level.levelNumber}</td>
				<td>{level.levelName}</td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		));
	}

	renderChangeLog() {
		const { version } = this.props;

		if (_.isEmpty(version.changelogs)) {
			return (
				<tr>
					<td colSpan="3">Ingen endringer</td>
				</tr>
			);
		}

		return this.changeLogBody(version.changelogs);
	}

	changeLogBody(items) {
		return items.map((change, key) => (
			<tr key={key}>
				<td>{moment(change.changeOccured).format("DD.MMMM YYYY")}</td>
				<td>{moment(change.changeOccured).format("H:m:s")}</td>
				<td>{change.description}</td>
			</tr>
		));
	}

	addValidToIfPresent(validTo) {
		if (validTo != null)
			return (
				<tr>
					<td className="label">
						<Translate content="TABS.VALID_TO" />:
					</td>
					<td>{moment(validTo).format("MMMM YYYY")}</td>
				</tr>
			);
	}

	render() {
		const { version, actions } = this.props;

		let publications;
		if (version.publications) {
			publications = <a href={version.publications}>{version.publications}</a>;
		} else {
			publications = counterpart.translate("TABS.ABOUT.NOT_RELEVANT");
		}
		const joinedLanguages = version.published.map((val) => {
			const comma =
				val === version.published[version.published.length - 1] ? "" : ",";
			if (val === "nb")
				return (
					<span key="nb">
						<Translate content="LANGUAGE.NORWEGIAN" />
						{comma}{" "}
					</span>
				);
			if (val === "nn")
				return (
					<span key="nn">
						<Translate content="LANGUAGE.NYNORSK" />
						{comma}{" "}
					</span>
				);
			if (val === "en")
				return (
					<span key="en">
						<Translate content="LANGUAGE.ENGLISH" />
						{comma}{" "}
					</span>
				);
		});

		return (
			<div>
				<h3>
					<Translate content="TABS.ABOUT.ABOUT_PREFIX" /> {version.name}
				</h3>
				<table className="about-table">
					<tbody>
						<tr>
							<td className="label">
								<Translate content="TABS.ABOUT.DESCRIPTION" />:
							</td>
							<td>{version.introduction}</td>
						</tr>
						<tr>
							<td className="label">
								<Translate content="TABS.ABOUT.OWNER" />:
							</td>
							<td>
								{version.contactPerson.name},{" "}
								<Translate content="TABS.ABOUT.SECTION_FOR" />{" "}
								{_.lowerFirst(version.owningSection)}
							</td>
						</tr>
						<tr>
							<td className="label">
								<Translate content="TABS.VALID_FROM" />:
							</td>
							<td>{moment(version.validFrom).format("MMMM YYYY")}</td>
						</tr>
						{this.addValidToIfPresent(version.validTo)}
						<tr>
							<td className="label">
								<Translate content="TABS.ABOUT.PUBLISHED" />:
							</td>
							<td>{joinedLanguages}</td>
						</tr>
						<tr>
							<td className="label">
								<Translate content="TABS.ABOUT.DERIVEDFROM" />:
							</td>
							<td>
								{version.derivedFrom
									? version.derivedFrom
									: counterpart.translate("TABS.ABOUT.NOT_RELEVANT")}
							</td>
						</tr>
						<tr>
							<td className="label">
								<Translate content="TABS.ABOUT.LEGALBASE" />:
							</td>
							<td>
								{version.legalBase
									? version.legalBase
									: counterpart.translate("TABS.ABOUT.NOT_RELEVANT")}
							</td>
						</tr>
						<tr>
							<td className="label">
								<Translate content="TABS.ABOUT.PUBLICATIONS" />:
							</td>
							<td>{publications}</td>
						</tr>
						<tr>
							<td className="label">
								<Translate content="TABS.ABOUT.LEVELS" />:
							</td>
							<td>
								<table className="levels-table alternate">
									<thead>
										<tr>
											<Translate
												component="th"
												content="TABS.ABOUT.NUMBER"
												className="align-right"
											/>
											<Translate component="th" content="COMMON.NAME" />
											<Translate
												component="th"
												content="TABS.ABOUT.DESCRIPTION"
											/>
											<Translate
												component="th"
												content="TABS.ABOUT.STRUCTURE"
											/>
											<Translate
												component="th"
												content="TABS.ABOUT.NUMBER_OF_UNITS"
											/>
										</tr>
									</thead>
									<tbody>{this.renderLevels(version.levels)}</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td className="label">
								<Translate content="TABS.ABOUT.CHANGELOG" />:
							</td>
							<td>
								<table className="levels-table alternate">
									<thead>
										<tr>
											<Translate component="th" content="COMMON.DATE" />
											<Translate component="th" content="COMMON.TIME" />
											<Translate component="th" content="COMMON.COMMENTS" />
										</tr>
									</thead>
									<tbody>{this.renderChangeLog()}</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

About.propTypes = {
	actions: PropTypes.object.isRequired,
	version: PropTypes.object.isRequired,
};

export default About;
