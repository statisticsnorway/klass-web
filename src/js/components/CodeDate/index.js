import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

class CodeDate extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        window.console.log("[DEBUG] check if  CodeDate should be updated");
    	return false;
    }

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
        // window.console.log("[DEBUG] render dates "+item.idx)
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
