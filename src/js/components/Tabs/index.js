import './Tabs.scss'
import React, { Component, PropTypes } from 'react'
import TabPanel, { TabStrip } from 'react-tab-panel' // from http://react-components.com/component/react-tab-panel
import 'react-tab-panel/base.css'
import Codes from './Codes'
import _ from 'lodash'

class Tabs extends Component {

	render () {
		const { version, actions, isFetching } = this.props
		if (isFetching) {
			return <div>Laster gjeldende versjon...</div>
		} else if (_.isEmpty(version)){
			return <div>Ingen versjoner tilgjengelig</div>
		}
		return (
			<div className="tabs">
				<div>Gjeldende versjon: <b>(Gyldig fra {version.validFrom})</b></div>
				<h2>{version.name}</h2>
				<div className="tab-content">
					<TabPanel>
						<div tabTitle="Koder" className="codes">
							<Codes items={version.classificationItems} actions={actions} isFetching={isFetching} />
						</div>
						<div tabTitle="Om versjonen" className="about-version">
							Om denne versjonen
						</div>
						<div tabTitle="Endringer" className="changes">
							Om endringer
						</div>
						<div tabTitle="Andre versjoner" className="other-versions">
							Andre versjoner
						</div>
						<div tabTitle="Korrespondanser" className="correspondence">
							Korrespondanser
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
	actions: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired
}

export default Tabs
