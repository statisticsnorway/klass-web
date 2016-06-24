import './Sidebar.scss'
import React, { Component, PropTypes } from 'react'
import counterpart from 'counterpart'
import Translate from 'react-translate-component'
import LocaleSwitcher from './LocaleSwitcher'

class Sidebar extends Component{

	render () {
		const { contactInfo, onLanguageChange, actions, params } = this.props
		return (
			<div className="sidebar">
				<LocaleSwitcher onLanguageChange={onLanguageChange} actions={actions} params={params} />

				<div id="contacts">
                    <h2><span className="overskrift-tekst">
                        <Translate content="CONTACT.HEADER" />
                    </span></h2>
                    <div className="contact">
                        <p className="name">{contactInfo}</p>
                        <p className="e-mail">
                            <span className="key"><Translate content="CONTACT.EMAIL" />: </span>
                            <a className="value" href="mailto:anne.gro.hustoft@ssb.no">anne.gro.hustoft@ssb.no</a>
                        </p>
                        <p className="phone">
                            <span className="key"><Translate content="CONTACT.PHONE" />: </span>
                            <span className="value">62 88 55 48</span>
                        </p>
                    </div>
				</div>
			</div>
		)
	}
}

Sidebar.propTypes = {
	contactInfo: PropTypes.string.isRequired, // Should be object?
	onLanguageChange: PropTypes.func,
	params: PropTypes.object,
	actions: PropTypes.object
}

Sidebar.defaultProps = {
	contactInfo: 'Anne Gro Hustoft',	// Should be object
}

export default Sidebar
