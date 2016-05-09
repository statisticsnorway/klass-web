import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'

class ResultItem extends Component {

	render () {
		const { item, actions } = this.props
		const url = item._links.self.href;
		const classId = url.substring(url.lastIndexOf("/") + 1, url.length);

		return (
			<div className="result-item">
				<h3>
					<Link to={`/klassifikasjoner/${classId}`}>
						{item.name}
					</Link>
				</h3>
				<p className="result-snippet">{item.snippet}</p>
			</div>
		)
	}
}

ResultItem.propTypes = {
	actions: PropTypes.object.isRequired,
	item: PropTypes.object.isRequired
}

export default ResultItem
