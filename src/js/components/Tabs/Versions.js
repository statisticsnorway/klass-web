import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import moment from 'moment'

class Versions extends Component {
	renderTableBody () {
		const { classification, actions } = this.props
		const url = classification._links.self.href;
		const classificationId = url.substring(url.lastIndexOf("/") + 1, url.length);
		const versions = classification.versions

		return versions.map(function(version, key){
			return (
				<tr key={key}>
					<td>{moment(version.validFrom).format('D.MMMM YYYY')}</td>
					<td>{moment(version.validTo).isValid() ? moment(version.validTo).format('D.MMMM YYYY') : 'Forstatt gyldig'}</td>
					<td>
						<Link to={`/klassifikasjoner/${classificationId}/versjon/${version.id}`}>
							{version.name}
						</Link>
					</td>
				</tr>
			)
		})
	}

	render () {
		const { classification } = this.props

		return (
			<div>
				<h3>Andre versjoner av {classification.name}</h3>
				<table className="versions-table alternate">
					<thead>
						<tr>
							<th>Gyldig fra</th>
							<th>Gyldig til</th>
							<th>Navn</th>
						</tr>
					</thead>
					<tbody>
						{this.renderTableBody()}
					</tbody>
				</table>
			</div>
		)
	}
}

Versions.propTypes = {
	classification: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
}

export default Versions
