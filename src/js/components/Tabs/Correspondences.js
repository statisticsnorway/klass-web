import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

class Correspondences extends Component {
	render () {
		const { version, actions } = this.props

		return (
			<div>
				<h3>Korrespondanser</h3>
				<p>En kort tekst som forteller hva en korrespondansetabell er.</p>
				<table className="correspondence-table">
					<thead>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		)
	}
}

Correspondences.propTypes = {
	version: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
}

export default Correspondences
