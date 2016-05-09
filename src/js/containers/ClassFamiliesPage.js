import React, {Component, PropTypes} from 'react';
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

		// if (searchResult.length > 0) {
		// 	return (
		// 		<SearchResult items={searchResult} actions={actions} isFetching={searchIsFetching} />
		// 	)
		// } else {
			return (
				<div>
					<div className="list-heading">
						<button className="expand-tree">Åpne hierarkiet</button>
						<h3>Eller velg et område</h3>
					</div>
					<div className="results class-list" id="expandcollapse">
						<List items={items} isFetching={isFetching} displayName="childNodes" actions={actions}/>
					</div>
				</div>
			)
		// }
	}

	render() {
		const {actions, ssbSections, search} = this.props
		return (
			<div className="content">
				<div className="heading">
					<h1>Klassifikasjoner og kodelister</h1>
				</div>
				<div className="main">
					<p>Lorem ipsum, her må det skrives en bedre tekst. I denne databasen kan du velge statistiske standarder og få informasjon om bruksområdet. Standardene kan også lastes ned til lokal bruk i et antall formater.</p>
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
