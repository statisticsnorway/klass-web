import React, { Component, PropTypes } from 'react'
import Translate from 'react-translate-component'
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
					<Translate component="h3" content="TABS.CHANGES.PREVIOUS_CHANGES" />
					<Translate component="p" content="TABS.CHANGES.PREVIOUS_VERSION_NOT_FOUND" />
				</div>
			)
		}

		if (_.isEmpty(version.changes)) {
			return (
				<div>
					<Translate component="h3" content="TABS.CHANGES.PREVIOUS_CHANGES" />
					<Translate component="p" content="TABS.CHANGES.CHANGES_NOT_FOUND" />
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
				<Translate component="h3" content="TABS.CHANGES.PREVIOUS_CHANGES" />
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
