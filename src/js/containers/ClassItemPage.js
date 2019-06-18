import React, { Component } from "react";
import ReactDOM from "react-dom";
import Translate from "react-translate-component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";
import * as ClassActions from "../actions";
import _ from "lodash";
import moment from "moment";
import counterpart from 'counterpart'

function loadData(props, selectedLanguage) {
    const { params, actions } = props
    if (selectedLanguage) {
        sessionStorage.setItem('selectedAPILanguage', selectedLanguage)
    }

    function checkPublishStatus(v, classification) {
        const apiLang = sessionStorage.getItem('selectedAPILanguage');
        if (v.published.indexOf(apiLang) == -1) {
            const selectedLang = sessionStorage.getItem('selectedLanguage');
            if (v.published.indexOf(selectedLang) == -1) {
                // sessionStorage.setItem('selectedAPILanguage', classification.primaryLanguage)
                return classification.primaryLanguage;
            } else {
                // sessionStorage.setItem('selectedAPILanguage', selectedLang)
                return selectedLang;
            }
        }
        return null;
    }

    actions.getClassification(params.classId).then(function (res) {
        const classification = res.response
        if (!_.isEmpty(classification) && !_.isEmpty(classification.versions)) {
            let selectedVersion = classification.versions[0];
            
            // Find the right version to use
            let versionId = params.versionId;
            let currentValidVersion = classification.versions.filter((v) => moment(new Date()).isBetween(v.validFrom, v.validTo, 'day', []));
            if (!versionId && !_.isEmpty(currentValidVersion)) {
                versionId = _.head(currentValidVersion).id
            }

            // if desired language is not published fetch primary instead
            let overrideLanguage = checkPublishStatus(selectedVersion, classification);
            _.forEach(classification.versions, function (v) {
                if (v.id == versionId) {
                    overrideLanguage = checkPublishStatus(v, classification);
                    selectedVersion = v
                    return false
                }
            })
            // if desired language is not published fetch primary instead
            actions.loadVersion(versionId, overrideLanguage)

            if (!_.isEmpty(selectedVersion)) {
                const query = {
                    from: moment(selectedVersion.validFrom).subtract(1, 'days').format('YYYY-MM-DD'),
                    to: moment(selectedVersion.validTo).isValid() ? moment(selectedVersion.validTo).format('YYYY-MM-DD') : ''
                }
                actions.loadChanges(params.classId, query, overrideLanguage)
            }

            // } else {
            // actions.loadVersion()
        }
    })
}

class ClassItemPage extends Component {
    componentDidMount() {
        loadData(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.versionId !== this.props.params.versionId) {
            // nextProps.actions.loadVersion(nextProps.params.versionId)
            loadData(nextProps) // TODO Mads : find better solution for changes reload
        }
        if (nextProps.params.classId !== this.props.params.classId) {
            loadData(nextProps)
        }
    }

    componentDidUpdate() {
        // NOTE this might slow down the page / decrease performance
        const element = ReactDOM.findDOMNode(this.refs.description);
        // Things involving accessing DOM properties on element
        // In the case of what this question actually asks:
        if (element === null) return;
        const hasOverflowingChildren = element.offsetHeight < element.scrollHeight
            || element.offsetWidth < element.scrollWidth;
        if (!hasOverflowingChildren
            && ReactDOM.findDOMNode(this.refs.descLink).getAttribute("class") !== 'hide') {
            ReactDOM.findDOMNode(this.refs.descLink).setAttribute('class', 'hide');
        }
    }

    renderTabs() {
        const { classification, selectedVersion, actions, isFetching, params, modal } = this.props
        if ((_.isEmpty(selectedVersion.version) || (params.versionId && selectedVersion.version.id !== params.versionId)) && selectedVersion.isFetching) {
            return (
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            )
        }

        return (
            <Tabs
                classification={classification}
                selectedVersion={selectedVersion}
                actions={actions}
                isFetchingClass={isFetching}
                params={params}
                modal={modal} />
        )
    }

    showFullDescription(ev) {
        ReactDOM.findDOMNode(this.refs.description).setAttribute('class', 'description')
        ReactDOM.findDOMNode(this.refs.descLink).setAttribute('class', 'hide')
        ReactDOM.findDOMNode(this.refs.shortDescLink).setAttribute('class', 'clickable')
    }

    hideFullDescription(ev) {
        ReactDOM.findDOMNode(this.refs.description).setAttribute('class', 'description short')
        ReactDOM.findDOMNode(this.refs.descLink).setAttribute('class', 'clickable')
        ReactDOM.findDOMNode(this.refs.shortDescLink).setAttribute('class', 'hide')
    }

    render() {
        const { classification, selectedVersion, isFetching, actions, params } = this.props

        let breadcrumbStep = document.getElementsByClassName('step')

        if (_.isEmpty(classification)) {
            if (breadcrumbStep.length > 0) {
                breadcrumbStep[breadcrumbStep.length - 1].textContent = ""
            }
            return (
                <Translate component="p" content="CLASSIFICATIONS.NO_CLASS_FOUND" />
            )
        }

        if (_.isEmpty(classification) || isFetching) {
            if (breadcrumbStep.length > 0) {
                breadcrumbStep[breadcrumbStep.length - 1].textContent = ""
            }
            return (
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            )
        }

        if (breadcrumbStep.length > 0) {
            breadcrumbStep[breadcrumbStep.length - 1].textContent = classification.name
            document.title = classification.name + counterpart.translate("PAGE.TITLE_POSTFIX");
        }
        return (
            <div className="content klass-item">
                <div className="main">
                    <div className="heading">
                        <p><Translate content="CLASSIFICATIONS.STATISTICAL_UNIT" />:{' '}
                            <b>{classification.statisticalUnits[0]}</b></p>
                        <h1>{classification.name}</h1>
                        <p className="description short" ref="description">{classification.description}</p>
                        <p className="clickable" ref="descLink" onClick={(ev) => this.showFullDescription(ev)}>+
                            <Translate content="CLASS_ITEM.READ_MORE" /></p>
                        <p className="hide" ref="shortDescLink" onClick={(ev) => this.hideFullDescription(ev)}>-
                            <Translate content="CLASS_ITEM.READ_LESS" /></p>
                    </div>
                    {this.renderTabs()}
                </div>
                <Sidebar
                    contactInfo={classification.contactPerson}
                    languages={selectedVersion.version.published}
                    onLanguageChange={loadData}
                    actions={actions}
                    params={params} />
                <div className="clear-fix" />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    classification: state.selectedClass.classification,
    selectedVersion: state.selectedVersion,
    isFetching: state.selectedClass.isFetching,
    modal: state.modal
})

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ClassActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassItemPage)
