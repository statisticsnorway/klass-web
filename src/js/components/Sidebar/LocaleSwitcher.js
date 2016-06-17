import React, { Component, PropTypes } from 'react'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'
import config from '../../config'

function getLocale() {
	if (sessionStorage.getItem('selectedLanguage')) {
		return sessionStorage.getItem('selectedLanguage')
	}
	return 'NO'
}

class LocaleSwitcher extends Component {
	handleChange(e) {
    	counterpart.setLocale(e.target.value);
		const { onLanguageChange } = this.props
		onLanguageChange(this.props, e.target.value);
	}

	render() {
		const { onLanguageChange } = this.props
		if (!onLanguageChange) {
			return null
		}
		return (
			<div className="language-selector">
				<p>
					<Translate content="LANGUAGE.CHOOSE_LANGUAGE" />
				</p>
				<select defaultValue={getLocale()} onChange={this.handleChange.bind(this)}>
					<Translate component="option" value={config.LANGUAGES.BOKMAL} content="LANGUAGE.NORWEGIAN" />
					<Translate component="option" value={config.LANGUAGES.NYNORSK} content="LANGUAGE.NYNORSK" />
					<Translate component="option" value={config.LANGUAGES.ENGLISH} content="LANGUAGE.ENGLISH" />
				</select>
			</div>
		)
	}
}

LocaleSwitcher.propTypes = {
	onLanguageChange: PropTypes.func,
	params: PropTypes.object,
	actions: PropTypes.object
}

export default LocaleSwitcher
