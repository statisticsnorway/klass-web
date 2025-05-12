import './Tabs.scss'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Translate from 'react-translate-component'
import counterpart from 'counterpart'
import { Wrapper, TabList, Tab, TabPanel } from 'react-aria-tabpanel' //https://github.com/davidtheclark/react-aria-tabpanel
import Codes from './Codes'
import About from './About'
import Changes from './Changes'
import Versions from './Versions'
import Correspondences from './Correspondences'
import Variants from './Variants'
import _ from 'lodash'

import moment from 'moment'
import 'moment/locale/nb.js'
import 'moment/locale/nn.js'

class Tabs extends Component {

    renderVersionInfo() {
        const { selectedVersion } = this.props
        const version = selectedVersion.version
        let validTo = version.validTo;
        let validFrom = version.validFrom;

        if (validTo != null && moment(validTo).isBefore(new Date())) {
            return (
                <div className="version-info">
                    <Translate component="p" content="TABS.VERSION_NO_LONGER_VALID" className="red-box" />
                    <p><Translate component="span" content="TABS.VERSION_EXPIRED" />: <b>({moment(version.validFrom).format("MMMM YYYY")} - {moment(version.validTo).format("MMMM YYYY")})</b></p>
                </div>
            )
        }
        if (validFrom != null && moment(validFrom).isAfter(new Date())) {
            return (
                <div className="version-info">
                    <Translate component="p" content="TABS.VERSION_NOT_YET_VALID" className="green-box" />
                    <p><Translate component="span" content="TABS.VERSION_FUTURE" />: <b>(<Translate content="TABS.VALID_FROM" /> {moment(version.validFrom).format("MMMM YYYY")})</b></p>
                </div>
            )
        }
        else {
            return (
                <p className="version-info">
                    <Translate component="span" content="TABS.CURRENT_VERSION" />: <b>(<Translate content="TABS.VALID_FROM" /> {moment(version.validFrom).format("MMMM YYYY")})</b>
                </p>
            )
        }
    }

    onActivate(tabIndex) {
        const { params } = this.props
        const classPath = '/' + params.classId
        const versionPath = params.versionId ? '/versjon/' + params.versionId : ''
        const tabPath = '/' + tabIndex
        const path = "/klassifikasjoner" + classPath + versionPath + tabPath

        this.context.router.push(path)
    }

    render() {
        if (sessionStorage.getItem('selectedLanguage')) {
            moment.locale(sessionStorage.getItem('selectedLanguage'))
        } else {
            moment.locale('nb')
        }

        const { classification, selectedVersion, actions, isFetchingClass, params, modal } = this.props

        if (isFetchingClass) {
            return <Translate component="div" content="TABS.LOADING_CURRENT_VERSION" />
        } else if (_.isEmpty(selectedVersion.version)) {
            return <Translate content="TABS.VERSIONS_NOT_FOUND" component="p" />
        }

        const tabDescriptions = [
            {
                title: counterpart.translate('TABS.CODES.CODES'),
                id: 'koder',
                content: (<Codes key="Codes" classification={classification} version={selectedVersion.version} params={params} actions={actions} modal={modal} />)
            },
            {
                title: counterpart.translate('TABS.ABOUT.ABOUT'),
                id: 'om',
                content: (<About key="About" actions={actions} version={selectedVersion.version} />)
            },
            {
                title: counterpart.translate('TABS.CHANGES.CHANGES'),
                id: 'endringer',
                content: (<Changes key="Changes" actions={actions} classification={classification} selectedVersion={selectedVersion} params={params} />)
            },
            {
                title: counterpart.translate('TABS.VERSIONS.VERSIONS'),
                id: 'versjoner',
                content: (<Versions key="Versions" actions={actions} classification={classification} />)
            },
            {
                title: counterpart.translate('TABS.CORRESPONDENCES.CORRESPONDENCES'),
                id: 'korrespondanser',
                content: (<Correspondences key="Correspondences" actions={actions} selectedVersion={selectedVersion} params={params} />)
            },
            {
                title: counterpart.translate('TABS.VARIANTS.VARIANTS'),
                id: 'varianter',
                content: (<Variants key="Variants" actions={actions} selectedVersion={selectedVersion} params={params} modal={modal} />)
            }
        ]

        const tabIndex = params.tab ? params.tab : 'koder'
        const tabs = tabDescriptions.map((tabDescription, i) => {
            let innerCl
            return (
                <li key={i}>
                    <Tab id={tabDescription.id} active={tabDescription.id === tabIndex}>
                        {tabDescription.title}
                    </Tab>
                </li>
            )
        })

        const panels = tabDescriptions.map((tabDescription, i) =>
            <TabPanel
                key={i}
                tabId={tabDescription.id}
                active={tabDescription.id === tabIndex}
            >
                {tabDescription.content}
            </TabPanel>
        )

        return (
            <div className="tabs">
                {this.renderVersionInfo()}
                <h2>{selectedVersion.version.name}</h2>

                <div className="tab-content">
                    <Wrapper onChange={this.onActivate.bind(this)} activeTabId={tabIndex}>
                        <TabList>
                            <ul>
                                {tabs}
                            </ul>
                        </TabList>
                        <div className="tabBody">
                            {panels}
                        </div>
                    </Wrapper>
                </div>
            </div>
        )

    }
}

Tabs.propTypes = {
    selectedVersion: PropTypes.object.isRequired,
    classification: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    isFetchingClass: PropTypes.bool.isRequired
}

Tabs.contextTypes = {
    router: PropTypes.object
}

export default Tabs
