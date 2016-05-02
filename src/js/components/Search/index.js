import './Search.scss'
import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

class Search extends Component {
	componentWillMount() {
		const { actions } = this.props
		actions.loadSSBSections()
	}

	handleSubmit(e) {
		e.preventDefault()
	}

	render () {
		const { search } = this.props
		let options
		if (search.ssbSections) {
			options = search.ssbSections.map(function(section, key){
				return (
					<option key={key} value={key}>{section.name}</option>
				)
			})
		}
		let dropdown = (
			<select name="seksjon">
				<option value>Alle seksjoner</option>
				{options}
			</select>
		)
		return (
			<form onSubmit={this.handleSubmit} className="search-box">
				<div className="flex-container">
					<div className="flex-item search-input-text">
						<label>Søk etter kodeverk</label>
						<input type="text" ref="search" placeholder="Søk" />
					</div>
					<div className="flex-item search-dropdown-section">
						<label>Ansvarlig SSB-seksjon</label>
						{dropdown}
					</div>
					<div className="flex-item search-button">
						<input type="submit" value="Søk" />
					</div>
				</div>
				<input type="checkbox" id="includeCodelists" value={search.includeCodelists}/><label htmlFor="includeCodelists">Inkludere kodelister</label> <a href="">Hva er en kodeliste?</a>
			</form>
		)
	}
}

Search.propTypes = {
	actions: PropTypes.object.isRequired,
	search: PropTypes.object.isRequired
}

export default Search
