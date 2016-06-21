import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Translate from 'react-translate-component'
import _ from 'lodash'
import List from '../List'
import moment from 'moment'
import config from '../../config'

class Codes extends Component {
	handleSubmit (event) {
		event.preventDefault()
		const { actions } = this.props
		const query = ReactDOM.findDOMNode(this.refs.query).value.trim()

		actions.searchCode(query)

	}

	handleChange (event) {

	}

	downloadCodes() {
		const { version, actions, params } = this.props
		const fromDate = version.validFrom
		const toDate = moment(version.validTo).isValid() ? ('&toDate=' + version.validTo) : ''
		const csvURL = config.API_BASE_URL + '/classifications/' + params.classId + '/codes.csv?from=' + fromDate + toDate + '&csvSeparator=;';

		var tempLink = document.createElement('a');
		tempLink.href = csvURL;
		tempLink.setAttribute('download', 'code.csv');
		tempLink.click();
	}

	renderList () {
		const { version, actions } = this.props
		if (_.isEmpty(version.nestedItems)) {
			return (
				<p><i><Translate content="TABS.CODES.CODES_NOT_FOUND" /></i></p>
			)
		}
		return (
			<List items={version.nestedItems} type="code" actions={actions}/>
		)
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)} className="search-box">
					<div className="flex-container">
						<div className="flex-item search-input-text">
							<Translate
								component="input"
								attributes={{ placeholder: 'TABS.CODES.SEARCH_BY_CODE_OR_NAME' }}
								onChange={this.handleChange.bind(this)}
								type="text" ref="query" name="kodeverk" />
						</div>
						<div className="flex-item search-button">
							<input type="submit" value="Søk" />
						</div>
					</div>
					<input type="checkbox" id="includeCodelist"/>
					<Translate component="label" content="TABS.CODES.SHOW_SHORT_TITLES" htmlFor="includeCodelist" />
				</form>
				<div className="button-heading">
					<Translate component="button" content="COMMON.OPEN_HIERARCHY" className="expand-tree" />
					<Translate component="button" content="COMMON.DOWNLOAD_CSV" className="expand-tree" onClick={this.downloadCodes.bind(this)} />
				</div>
					<div className="results class-list" id="expandcollapse">
						{this.renderList()}
					</div>
			</div>
		)
	}
}

Codes.propTypes = {
	version: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
}

export default Codes
