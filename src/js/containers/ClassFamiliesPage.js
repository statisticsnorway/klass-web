import React, {Component, PropTypes} from 'react';
import Translate from 'react-translate-component'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ClassActions from '../actions';
import Search from '../components/Search';
import SearchResult from '../components/Search/SearchResult';
import List from '../components/List';
import Sidebar from '../components/Sidebar';

function loadData(props) {
	const {actions} = props
	actions.loadSubjects()
}

class ClassFamiliesPage extends Component {
	componentWillMount() {
		loadData(this.props);
	}

	renderContent() {
		const {items, searchResult, searchIsFetching, isFetching, actions} = this.props

		return (
			<div>
				<div className="list-heading">
					<Translate component="button" content="COMMON.OPEN_HIERARCHY" className="expand-tree" />
					<Translate component="h3" content="CLASSIFICATIONS.CHOOSE_CLASS_FAMILY" />
				</div>
				<div className="results class-list" id="expandcollapse">
					<List items={items} isFetching={isFetching} type="classFamilies" actions={actions}/>
				</div>
			</div>
		)
	}

	render() {
		const {actions, ssbSections, search} = this.props
		return (
			<div className="content">
				<div className="heading">
					<Translate component="h1" content="CLASSIFICATIONS.CLASSIFICATIONS_AND_CODELISTS" />
				</div>
				<div className="main">
					<Translate component="p" content="CLASSIFICATIONS.CLASS_DESCRIPTION" />
					<Search actions={actions} sections={ssbSections} search={search} />
					{this.renderContent()}
				</div>
				<Sidebar></Sidebar>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		items:       state.classFamilies.items,
		isFetching:  state.classFamilies.isFetching,
		ssbSections: state.classFamilies.ssbSections,

		search:      state.searchResult.search,
		searchResult: state.searchResult.items,
		searchIsFetching: state.searchResult.isFetching
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ClassActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassFamiliesPage);
