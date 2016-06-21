import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Translate from 'react-translate-component'
import List from './index'
import Notes from '../Notes'
import _ from 'lodash'

class ListItem extends Component {
	renderItemList() {
		const { item, displayName, type, actions } = this.props;

		if (item.children && item.children.length > 0) {
			const listEl = item.children.map((childItem, key) =>
				{
					if (childItem._links) {
						return (
							<li key={key}>
								<Link to={`/klassifikasjoner/${childItem.id}`} className="child-link">
									{childItem.name}
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
			          actions={actions} />
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
				{this.renderItemList()}
			</li>
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
	actions: PropTypes.object.isRequired
}

export default ListItem
