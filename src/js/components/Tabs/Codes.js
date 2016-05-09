import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import List from '../List'
import FlatToNested from '../../lib/flat-to-nested'

class Codes extends Component {
	render () {
		const { items, actions } = this.props
		const flatToNested = new FlatToNested({
				id: 'code',
				parent: 'parentCode'
			})
		const nestedItems = flatToNested.convert(_.cloneDeep(items))
		return (
			<div>
				<form onSubmit={this.handleSubmit} className="search-box">
					<div className="flex-container">
						<div className="flex-item search-input-text">
							<input type="text" name="kodeverk" placeholder="Søk etter koder eller navn" />
						</div>
						<div className="flex-item search-button">
							<input type="submit" value="Søk" />
						</div>
					</div>
					<input type="checkbox" id="includeCodelist"/><label htmlFor="includeCodelist">Vis korte titler</label>
				</form>
				<div className="button-heading">
					<button className="expand-tree">Åpne hierarkiet</button>
					<button className="expand-tree">Last ned til Excel (csv)</button>
				</div>
					<div className="results class-list" id="expandcollapse">
						<List items={nestedItems.children} displayName="code" actions={actions}/>
					</div>
			</div>
		)
	}
}

Codes.propTypes = {
	items: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
}

Codes.defaultProps = {
	items: []
}

export default Codes
