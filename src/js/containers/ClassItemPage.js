import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Translate from 'react-translate-component'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Sidebar from '../components/Sidebar'
import Tabs from '../components/Tabs'
import * as ClassActions from '../actions'
import _ from 'lodash'
import Modal from 'simple-react-modal'
import config from '../config'

function loadData (props, selectedLanguage) {
	const { params, actions } = props
	if (selectedLanguage) {
		sessionStorage.setItem('selectedLanguage', selectedLanguage)
	}

	actions.getClassification(params.classId).then(function (res) {
		const classification = res.response
		if (!_.isEmpty(classification) && !_.isEmpty(classification.versions)) {
			if (params.versionId) {
				actions.loadVersion(params.versionId)
			} else {
				const url = classification.versions[0]._links.self.href
				const versionId = url.substring(url.lastIndexOf('/') + 1, url.length)
				actions.loadVersion(versionId)
			}
		} else {
            actions.loadVersion()
        }
	})
}

class ClassItemPage extends Component {
	componentDidMount () {
		loadData(this.props)
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.params.versionId !== this.props.params.versionId) {
			nextProps.actions.loadVersion(nextProps.params.versionId)
		}
		if (nextProps.params.classId !== this.props.params.classId) {
    		loadData(nextProps)
		}
	}

	renderTabs () {
		const { classification, selectedVersion, actions, isFetching, params, modal } = this.props
		if ((_.isEmpty(selectedVersion.version) || (params.versionId && selectedVersion.version.id !== params.versionId)) && selectedVersion.isFetching) {
			return (
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
			)
		}

		return (
			<Tabs
				classification={classification}
				selectedVersion={selectedVersion}
				actions={actions}
				isFetchingClass={isFetching}
				params={params}
                modal={modal} />
		)
	}

	showFullDescription (ev) {
		ReactDOM.findDOMNode(this.refs.description).setAttribute('class', 'description')
		ReactDOM.findDOMNode(this.refs.descLink).setAttribute('class', 'hide')
	}

	render () {
		const { classification, isFetching, actions, params } = this.props

        let breadcrumbStep = document.getElementsByClassName('step')

        if (_.isEmpty(classification)) {
            if (breadcrumbStep.length > 0) {
                breadcrumbStep[breadcrumbStep.length-1].textContent = ""
            }
            return (
                <Translate component="p" content="CLASSIFICATIONS.NO_CLASS_FOUND" />
            )
        }

		if (_.isEmpty(classification) || isFetching) {
            if (breadcrumbStep.length > 0) {
                breadcrumbStep[breadcrumbStep.length-1].textContent = ""
            }
			return (
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
			)
		}

        if (breadcrumbStep.length > 0) {
            breadcrumbStep[breadcrumbStep.length-1].textContent = classification.name
        }

		return (
			<div className="content klass-item">
				<div className="main">
					<div className="heading">
						<p>Statisk enhet: <b>Foretak</b></p>
						<h1>{classification.name}</h1>
						<p className="description short" ref="description">{classification.description}</p>
						<p className="clickable" ref="descLink" onClick={(ev) => this.showFullDescription(ev)}>+ <Translate content="CLASS_ITEM.READ_MORE" /></p>
					</div>
					{this.renderTabs()}
				</div>
				<Sidebar
					contactInfo={classification.contactPerson}
					onLanguageChange={loadData}
					actions={actions}
					params={params} />
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	classification: state.selectedClass.classification,
	selectedVersion: state.selectedVersion,
	isFetching: state.selectedClass.isFetching,
	modal: state.modal
})

function mapDispatchToProps (dispatch) {
	return {
		actions: bindActionCreators(ClassActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClassItemPage)
