import './List.scss'
import React, {Component, PropTypes} from 'react'
import ListItem from './ListItem'

class List extends Component {
	renderList() {
		const { items, displayName, actions } = this.props
		if (items) {
			return items.map(function(item, key){
				let name
				switch (displayName) {
					case 'code':
						name = <span><b>{item.code}</b> - {item.name}</span>
						break;
					case 'childNodes':
						name = <span>{item.name} ({item.numberOfClassifications})</span>
						break;
					default:
						name = <span>{item.name}</span>
				}

				if (item.numberOfClassifications || item.code) {
					return (
						<ListItem
							key={key}
							idx={key}
							item={item}
							displayName={name}
							actions={actions} />
					)
				}
			})
		}
	}

	render() {
		const {items, loadingLabel, isFetching} = this.props
		const isEmpty = items.length === 0

		if (isEmpty && isFetching) {
			return (
				<p>
					<i>{loadingLabel}</i>
				</p>
			)
		}

		return (
			<ol className="expandcollapse">
				{this.renderList()}
			</ol>
		)
	}
}

List.propTypes = {
	actions: PropTypes.object.isRequired,
	items: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	displayName: PropTypes.string
}

List.defaultProps = {
	items: [],
	isFetching: true,
	loadingLabel: 'Laster klassifikasjoner og kodelister...'
}

export default List
