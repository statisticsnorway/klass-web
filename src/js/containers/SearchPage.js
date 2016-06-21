import React, {Component, PropTypes} from 'react';
import Translate from 'react-translate-component'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ClassActions from '../actions';
import Search from '../components/Search';
import SearchResult from '../components/Search/SearchResult'
import Sidebar from '../components/Sidebar';

class SearchPage extends Component {

	componentWillMount() {
		const { search, actions, location } = this.props

		if (!search.query){
			location.query.includeCodelists = (location.query.includeCodelists === 'true')
			actions.searchClassification(location.query)
		}
	}

	render() {
		const {isFetching, items, search, actions, ssbSections, location } = this.props
		const searchObj = search.query ? search : location.query

		return (
			<div className="content">
				<div className="heading">
					<Translate component="h1" content="CLASSIFICATIONS.CLASSIFICATIONS_AND_CODELISTS" />
				</div>
				<div className="main">
					<Translate component="p" content="CLASSIFICATIONS.CLASS_DESCRIPTION" />
					<Search actions={actions} sections={ssbSections} search={searchObj} />
					<SearchResult items={items} actions={actions} isFetching={isFetching} search={location.query} />
				</div>
				<Sidebar></Sidebar>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		items: state.searchResult.items,
		search: state.searchResult.search,
		isFetching: state.searchResult.isFetching,
		ssbSections: state.classFamilies.ssbSections
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ClassActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
