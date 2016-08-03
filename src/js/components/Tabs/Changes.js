import React, { Component, PropTypes } from 'react'
import Translate from 'react-translate-component'
import _ from 'lodash'
import moment from 'moment'
import commonUtils from '../../lib/common-utils'

class Changes extends Component {

	componentDidMount() {
		const { actions, classification, params } = this.props
        let selectedChanges = classification.versions[0]
		if (params.versionId) {
            _.forEach(classification.versions, function(v) {
                if (v.id == params.versionId) {
                    selectedChanges = v
                    return false
                }
            })
        }

        if (!_.isEmpty(selectedChanges)){
            const query = {
                from: moment(selectedChanges.validFrom).subtract(1, 'days').format('YYYY-MM-DD'),
                to: moment(selectedChanges.validTo).isValid() ? moment(selectedChanges.validTo).format('YYYY-MM-DD') : ''
            }
            actions.loadChanges(params.classId, query)
        }
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
            // TODO: Grouping items by newCode or oldCode?

    		changes.codeChanges.sort(function(a,b) {
    			return a.newCode - b.newCode
    		})

            let groupedArray = commonUtils.groupBy(changes.codeChanges, function(item) {
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

        return null

    }

	render () {
		const { classification, params } = this.props
        let selectedChanges = classification.versions[0]

		if (params.versionId) {
            _.forEach(classification.versions, function(v) {
                if (v.id == params.versionId) {
                    selectedChanges = v
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

        const validFrom = moment(selectedChanges.validFrom).format('D.MMMM YYYY')
        const validTo = moment(selectedChanges.validTo).isValid() ? moment(selectedChanges.validTo).format('D.MMMM YYYY') : 'Gjeldende versjon'
        return (
            <div>
                <h3>
                    <Translate content="TABS.CHANGES.CHANGES_FROM" /> {validFrom} <Translate content="TABS.CHANGES.TO" /> {validTo.toLowerCase()}
                </h3>
                <table className="change-table alternate">
                    <thead>
                        <tr>
                            <th>{validFrom}</th>
                            <th>{validTo}</th>
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
