import React, { Component, PropTypes } from 'react'
import Translate from 'react-translate-component'

class Contact extends Component {

	render() {
        const { contactInfo } = this.props

        return (
            <div id="contacts">
                <h2>
                    <span className="icon-contact">
                        <Translate content="CONTACT.HEADER" />
                    </span>
                </h2>
                <div className="side-content-wrapper">
                    <p className="name">{contactInfo.name}</p>
                    <p className="e-mail">
                        <span className="key"><Translate content="CONTACT.EMAIL" />: </span>
                        <a className="value" href={"mailto:" + contactInfo.email}>{contactInfo.email}</a>
                    </p>
                    <p className="phone">
                        <span className="key"><Translate content="CONTACT.PHONE" />: </span>
                        <span className="value">{contactInfo.phone}</span>
                    </p>
                </div>
            </div>
        )
	}
}

Contact.propTypes = {
	contactInfo: PropTypes.object.isRequired
}

Contact.defaultProps = {
    contactInfo: {
        name: 'Anne Gro Hustoft',
        email: 'anne.gro.hustoft@ssb.no',
        phone: '40 90 25 52'
    }
}

export default Contact
