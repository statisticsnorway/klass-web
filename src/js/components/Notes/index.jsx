import './Notes.scss'
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import _ from 'lodash'

class Note extends PureComponent {
	handleClick (e, actions, item) {
		e.stopPropagation()
        e.preventDefault()
		actions.displayModal(item, "notes");
	}

	render () {
		const { item, actions } = this.props
		if (_.isEmpty(item.notes)) {
			return null
		}
		return (
			<button aria-label="info" className="icon-info float-right-icon" onClick={(ev) => this.handleClick(ev, actions, item)}>
				<i className="fa fa-info-circle" aria-hidden="true"></i>
			</button>
		)
	}
}

Note.propTypes = {
	item: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
}

export default Note
