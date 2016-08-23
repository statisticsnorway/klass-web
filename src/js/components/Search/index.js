import './Search.scss'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Translate from 'react-translate-component'
import Modal from 'simple-react-modal'
import counterpart from 'counterpart'
import _ from 'lodash'

class Search extends Component {

	componentWillMount() {
		const { actions } = this.props
		actions.loadSSBSections()
	}

	handleSubmit(event) {
		event.preventDefault()
		const { actions } = this.props
		const searchObj = {
			"query": ReactDOM.findDOMNode(this.refs.query).value.trim(),
			"ssbSection": ReactDOM.findDOMNode(this.refs.ssbSection).value,
			"includeCodelists": ReactDOM.findDOMNode(this.refs.includeCodelists).checked
		}

		actions.searchClassification(searchObj)

		const path = "/sok?query=" + searchObj.query + "&includeCodelists=" + searchObj.includeCodelists + "&ssbSection=" + searchObj.ssbSection
		this.context.router.push(path)
	}

	handleChange(event) {
		const { actions } = this.props
		const searchObj = {
			"query": this.refs.query.value,
			"ssbSection": this.refs.ssbSection.value,
			"includeCodelists": this.refs.includeCodelists.checked
		}
		actions.setSearchObject(searchObj);

	}

    displayModal () {
        const { actions } = this.props
        const item = {
            "title": counterpart.translate('SEARCH.WHAT_IS_CODELIST_HEADER'),
            "body": counterpart.translate('SEARCH.WHAT_IS_CODELIST_BODY')
        }

		actions.displayModal(item);
    }

	closeModal () {
		const { actions } = this.props
		actions.hideModal()
	}

    renderModal () {
        const { modal } = this.props

        if (modal && !_.isEmpty(modal.item)) {
            return (
    			<Modal
    				closeOnOuterClick={true}
                    style={{background: 'rgba(0, 0, 0, 0.2)'}}
                    containerStyle={{background: '#666666'}}
    				show={modal.modalIsOpen}
    				onClose={this.closeModal.bind(this)}>
    					<div className="modal-content">
    						<a onClick={this.closeModal.bind(this)}>
    							<i className="fa fa-times-circle-o close-button" aria-hidden="true"></i>
    						</a>
    						<h2>{modal.item.title}</h2>
    						<div><p>{modal.item.body}</p></div>
    					</div>
    			</Modal>
            )
        }
        return null
    }

	render () {
		const { sections, search } = this.props
        const ssbSections = sections.ssbSections

		let options
		if (ssbSections.length) {
			ssbSections.sort(function(a,b){
				return a.name - b.name
			})
			options = ssbSections.map(function(section, key){
				return (
					<option key={key} value={section.name}>{section.name}</option>
				)
			})
		}
		const dropdown = (
			<select name="seksjon" ref="ssbSection" defaultValue={search.ssbSection} onChange={this.handleChange.bind(this)}>
				<Translate component="option" value="" content="SEARCH.ALL_SECTIONS" />
				{options}
			</select>
		)
		return (
			<form onSubmit={this.handleSubmit.bind(this)} className="search-box">
				<div className="flex-container">
					<div className="flex-item search-input-text">
						<Translate component="label" content="SEARCH.SEARCH_KODEVERK" />
						<Translate component="input" type="text" ref="query" defaultValue={search.query} onChange={this.handleChange.bind(this)} attributes={{ placeholder: 'SEARCH.SEARCH' }} />
					</div>
					<div className="flex-item search-dropdown-section">
						<Translate component="label" content="SEARCH.OWNING_SECTION" />
						{dropdown}
					</div>
					<div className="flex-item search-button">
						<Translate component="button" type="submit" content="SEARCH.SEARCH" />
					</div>
				</div>
				<input type="checkbox" id="includeCodelists" ref="includeCodelists" onChange={this.handleChange.bind(this)} defaultChecked={search.includeCodelists == true}/>
				<Translate component="label" htmlFor="includeCodelists" content="SEARCH.INCLUDE_CODELISTS" />
				<i className="fa fa-info-circle" aria-hidden="true" onClick={() => this.displayModal()}></i>
                {this.renderModal()}
			</form>
		)
	}
}

Search.propTypes = {
	actions: PropTypes.object.isRequired,
	sections: PropTypes.object.isRequired,
	search: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
	return {
		modal: state.modal
	}
}

Search.contextTypes = {
	router: PropTypes.object
}

export default connect(
	mapStateToProps
)(Search)
