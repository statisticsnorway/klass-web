import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Translate from 'react-translate-component'
import List from './index'
import Notes from '../Notes'
import Modal from 'simple-react-modal'
import _ from 'lodash'

class ListItem extends Component {
	renderItemList() {
		const { item, displayName, type, actions, modal } = this.props;

		if (item.children && item.children.length > 0) {
			const listEl = item.children.map((childItem, key) =>
				{
					if (childItem._links) {
						return (
							<li key={key}>
								<Link to={`/klassifikasjoner/${childItem.id}`} className="child-link">
									<span>{childItem.name}&#160;&#160;»</span>
									<span className="link-type"><Translate content="CLASSIFICATIONS.CLASSIFICATION" /></span>
								</Link>
							</li>
						)
					} else {
						const toggleIcon = childItem.active ? 'hovedemne collapse' : 'hovedemne expand';
						let name = <span><b>{childItem.code}</b> - {childItem.name}</span>
						return (
							<ListItem
								key={key}
								idx={key}
								item={childItem}
								displayName={name}
								type={type}
		                        actions={actions}
                                modal={modal} />
						)
					}
				}
			)

			return (
				<ol className="delemne-children">
					{listEl}
				</ol>
			)
		}
	}

	render () {
		const { item, displayName, actions } = this.props
		const toggleIcon = (item.children || item.numberOfClassifications) ? (item.active ? 'hovedemne collapse' : 'hovedemne expand') : 'last-item'

		return (
			<li className={toggleIcon}>
				<a className="toggle-children" onClick={(ev) => this.toggle(ev)}>
					<span className="screen-reader-only"><Translate content="CLASSIFICATIONS.DISPLAY_HIDE"/> </span>
					{displayName}
                    <Notes item={item} actions={actions} />
				</a>
                {this.renderModal()}
				{this.renderItemList()}
			</li>
		)
	}

	closeModal () {
		const { actions } = this.props
		actions.hideModal()
	}

	renderNoteBlocks (arr) {
		return arr.map(function (item, key) {
			var splitted = item.split(/:(.+)?/)
			return (
				<div className="flex-container" key={key}>
					<div className="label">{splitted[0]}:</div>
					<div className="content">{splitted[1]}</div>
				</div>
			)
		})
	}

    renderModal () {
		const { modal, item } = this.props


		if (!modal.modalIsOpen || (!_.isEqual(modal.item, item))) {
			return null
		}

		let noteBlock = modal.item.notes.split('\n')

		return (
			<Modal
				className='modal-notes'
				closeOnOuterClick={true}
				show={modal.modalIsOpen}
				onClose={this.closeModal.bind(this)}>
					<div className="modal-content">
						<a onClick={this.closeModal.bind(this)}>
							<i className="fa fa-times-circle-o close-button" aria-hidden="true"></i>
						</a>
						<h5>{modal.item.code} - {modal.item.name}</h5>
						{this.renderNoteBlocks(noteBlock)}
					</div>
			</Modal>
		)
    }

	toggle(e) {
		e.preventDefault();
		const { item, idx, actions, type } = this.props

		if (item.numberOfClassifications || item.children) {
			if (type == 'code' || type == 'variant') {
				actions.toggleCode(item.code, type)
			} else {
				actions.toggleSubject(idx)
			}
		}
	}
}


ListItem.propTypes = {
	item: PropTypes.object.isRequired,
	idx: PropTypes.number.isRequired,
	displayName: PropTypes.element.isRequired,
	type: PropTypes.string.isRequired,
	actions: PropTypes.object.isRequired,
	modal: PropTypes.object.isRequired
}

export default ListItem
