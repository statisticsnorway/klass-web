import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Sidebar from '../components/Sidebar'
import Tabs from '../components/Tabs'
import * as ClassActions from '../actions'
import _ from 'lodash'
import moment from 'moment'

function loadData(props) {
	const { params, actions } = props
	actions.getClassification(params.classId).then(function(res){
		const classification = res.response
		if (!_.isEmpty(classification.versions)) {
			if (params.versionId) {
				actions.loadVersion(params.versionId)
			} else {
				const url = classification.versions[classification.versions.length-1]._links.self.href
				const versionId = url.substring(url.lastIndexOf("/") + 1, url.length)
				actions.loadVersion(versionId)
			}
		}
	})
}

class ClassItemPage extends Component {
	componentDidMount() {
		loadData(this.props);
	}


  componentWillReceiveProps(nextProps) {
    if (nextProps.params.versionId !== this.props.params.versionId) {
			nextProps.actions.loadVersion(nextProps.params.versionId)
    }
	}


	renderTabs() {
		const { classification, version, actions, isFetching, params } = this.props
		if (_.isEmpty(version) || (params.versionId && version.id !== params.versionId)) {
			return (
				<p>Laster gjeldende versjon...</p>
			)
		}

		return (
			<Tabs
				classification={classification}
				version={version}
				actions={actions}
				isFetching={isFetching}
				params={params} />
		)
	}

	render() {
		const { classification, actions, isFetching } = this.props

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
					{this.renderTabs()}
				</div>
				<Sidebar contactInfo={classification.contactPerson}></Sidebar>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		classification: state.selectedClass.classification,
		version: state.selectedVersion.version,
		// changes: state.selectedClass.changes,
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
