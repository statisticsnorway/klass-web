import './Sidebar.scss'
import React, { Component, PropTypes } from 'react'
import counterpart from 'counterpart'
import Translate from 'react-translate-component'
import LocaleSwitcher from './LocaleSwitcher'
import Contact from './Contact'
import Subscription from './Subscription'

class Sidebar extends Component{

	render () {
		const { contactInfo, languages, onLanguageChange, actions, params } = this.props
		return (
			<div className="sidebar">
				<LocaleSwitcher languages={languages} onLanguageChange={onLanguageChange} actions={actions} params={params} />
                <Contact contactInfo={contactInfo} />
                <Subscription actions={actions} params={params} />
			</div>
		)
	}
}

Sidebar.propTypes = {
	contactInfo: PropTypes.object.isRequired,
	languages: PropTypes.array.isRequired,
	onLanguageChange: PropTypes.func.isRequired,
	params: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
}

export default Sidebar
