import './Tabs.scss'
import React, { Component, PropTypes } from 'react'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'
import TabPanel, { TabStrip } from 'react-tab-panel' // from http://react-components.com/component/react-tab-panel
import 'react-tab-panel/base.css'
import Codes from './Codes'
import About from './About'
import Changes from './Changes'
import Versions from './Versions'
import Correspondences from './Correspondences'
import Variants from './Variants'
import _ from 'lodash'
import moment from 'moment'

class Tabs extends Component {

	renderVersionInfo () {
		const { classification, selectedVersion } = this.props
		const version = selectedVersion.version
		if (version.id !== classification.versions[0].id) {
			return (
				<p className="version-info">
					<Translate component="div" content="TABS.VERSION_NO_LONGER_VALID" className="red-box" />
					<div><Translate component="span" content="TABS.VERSION_EXPIRED" />: <b>({moment(version.validFrom).format("D. MMMM YYYY")} - {moment(version.validTo).format("D. MMMM YYYY")})</b></div>
				</p>
			)
		} else {
			return (
				<p className="version-info">
					<Translate component="span" content="TABS.CURRENT_VERSION" />: <b>(<Translate content="TABS.VALID_FROM" /> {moment(version.validFrom).format("D. MMMM YYYY")})</b>
				</p>
			)
		}
	}

	onActivate (tabIndex) {
		const { params, tabs } = this.props
		const classPath = '/' + params.classId
		const versionPath = params.versionId ? '/versjon/' + params.versionId : ''
		const tabPath = '/' + Object.keys(tabs[tabIndex])[0]

		const path = "/klassifikasjoner" + classPath + versionPath + tabPath
		this.context.router.push(path)
	}

	render () {
		moment.locale('nb')
		const { classification, selectedVersion, actions, isFetchingClass, params, tabs, modal } = this.props
		let tabIndex = _.findIndex(tabs, params.tab)
		if (isFetchingClass) {
			return <Translate component="div" content="TABS.LOADING_CURRENT_VERSION" />
		} else if (_.isEmpty(selectedVersion.version)){
			return <Translate content="TABS.VERSIONS_NOT_FOUND" />
		}

		return (
			<div className="tabs">
				{this.renderVersionInfo()}
				<h2>{selectedVersion.version.name}</h2>

				<div className="tab-content">
					<TabPanel
						activeIndex={tabIndex}
						onActivate={this.onActivate.bind(this)}>
						<div tabTitle={counterpart.translate('TABS.CODES.CODES')} className="codes">
							<Codes version={selectedVersion.version} params={params} actions={actions} modal={modal} />
						</div>
						<div tabTitle={counterpart.translate('TABS.ABOUT.ABOUT')} className="about-version">
							<About actions={actions} version={selectedVersion.version} />
						</div>
						<div tabTitle={counterpart.translate('TABS.CHANGES.CHANGES')} className="changes">
							<Changes actions={actions} classification={classification} selectedVersion={selectedVersion} params={params} />
						</div>
						<div tabTitle={counterpart.translate('TABS.VERSIONS.VERSIONS')} className="other-versions">
							<Versions actions={actions} classification={classification} />
						</div>
						<div tabTitle={counterpart.translate('TABS.CORRESPONDENCES.CORRESPONDENCES')} className="correspondence">
							<Correspondences actions={actions} selectedVersion={selectedVersion} params={params} />
						</div>
						<div tabTitle={counterpart.translate('TABS.VARIANTS.VARIANTS')} className="variants">
							<Variants actions={actions} selectedVersion={selectedVersion} params={params} />
						</div>
					</TabPanel>
				</div>
			</div>

		)
	}
}

Tabs.propTypes = {
	selectedVersion: PropTypes.object.isRequired,
	classification: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	modal: PropTypes.object.isRequired,
	isFetchingClass: PropTypes.bool.isRequired
}

Tabs.defaultProps = {
	tabs: [{"koder": counterpart.translate('TABS.CODES.CODES')},
			{"om": counterpart.translate('TABS.ABOUT.ABOUT')},
			{"endringer": counterpart.translate('TABS.CHANGES.CHANGES')},
			{"versjoner": counterpart.translate('TABS.VERSIONS.VERSIONS')},
			{"korrespondanser": counterpart.translate('TABS.CORRESPONDENCES.CORRESPONDENCES')},
			{"varianter": counterpart.translate('TABS.VARIANTS.VARIANTS')}]
}

Tabs.contextTypes = {
	router: PropTypes.object
}

export default Tabs
