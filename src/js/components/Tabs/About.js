import React, { Component, PropTypes } from 'react'
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
		moment.locale('nb')

		return (
			<div className="about-version">
				<h3>Om {version.name}</h3>
				<table className="about-table">
					<tbody>
						<tr>
							<td className="label">Beskrivelse:</td>
							<td>{version.introduction}</td>
						</tr>
						<tr>
							<td className="label">Ansvarlig:</td>
							<td>{version.contactPerson}, seksjon for {_.lowerFirst(version.owningSection)}</td>
						</tr>
						<tr>
							<td className="label">Gyldig fra:</td>
							<td>{moment(version.validFrom).format("D MMMM YYYY")}</td>
						</tr>
						<tr>
							<td className="label">Sist oppdatert:</td>
							<td></td>
						</tr>
						<tr>
							<td className="label">Publisert på:</td>
							<td>{version.published.join()}</td>
						</tr>
						<tr>
							<td className="label">Basert på:</td>
							<td>{version.derivedFrom}</td>
						</tr>
						<tr>
							<td className="label">Lovhjemmel:</td>
							<td>{version.legalBase}</td>
						</tr>
						<tr>
							<td className="label">Publikasjoner:</td>
							<td><a href={version.publications}>{version.publications}</a></td>
						</tr>
						<tr>
							<td className="label">Nivåer:</td>
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
