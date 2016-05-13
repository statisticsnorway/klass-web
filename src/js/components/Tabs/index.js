import './Tabs.scss'
import React, { Component, PropTypes } from 'react'
import TabPanel, { TabStrip } from 'react-tab-panel' // from http://react-components.com/component/react-tab-panel
import 'react-tab-panel/base.css'
import Codes from './Codes'
import About from './About'
import Changes from './Changes'
import Versions from './Versions'
import Correspondences from './Correspondences'
import _ from 'lodash'
import moment from 'moment'

class Tabs extends Component {

	componentWillMount() {
		const { classification, version, params, actions } = this.props

		if (!_.isEmpty(version)) {
			const fromDate = moment(version.validFrom).subtract(1, 'days').format('YYYY-MM-DD')
			const toDate = moment(version.validTo).isValid() ? moment(version.validTo).format('YYYY-MM-DD') : ''
			actions.loadChanges(params.classId, fromDate, toDate)
		}
	}

	renderVersionInfo () {
		const { classification, version } = this.props
		if (version.id !== classification.versions[classification.versions.length-1].id) {
			return (
				<div className="version-info">
					<div className="red-box">OBS! Denne versjonen er ikke lenger gyldig</div>
					<div><label>Utgått versjon:</label> <b>({moment(version.validFrom).format("D. MMMM YYYY")} - {moment(version.validTo).format("D. MMMM YYYY")})</b></div>
				</div>
			)
		} else {
			return (
				<div className="version-info">
					<label>Gjeldende versjon:</label> <b>(Gyldig fra {moment(version.validFrom).format("D. MMMM YYYY")})</b>
				</div>
			)
		}
	}

	render () {
		moment.locale('nb')
		const { classification, version, actions, isFetching } = this.props
		if (isFetching) {
			return <div>Laster gjeldende versjon...</div>
		} else if (_.isEmpty(version)){
			return <div>Ingen versjoner tilgjengelig</div>
		}

		return (
			<div className="tabs">
				{this.renderVersionInfo()}
				<h2>{version.name}</h2>
				<div className="tab-content">
					<TabPanel>
						<div tabTitle="Koder" className="codes">
							<Codes items={version.classificationItems} actions={actions} isFetching={isFetching} />
						</div>
						<div tabTitle="Om versjonen" className="about-version">
							<About actions={actions} version={version} />
						</div>
						<div tabTitle="Endringer" className="changes">
							<Changes classification={classification} version={version} />
						</div>
						<div tabTitle="Andre versjoner" className="other-versions">
							<Versions actions={actions} classification={classification} />
						</div>
						<div tabTitle="Korrespondanser" className="correspondence">
							<Correspondences actions={actions} version={version} />
						</div>
						<div tabTitle="Varianter" className="variants">
							Andre varianter
						</div>
					</TabPanel>
				</div>
			</div>

		)
	}
}

Tabs.propTypes = {
	version: PropTypes.object.isRequired,
	classification: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired
}

export default Tabs
