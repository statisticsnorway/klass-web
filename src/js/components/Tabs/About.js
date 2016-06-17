import React, { Component, PropTypes } from 'react'
import Translate from 'react-translate-component'
import _ from 'lodash'
import moment from 'moment'

class About extends Component {
	renderLevels (levels) {
		return levels.map(function(level, key){
			return (
				<tr key={key}>
					<td className="align-right">{level.levelNumber}</td>
					<td>{level.levelName}</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			)
		})
	}

	render () {
		const { version, actions } = this.props

		return (
			<div className="about-version">
				<h3>Om {version.name}</h3>
				<table className="about-table">
					<tbody>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.DESCRIPTION" />:</td>
							<td>{version.introduction}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.OWNER" />:</td>
							<td>{version.contactPerson}, <Translate content="TABS.ABOUT.SECTION_FOR" /> {_.lowerFirst(version.owningSection)}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.VALIDFROM" />:</td>
							<td>{moment(version.validFrom).format("D MMMM YYYY")}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.LASTMODIFIED" />:</td>
							<td></td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.PUBLISHED" />:</td>
							<td>{version.published.join()}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.DERIVEDFROM" />:</td>
							<td>{version.derivedFrom}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.LEGALBASE" />:</td>
							<td>{version.legalBase}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.PUBLICATIONS" />:</td>
							<td><a href={version.publications}>{version.publications}</a></td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.LEVELS" />:</td>
							<td>
								<table className="levels-table alternate">
									<thead>
										<tr>
											<th className="align-right">Nr.</th>
											<th>Navn</th>
											<th>Beskrivelse</th>
											<th>Struktur</th>
											<th>Antall enheter</th>
										</tr>
									</thead>
									<tbody>
										{this.renderLevels(version.levels)}
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

About.propTypes = {
	actions: PropTypes.object.isRequired,
	version: PropTypes.object.isRequired
}

export default About
