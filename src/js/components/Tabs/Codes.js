import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import List from '../List'

class Codes extends Component {
	handleSubmit (event) {
		event.preventDefault()
		const { actions } = this.props
		const query = ReactDOM.findDOMNode(this.refs.query).value.trim()

		actions.searchCode(query)

	}

	handleChange (event) {

	}

	renderList () {
		const { items, actions } = this.props
		if (items.length < 1) {
			return (
				<p><i>Fant ingen koder</i></p>
			)
		}
		return (
			<List items={items} type="code" actions={actions}/>
		)
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)} className="search-box">
					<div className="flex-container">
						<div className="flex-item search-input-text">
							<input type="text" ref="query" name="kodeverk" placeholder="Søk etter koder eller navn" onChange={this.handleChange.bind(this)} />
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
						{this.renderList()}
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
