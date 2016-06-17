import './Search.scss'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'
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
			"query": ReactDOM.findDOMNode(this.refs.query).value,
			"ssbSection": ReactDOM.findDOMNode(this.refs.ssbSection).value,
			"includeCodelists": ReactDOM.findDOMNode(this.refs.includeCodelists).checked
		}
		actions.setSearchObject(searchObj);
	}

	render () {
		const { sections, search } = this.props

		let options
		if (sections.length) {
			sections.sort(function(a,b){
				return a.name - b.name
			})
			options = sections.map(function(section, key){
				return (
					<option key={key} value={section.name}>{section.name}</option>
				)
			})
		}
		const dropdown = (
			<select name="seksjon" ref="ssbSection" onChange={this.handleChange.bind(this)} value={search.ssbSection}>
				<Translate component="option" value="" content="SEARCH.ALL_SECTIONS" />
				{options}
			</select>
		)
		return (
			<form onSubmit={this.handleSubmit.bind(this)} className="search-box">
				<div className="flex-container">
					<div className="flex-item search-input-text">
						<Translate component="label" content="SEARCH.SEARCH_KODEVERK" />
						<Translate component="input" type="text" ref="query" value={search.query} onChange={this.handleChange.bind(this)} attributes={{ placeholder: 'SEARCH.SEARCH' }} />
					</div>
					<div className="flex-item search-dropdown-section">
						<Translate component="label" content="SEARCH.OWNING_SECTION" />
						{dropdown}
					</div>
					<div className="flex-item search-button">
						<Translate component="button" type="submit" content="SEARCH.SEARCH" />
					</div>
				</div>
				<input type="checkbox" id="includeCodelists" ref="includeCodelists" onChange={this.handleChange.bind(this)} checked={search.includeCodelists}/>
				<Translate component="label" htmlFor="includeCodelists" content="SEARCH.INCLUDE_CODELISTS" />
				<Translate component="a" href="" content="SEARCH.WHAT_IS_CODELIST" />
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
