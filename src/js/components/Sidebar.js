import React, { PropTypes } from 'react'

const Sidebar = React.createClass({
	render () {
		const { contactInfo } = this.props
		return (
			<div className="sidebar" id="contacts">
				<h2><span className="overskrift-tekst">Kontakt</span></h2>
				<p className="name">{contactInfo}</p>
				<p className="e-mail">
					<span className="key">E-post: </span>
					<a className="value" href="mailto:anne.gro.hustoft@ssb.no">anne.gro.hustoft@ssb.no</a>
				</p>
				<p className="phone">
					<span className="key">Tlf: </span>
					<span className="value">62 88 55 48</span>
				</p>
			</div>
		)
	}
})

Sidebar.propTypes = {
	contactInfo: PropTypes.string.isRequired // Should be object?
}

Sidebar.defaultProps = {
	contactInfo: 'Anne Gro Hustoft',	// Should be object
}

export default Sidebar
