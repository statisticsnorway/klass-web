import './Search.scss'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'

class Search extends Component {

	componentWillMount() {
		const { actions } = this.props
		actions.loadSSBSections()
	}

	handleSubmit(event) {
		event.preventDefault()
		const { actions } = this.props
		const searchObj = {
			"query": ReactDOM.findDOMNode(this.refs.query).value.trim(),
			"ssbSection": ReactDOM.findDOMNode(this.refs.ssbSection).value,
			"includeCodelists": ReactDOM.findDOMNode(this.refs.includeCodelists).checked
		}

		actions.searchClassification(searchObj)

		const path = "/sok?query=" + searchObj.query + "&includeCodelists=" + searchObj.includeCodelists + "&ssbSection=" + searchObj.ssbSection
		this.context.router.push(path)
	}

	handleChange(event) {
		const { actions } = this.props
		const searchObj = {
			"query": ReactDOM.findDOMNode(this.refs.query).value.trim(),
			"ssbSection": ReactDOM.findDOMNode(this.refs.ssbSection).value,
			"includeCodelists": ReactDOM.findDOMNode(this.refs.includeCodelists).checked
		}
		actions.setSearchObject(searchObj);
	}

	render () {
		const { sections, search } = this.props

		let options
		if (sections) {
			options = sections.map(function(section, key){
				return (
					<option key={key} value={key}>{section.name}</option>
				)
			})
		}
		const dropdown = (
			<select name="seksjon" ref="ssbSection" onChange={this.handleChange.bind(this)} value={search.ssbSection}>
				<option value="">Alle seksjoner</option>
				{options}
			</select>
		)
		return (
			<form onSubmit={this.handleSubmit.bind(this)} className="search-box">
				<div className="flex-container">
					<div className="flex-item search-input-text">
						<label>Søk etter kodeverk</label>
						<input type="text" ref="query" placeholder="Søk" value={search.query} onChange={this.handleChange.bind(this)} />
					</div>
					<div className="flex-item search-dropdown-section">
						<label>Ansvarlig SSB-seksjon</label>
						{dropdown}
					</div>
					<div className="flex-item search-button">
						<button type="submit">Søk</button>
					</div>
				</div>
				<input type="checkbox" id="includeCodelists" ref="includeCodelists" onChange={this.handleChange.bind(this)} checked={search.includeCodelists}/><label htmlFor="includeCodelists">Inkludere kodelister</label> <a href="">Hva er en kodeliste?</a>
			</form>
		)
	}
}

Search.propTypes = {
	actions: PropTypes.object.isRequired,
	sections: PropTypes.array.isRequired,
	search: PropTypes.object.isRequired
}

Search.contextTypes = {
	router: PropTypes.object
}

export default Search
