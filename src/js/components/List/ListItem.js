import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import List from './index';

class ListItem extends Component {
	renderItemList() {
		const { item, displayName, actions } = this.props;

		if (item.children && item.children.length > 0) {
			const listEl = item.children.map((childItem, key) =>
				{
					if (childItem._links) {
						return (
							<li key={key}>
								<Link to={`/klassifikasjoner/${childItem.id}`} className="child-link">
									{childItem.name}
									<span className="link-type">Klassifikasjon</span>
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
		const { item, displayName } = this.props
		const toggleIcon = (item.children || item.numberOfClassifications) ? (item.active ? 'hovedemne collapse' : 'hovedemne expand') : 'last-item'

		return (
			<li className={toggleIcon}>
				<a className="toggle-children" onClick={() => this.toggle(event)}>
					<span className="screen-reader-only">Vis/skjul: </span>
					{displayName}
				</a>
				{this.renderItemList()}
			</li>
		)
	}

	toggle(e) {
		e.preventDefault();
		const { item, idx, actions } = this.props

		if (item.numberOfClassifications || item.children) {
			if (item.code) {
				actions.toggleCode(item.code)
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
	actions: PropTypes.object.isRequired
}

export default ListItem
