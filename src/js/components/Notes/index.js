import './Notes.scss'
import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

class Note extends Component {
	handleClick (e, actions, item) {
		e.stopPropagation()
		actions.displayModal(item);
	}

	render () {
		const { item, actions } = this.props
		if (_.isEmpty(item.notes)) {
			return null
		}

		return (
			<div className="icon-info">
				<i className="fa fa-info-circle" aria-hidden="true" onClick={(ev) => this.handleClick(ev, actions, item)}></i>
			</div>
		)
	}
}

Note.propTypes = {
	item: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
}

export default Note
