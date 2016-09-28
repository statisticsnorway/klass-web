import React, { Component, PropTypes } from 'react'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'
import config from '../../config'

function getLocale() {
	if (sessionStorage.getItem('selectedAPILanguage')) {
		return sessionStorage.getItem('selectedAPILanguage')
	} else if (sessionStorage.getItem('selectedLanguage')) {
        return sessionStorage.getItem('selectedLanguage')
    }
	return 'NO'
}

class LocaleSwitcher extends Component {
	handleChange(e) {
    	// counterpart.setLocale(e.target.value);
		const { languages, onLanguageChange } = this.props
		Console.log(languages)
		onLanguageChange(this.props, e.target.value);
		forceUpdate();
	}

	render() {
		const {languages, onLanguageChange } = this.props
		if (!onLanguageChange) {
			return null
		}
		if (Array.isArray(languages)) {
			return (
				<div className="language-selector">
					<p>
						<Translate content="LANGUAGE.CHOOSE_LANGUAGE" />
					</p>
					<select defaultValue={getLocale()} onChange={this.handleChange.bind(this)}>
						{languages.indexOf("Bokmål")  >-1 ? <Translate component="option" value={config.LANGUAGES.BOKMAL} content="LANGUAGE.NORWEGIAN" /> : null}
						{languages.indexOf("Nynorsk") >-1 ? <Translate component="option" value={config.LANGUAGES.NYNORSK} content="LANGUAGE.NYNORSK" /> : null}
						{languages.indexOf("Engelsk") >-1 ? <Translate component="option" value={config.LANGUAGES.ENGLISH} content="LANGUAGE.ENGLISH" /> : null}
					</select>
				</div>
			)
		}else {
			return null;
		}
	}
}

LocaleSwitcher.propTypes = {
	languages: PropTypes.array,
	onLanguageChange: PropTypes.func,
	params: PropTypes.object,
	actions: PropTypes.object
}

export default LocaleSwitcher
