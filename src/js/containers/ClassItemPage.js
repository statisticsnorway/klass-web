import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Sidebar from '../components/Sidebar'
import Tabs from '../components/Tabs'
import * as ClassActions from '../actions'
import _ from 'lodash'

function loadData(props) {
	const { params, actions } = props
	actions.getClassification(params.id).then(function(res){
		const classification = res.response
		if (classification.versions.length > 0) {
			actions.loadVersion(classification.versions[classification.versions.length-1]._links.self.href)
		}
	})
}

class ClassItemPage extends Component {
	componentDidMount() {
		loadData(this.props);
	}

	render() {
		const { classification, version, actions, isFetching } = this.props

		if (_.isEmpty(classification) || isFetching) {
			return (
				<p>Laster innhold...</p>
			)
		}

		return (
			<div className="content klass-item">
				<div className="main">
					<div className="heading">
						<div>Statisk enhet: <b>Foretak</b></div>
						<h1>{classification.name}</h1>
						<p className="description">{classification.description}</p>
						<a href="#">+ LES MER</a>
					</div>
					<Tabs
						version={version}
						actions={actions}
						isFetching={isFetching} />
				</div>
				<Sidebar contactInfo={classification.contactPerson}></Sidebar>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		classification: state.selectedClass.classification,
		version: state.selectedClass.version,
		isFetching: state.selectedClass.isFetching
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ClassActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClassItemPage);
