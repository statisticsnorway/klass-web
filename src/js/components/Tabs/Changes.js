import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import moment from 'moment'

class Changes extends Component {
	renderTableBody () {
		const { classification, version } = this.props
		const changes = version.changes.codeChanges

		return changes.map(function(code, key){
			return (
				<tr key={key}>
					<td>
						<b>{code.newCode}</b>
					</td>
					<td>{code.newName}</td>
					<td>
						<b>{code.oldCode}</b>
					</td>
					<td>{code.oldName}</td>
				</tr>
			)
		})
	}

	render () {
		const { classification, version, params } = this.props
		let previousVersionName = '-'

		if (classification.versions.length < 2) {
			return (
				<div>
					<h3>Endringer siden forrige versjon</h3>
					<p>Forrige versjon finnes ikke</p>
				</div>
			)
		}

		if (_.isEmpty(version.changes)) {
			return (
				<div>
					<h3>Endringer siden forrige versjon</h3>
					<p>Fant ingen endringer</p>
				</div>
			)
		}

		for (let idx in classification.versions) {
			if (classification.versions[idx-1] && classification.versions[idx].id == version.id) {
				previousVersionName = classification.versions[idx-1].name
			}
		}

		return (
			<div>
				<h3>Endringer siden forrige versjon</h3>
				<table className="change-table alternate">
					<thead>
						<tr>
							<th colSpan="2" width="50%">{version.name}</th>
							<th colSpan="2" width="50%">{previousVersionName}</th>
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

Changes.propTypes = {
	classification: PropTypes.object.isRequired,
	version: PropTypes.object.isRequired
}

export default Changes
