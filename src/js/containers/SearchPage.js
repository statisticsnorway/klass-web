import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ClassActions from '../actions';
import Search from '../components/Search';
import Sidebar from '../components/Sidebar';

class SearchPage extends Component {
	componentWillMount() {
		// loadData(this.props);
	}

	render() {
		const {items, isFetching, actions, search} = this.props
		return (
			<div className="content">
				<div className="heading">
					<h1>Klassifikasjoner og kodelister</h1>
				</div>
				<div className="main">
					<p>Lorem ipsum, her må det skrives en bedre tekst. I denne databasen kan du velge statistiske standarder og få informasjon om bruksområdet. Standardene kan også lastes ned til lokal bruk i et antall formater.</p>
					<Search actions={actions} search={search} />
					<div className="list-heading">
						<h3>Resultat</h3>
					</div>
					<div className="search-results class-list">

					</div>
				</div>
				<Sidebar></Sidebar>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		items: state.classFamilies.items,
		isFetching: state.classFamilies.isFetching,
		search: state.classFamilies.search
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ClassActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
