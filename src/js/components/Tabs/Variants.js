import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Translate from 'react-translate-component'
import {Link} from "react-router";
import counterpart from 'counterpart'
import _ from 'lodash'
import List from '../List'
import FlatToNested from '../../lib/flat-to-nested'
import config from '../../config'
import moment from 'moment'

const flatToNested = new FlatToNested({
	id: 'code',
	parent: 'parentCode'
})

class Variants extends Component {

    handleSubmit (event) {
        event.preventDefault()
        const { actions } = this.props
        const query = ReactDOM.findDOMNode(this.refs.query).value.trim()

        actions.searchCode(query, "variant")
    }

    resetFilter (ev) {
        ev.preventDefault()
        const { actions } = this.props
        ReactDOM.findDOMNode(this.refs.query).value = ''
        actions.searchCode("", "variant")
    }

	componentDidMount() {
		const { actions, params } = this.props
		if (params.itemId) {
			actions.loadVariant(params.itemId)
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { actions } = this.props
		if (nextProps.params.itemId && (nextProps.params.itemId !== this.props.params.itemId)) {
			actions.loadVariant(nextProps.params.itemId)
		}
	}


	renderBody () {
		const { selectedVersion, params} = this.props
		const version = selectedVersion.version

		if (version.classificationVariants.length < 1) {
			return (
				<tr>
					<Translate component="td" content="TABS.VARIANTS.VARIANTS_NOT_FOUND" colSpan="2" />
				</tr>
			)
		}

        function getVariantPath(params, variant) {

            const url = variant._links.self.href
            const variantPath = '/' + url.substring(url.lastIndexOf("/") + 1, url.length)

            const classPath = '/' + params.classId
            const versionPath = params.versionId ? '/versjon/' + params.versionId : ''
            const tabPath = '/' + params.tab

            const path = "/klassifikasjoner" + classPath + versionPath + tabPath + variantPath
            return path;
        }

		return version.classificationVariants.map(function(variant, key) {
			return (
				<tr key={key} >
					<td><Link to={`${getVariantPath(params, variant)}`}>{variant.name}</Link></td>
					<td>{variant.owningSection}</td>
				</tr>
			)
		}.bind(this))
	}

	renderVariantList(items) {
		const { actions, modal } = this.props

        if (_.isEmpty(items)) {
			return (
				<p><Translate component="i" content="TABS.VARIANTS.VARIANTS_NOT_FOUND" /></p>
			)
		}
        const translations = {"screenReaderShowHide"   : counterpart.translate("COMMON.SHOW_HIDE")}
		return (
			<List items={items} displayName="code" type="variant" actions={actions} modal={modal} translations={translations}/>
		)
	}

    openHierarchy (ev) {
        const {version, actions} = this.props
        if (ev.currentTarget.value == 'true') {
            ev.target.innerHTML = counterpart.translate('COMMON.CLOSE_HIERARCHY')
            ev.currentTarget.value = 'false'
            actions.toggleAll(true, 'variant')
        } else {
            ev.target.innerHTML = counterpart.translate('COMMON.OPEN_HIERARCHY')
            ev.currentTarget.value = 'true'
            actions.toggleAll(false, 'variant')
        }
    }

    downloadCodes () {
		const { params ,selectedVersion} = this.props
		let language = selectedVersion.selectedVariant.language;
		let languageArgument = language == null ?  "" : "?language=" + language;
		const csvURL = config.API_BASE_URL + '/variants/' + params.itemId + '.csv' + languageArgument

		var tempLink = document.createElement('a')
        document.body.appendChild(tempLink)
		tempLink.href = csvURL
		tempLink.setAttribute('download', 'variant')
		tempLink.click()
    }


    addValidToIfPresent(validTo) {
        if (validTo != null)
            return (
				<div><b><Translate content="TABS.VALID_TO" />:</b>{moment(validTo).format("MMMM YYYY")}<br/></div>
            )
    }

		showWarning(validFrom, validTo) {
      if (validTo != null && moment(validTo).isBefore(new Date())) {
				return (
					<div className="version-info">
						<Translate component="p" content="TABS.VARIANT_NO_LONGER_VALID" className="red-box" />
					</div>
				)
			}

      if (validFrom != null && moment(validFrom).isAfter(new Date())) {
        return (
          <div className="version-info">
            <Translate component="p" content="TABS.VARIANT_NOT_YET_VALID" className="green-box" />
          </div>
        )
      }
		}

	render () {
		const { selectedVersion, params } = this.props
		const selectedVariant = selectedVersion.selectedVariant

		if (params.itemId) {
            if (selectedVersion.isFetchingVariant) {
                return (
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                )
            }
			if (_.isEmpty(selectedVariant)) {
				return (
					<Translate component="div" content="TABS.VARIANTS.VARIANT_EMPTY" />
				)
			}
			let joinedLanguages = selectedVariant.published.map(function(val){
				let comma = (val == selectedVariant.published[selectedVariant.published.length-1]) ? "" : ",";
				if (val == "nb")return <span><Translate content="LANGUAGE.NORWEGIAN" />{comma} </span>;
				if (val == "nn")return <span><Translate content="LANGUAGE.NYNORSK" />{comma} </span>;
				if (val == "en")return <span><Translate content="LANGUAGE.ENGLISH" />{comma} </span>;
			})
			return (
				<div>
					<p className="back-link">
						&lt;&lt; <Translate component="a" content="TABS.VARIANTS.BACK_TO_VARIANTS" href="javascript:history.back()" />
					</p>
          {this.showWarning(selectedVariant.validFrom ,selectedVariant.validTo)}
					<h3>{selectedVariant.name}</h3>
					<p>
                        <b><Translate content="TABS.CORRESPONDENCES.RESPONSIBLE" />:</b> {selectedVariant.contactPerson.name}<br/>
                        <b><Translate content="TABS.CORRESPONDENCES.PUBLISHED" />:</b> {joinedLanguages}<br/>
                        <b><Translate content="TABS.VALID_FROM" />:</b> {moment(selectedVariant.validFrom).format("D MMMM YYYY")}<br/>
                        {this.addValidToIfPresent(selectedVariant.validTo)}
                        {selectedVariant.introduction}
                    </p>
					<form onSubmit={this.handleSubmit.bind(this)} className="search-box">
						<div className="flex-container">
							<div className="flex-item search-input-text">
								<Translate
									component="input"
									aria-label={counterpart.translate('TABS.CODES.SEARCH_BY_CODE_OR_NAME')}
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
					</form>
					<div className="button-heading">
                        <button ref="openCloseButton" className="expand-tree" value="true" onClick={(ev) => this.openHierarchy(ev)}>
                            <Translate content="COMMON.OPEN_HIERARCHY"/>
                        </button>
						<Translate component="button" content="COMMON.DOWNLOAD_CSV" className="expand-tree" onClick={this.downloadCodes.bind(this)} />
					</div>

					<div className="results class-list" id="expandcollapse">
						{this.renderVariantList(selectedVariant.nestedItems)}
					</div>
				</div>
			)
		}

		return (
			<div>
				<Translate component="h3" content="TABS.VARIANTS.VARIANTS" />
				<Translate component="p" content="TABS.VARIANTS.DESCRIPTION" />
				<table className="table-correspondences alternate">
					<thead>
						<tr>
							<Translate component="th" content="TABS.VARIANTS.VARIANT" />
							<Translate component="th" content="TABS.VARIANTS.OWNER" />
						</tr>
					</thead>
					<tbody>
						{this.renderBody()}
					</tbody>
				</table>
			</div>
		)
	}
}

Variants.propTypes = {
	selectedVersion: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	modal: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired
}

Variants.contextTypes = {
	router: PropTypes.object
}

export default Variants
