import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Translate from 'react-translate-component'
import _ from 'lodash'
import moment from 'moment'
import commonUtils from '../../lib/common-utils'

class Changes extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual( this.props.classification, nextProps.classification)
            || !_.isEqual( this.props.selectedVersion, nextProps.selectedVersion)
            || !_.isEqual( this.state.invertedTable, nextState.invertedTable)
    }

    constructor() {
        super()
        this.state = {
            invertedTable: true
        }
    }

    invertTable () {
        this.setState({
            invertedTable: !this.state.invertedTable
        })
    }

    renderChangesBody () {
		const { classification, selectedVersion } = this.props
		const changes = selectedVersion.changes

        if (selectedVersion.isFetching) {
            return (
                <tr>
                    <Translate component="td" colSpan="2" content="LOADING.LOADING_CONTENT" />
                </tr>
            )
        }

        if (_.isEmpty(changes.codeChanges)) {
            return (
                <tr>
                    <Translate component="td" colSpan="2" content="TABS.CHANGES.CHANGES_NOT_FOUND" />
                </tr>
            )
        }


        if (!_.isEmpty(changes.codeChanges)) {
            let groupedArray

            switch (this.state.invertedTable) {
                case false:

            		changes.codeChanges.sort(function(a,b) {
            			return a.oldCode - b.oldCode
            		})

                    groupedArray = commonUtils.groupBy(changes.codeChanges, function(item) {
                        return [item.oldCode]
                    })

            		return groupedArray.map(function(item, key){
            			let targetList = item.sort(function(a,b){return a.newCode-b.newCode}).map(function(subItem, key){
            				return (
            					<li key={key}><b>{subItem.newCode}</b> - {subItem.newName}</li>
            				)
            			})

            			return (
            				<tr key={key}>
            					<td>
                                    <b>{item[0].oldCode}</b> - {item[0].oldName}
                                </td>
            					<td>
            						<ul className="grouped-codelist">{targetList}</ul>
            					</td>
            				</tr>
            			)
            		})

                case true:

            		changes.codeChanges.sort(function(a,b) {
            			return a.newCode - b.newCode
            		})

                    groupedArray = commonUtils.groupBy(changes.codeChanges, function(item) {
                        return [item.newCode]
                    })

            		return groupedArray.map(function(item, key){
            			let targetList = item.sort(function(a,b){return a.oldCode-b.oldCode}).map(function(subItem, key){
            				return (
            					<li key={key}><b>{subItem.oldCode}</b> - {subItem.oldName}</li>
            				)
            			})

            			return (
            				<tr key={key}>
            					<td>
                                    <b>{item[0].newCode}</b> - {item[0].newName}
                                </td>
            					<td>
            						<ul className="grouped-codelist">{targetList}</ul>
            					</td>
            				</tr>
            			)
            		})

            }


        }

        return null

    }

	render () {
		const { classification, params, selectedVersion } = this.props
    const versionsSorted = classification.versions.sort((a, b) => (a.validFrom < b.validFrom) ? 1 : -1)
    let selectedVersionIndex = versionsSorted.findIndex(obj => obj.id == selectedVersion.version.id)
    let selectedChanges = versionsSorted[selectedVersionIndex]
    let previousVersion = versionsSorted[selectedVersionIndex + 1]

		if (params.versionId) {
            _.forEach(versionsSorted, function(v, i) {
                if (v.id == params.versionId) {
                    selectedChanges = v
                    previousVersion = versionsSorted[i+1]
                    return false
                }
            })
        }

        if (_.isEmpty(selectedChanges)) {
            return (
                <div>
                <p className="back-link">
                &lt;&lt; <Translate component="a" content="TABS.CHANGES.BACK_TO_CHANGES" href="javascript:history.back()" />
                </p>
                <Translate component="p" content="TABS.CHANGES.CHANGES_NOT_FOUND" />
                </div>
            )
        }

        const validFrom = moment(selectedChanges.validFrom).format('MMMM YYYY')
        const validTo = moment(selectedChanges.validTo).isValid() ? moment(selectedChanges.validTo).format('MMMM YYYY') : 'Gjeldende versjon'
        const previousVersionValidFrom = (previousVersion && moment(previousVersion.validFrom).isValid()) ? moment(previousVersion.validFrom).format('MMMM YYYY') : '-'
        return (
            <div>
                <h3>
                    <Translate content="TABS.CHANGES.HEADER" />
                </h3>
                <div className="button-heading">
                    <Translate component="button" content="COMMON.INVERT_TABLE" className="expand-tree" onClick={this.invertTable.bind(this)} />
                </div>
                <table className="change-table alternate">
                    <thead>
                        <tr>
                            <th>{this.state.invertedTable ? validFrom : previousVersionValidFrom}</th>
                            <th>{this.state.invertedTable ? previousVersionValidFrom : validFrom}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderChangesBody()}
                    </tbody>
                </table>
            </div>
        )
	}
}

Changes.propTypes = {
	classification: PropTypes.object.isRequired,
	selectedVersion: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired
}

Changes.contextTypes = {
	router: PropTypes.object
}

export default Changes
