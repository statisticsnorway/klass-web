import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import _ from 'lodash'

class CodeDate extends PureComponent {

	handleClick (e, actions, item) {
		e.stopPropagation()
        e.preventDefault()
		actions.displayModal(item, "dates");
	}

	render () {
		const { item, actions } = this.props
		if (_.isEmpty(item.validFrom)) {
			return null
		}
		return (
			<button aria-label="dates" className="icon-info float-right-icon" onClick={(ev) => this.handleClick(ev, actions, item)}>
    			<i className="fa fa-clock-o" aria-hidden="true"></i>
			</button>
		)
	}
}

CodeDate.propTypes = {
	item: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
}

export default CodeDate
