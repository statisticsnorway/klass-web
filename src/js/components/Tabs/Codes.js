import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'
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

    resetFilter (ev) {
        ev.preventDefault()
        const { actions } = this.props
        ReactDOM.findDOMNode(this.refs.query).value = ''
		actions.searchCode("")
    }

	downloadCodes() {
		const { version } = this.props
		const csvURL = config.API_BASE_URL + '/versions/' + version.id + '.csv'

		var tempLink = document.createElement('a')
        document.body.appendChild(tempLink)
		tempLink.href = csvURL
		tempLink.setAttribute('download', 'code')
		tempLink.click()
	}

    filterText () {
        const { version } = this.props
        if (!_.isEmpty(version.filterQuery)) {
            return (
                <h3>
                    <Translate content="TABS.CODES.FILTERED_BY" /> "{version.filterQuery}"
                </h3>
            )
        }
    }

	renderList () {
		const { version, actions, modal } = this.props
		if (_.isEmpty(version.nestedItems)) {
			return (
				<p><i><Translate content="TABS.CODES.CODES_NOT_FOUND" /></i></p>
			)
		}
		return (
            <div>
                {this.filterText()}
                <List items={version.nestedItems} type="code" actions={actions} modal={modal}/>
            </div>
		)
	}

    openHierarchy (ev) {
        const {version, actions} = this.props
        if (ev.currentTarget.value == 'true') {
            ev.target.innerHTML = counterpart.translate('COMMON.CLOSE_HIERARCHY')
            ev.currentTarget.value = 'false'
            actions.toggleAll(true, 'code')
        } else {
            ev.target.innerHTML = counterpart.translate('COMMON.OPEN_HIERARCHY')
            ev.currentTarget.value = 'true'
            actions.toggleAll(false, 'code')
        }
    }

    handleChange (e) {
        if (e.target.checked) {
            _.forEach(document.getElementsByClassName('itemName'), function(el) {
                el.getElementsByClassName('longName')[0].style.display = 'none'
                el.getElementsByClassName('shortName')[0].style.display = 'inline'
            })
        } else {
            _.forEach(document.getElementsByClassName('itemName'), function(el) {
                el.getElementsByClassName('longName')[0].style.display = 'inline'
                el.getElementsByClassName('shortName')[0].style.display = 'none'
            })
        }
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
								type="text" ref="query" name="kodeverk" />
						</div>
						<div className="flex-item search-button">
    						<Translate component="button" type="submit" content="SEARCH.FILTER" />
						</div>
						<div className="flex-item reset-button">
    						<Translate component="button" content="SEARCH.RESET" onClick={(ev) => this.resetFilter(ev)} />
						</div>
					</div>
					<input type="checkbox" id="includeCodelist" onChange={(ev) => this.handleChange(ev)}/>
					<Translate component="label" content="TABS.CODES.SHOW_SHORT_TITLES" htmlFor="includeCodelist" />
				</form>
				<div className="button-heading">
                    <div className="flex-item">
                        <button ref="openCloseButton" value="true" onClick={(ev) => this.openHierarchy(ev)}>
                            <Translate content="COMMON.OPEN_HIERARCHY"/>
                        </button>
                    </div>
                    <div className="flex-item">
                        <Translate component="button" content="COMMON.DOWNLOAD_CSV" onClick={this.downloadCodes.bind(this)} />
                    </div>
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
	actions: PropTypes.object.isRequired,
	modal: PropTypes.object.isRequired
}

export default Codes
