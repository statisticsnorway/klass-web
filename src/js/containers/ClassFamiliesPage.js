import React, {Component} from 'react'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as ClassActions from '../actions'
import Search from '../components/Search'
import List from '../components/List'
import Sidebar from '../components/Sidebar'

function loadData(props) {
    const {actions} = props
    actions.loadSubjects()
}

class ClassFamiliesPage extends Component {
    componentWillMount() {
        loadData(this.props)
    }

    openHierarchy(ev) {
        const {items, actions} = this.props
        if (ev.currentTarget.value == 'true') {
            ev.target.innerHTML = counterpart.translate('COMMON.CLOSE_HIERARCHY')
            ev.currentTarget.value = 'false';
            actions.toggleAllSubjects(true)
        } else {
            ev.target.innerHTML = counterpart.translate('COMMON.OPEN_HIERARCHY')
            ev.currentTarget.value = 'true';
            actions.toggleAllSubjects(false)
        }
    }

    renderContent() {
        const {items, isFetching, actions} = this.props

        return (
            <div>
                <div className="list-heading">
                    <button ref="openCloseButton" className="expand-tree" value="true" onClick={(ev) => this.openHierarchy(ev)}>
                        <Translate content="COMMON.OPEN_HIERARCHY"/>
                    </button>
                    <Translate component="h3" content="CLASSIFICATIONS.CHOOSE_CLASS_FAMILY"/>
                </div>
                <div className="results class-list" id="expandcollapse">
                    <List items={items} isFetching={isFetching} type="classFamilies" actions={actions}/>
                </div>
            </div>
        )
    }

    render() {
        const {actions, ssbSections, search} = this.props
        return (
            <div className="content">
                <div className="heading">
                    <Translate component="h1" content="CLASSIFICATIONS.CLASSIFICATIONS_AND_CODELISTS"/>
                </div>
                <div className="main">
                    <Translate component="p" content="CLASSIFICATIONS.CLASS_DESCRIPTION"/>
                    <Search actions={actions} sections={ssbSections} search={search}/> {this.renderContent()}
                </div>
                <Sidebar/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.classFamilies.items,
        isFetching: state.classFamilies.isFetching,
        ssbSections: state.classFamilies.ssbSections,

        search: state.searchResult.search,
        searchResult: state.searchResult.items,
        searchIsFetching: state.searchResult.isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ClassActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassFamiliesPage)
