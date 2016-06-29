import './Notes.scss'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import _ from 'lodash'

class Note extends Component {
	handleClick (e, actions, item, modal) {
		console.log(e)
		e.stopPropagation()
        const node = e.currentTarget.parentNode.parentNode.parentNode
		actions.displayModal(item, {x:e.pageX, y:e.pageY}, node);
	}


	render () {
		const { item, actions, modal } = this.props
		if (_.isEmpty(item.notes)) {
			return null
		}

		return (
			<span className="icon-info">
				<i className="fa fa-info-circle" aria-hidden="true" onClick={(ev) => this.handleClick(ev, actions, item, modal)}></i>
			</span>
		)
	}
}

Note.propTypes = {
	item: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
	return {
		modal: state.modal
	};
}

export default connect(
	mapStateToProps
)(Note)
