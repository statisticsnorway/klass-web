import React, {Component} from 'react'
import Translate from 'react-translate-component'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as ClassActions from '../actions'
import Search from '../components/Search'
import SearchResult from '../components/Search/SearchResult'
import Sidebar from '../components/Sidebar'
import counterpart from 'counterpart'

class SearchPage extends Component {

	UNSAFE_componentWillMount () {
		const { search, actions, location } = this.props

		if (!search.query) {
			actions.searchClassification(location.query)
		}
	}

	render () {
		const { isFetching, items, search, actions, ssbSections, location } = this.props
		const searchObj = search.query ? search : location.query
        document.title = counterpart.translate("PAGE.TITLE");
		return (
			<div className="content">
				<div className="heading">
					<Translate component="h1" content="CLASSIFICATIONS.CLASSIFICATIONS_AND_CODELISTS" />
				</div>
				<div className="main">
					<Translate component="p" content="CLASSIFICATIONS.CLASS_DESCRIPTION" />
					<Search actions={actions} sections={ssbSections} search={searchObj} location={location} />
					<SearchResult items={items} actions={actions} isFetching={isFetching} search={location.query} />
				</div>
				<Sidebar />
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	items: state.searchResult.items,
	search: state.searchResult.search,
	isFetching: state.searchResult.isFetching,
    ssbSections: state.ssbSections
})

function mapDispatchToProps (dispatch) {
	return {
		actions: bindActionCreators(ClassActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
