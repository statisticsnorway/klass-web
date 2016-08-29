import React, { Component, PropTypes } from 'react'
import Translate from 'react-translate-component'
import _ from 'lodash'
import config from '../../config'

function groupBy(array, f) {
	var groups = {};
	array.forEach( function( o ) {
		var group = JSON.stringify( f(o) );
		groups[group] = groups[group] || [];
		groups[group].push( o );
	});
	return Object.keys(groups).map( function( group ) {
		return groups[group];
	})
}

class Correspondences extends Component {

    constructor() {
        super()
        this.state = {
            invertedTable: true
        }
    }

	componentDidMount() {
		const { actions, params } = this.props
		if (params.itemId) {
			actions.loadCorrespondence(params.itemId)
		}
	}

	componentWillReceiveProps(nextProps) {
		const { actions } = this.props
		if (nextProps.params.itemId && (nextProps.params.itemId !== this.props.params.itemId)) {
			actions.loadCorrespondence(nextProps.params.itemId)
		}
	}

    invertTable () {
        this.setState({
            invertedTable: !this.state.invertedTable
        })
    }

	handleClick(event, correspondence) {
		const { params } = this.props

		const url = correspondence._links.self.href
		const corrPath = '/' + url.substring(url.lastIndexOf("/") + 1, url.length)

		const classPath = '/' + params.classId
		const versionPath = params.versionId ? '/versjon/' + params.versionId : ''
		const tabPath = '/' + params.tab

		const path = "/klassifikasjoner" + classPath + versionPath + tabPath + corrPath
		this.context.router.push(path)
	}

	renderBody () {
		const { selectedVersion } = this.props
		const version = selectedVersion.version

		if (version.correspondenceTables.length < 1 ||
            (version.correspondenceTables.length == 1 && version.correspondenceTables[0].changeTable)) {
			return (
				<tr>
					<Translate component="td" content="TABS.CORRESPONDENCES.CORRESPONDENCE_NOT_FOUND" colSpan="3" />
				</tr>
			)
		}

		return version.correspondenceTables.map(function(correspondence, key) {
            if (!correspondence.changeTable){
                return (
                    <tr key={key} className="clickable" onClick={(ev) => this.handleClick(ev, correspondence)}>
                        <td>{correspondence.source}</td>
                        <td>{correspondence.target}</td>
                        <td><Translate content="TABS.CORRESPONDENCES.OWNING_SECTION" /> {correspondence.owningSection}</td>
                    </tr>
                )
            }
		}.bind(this))
	}

	renderCorrTableBody(corrArr) {
        let groupedArray

        switch (this.state.invertedTable) {
            case false:
                corrArr.sort(function(a,b) {
    				if (a.targetCode.toLowerCase() > b.targetCode.toLowerCase()) {
    					return 1
    				}
    				if (a.targetCode.toLowerCase() < b.targetCode.toLowerCase()) {
    					return -1
    				}
    				return 0
                })

                groupedArray = groupBy(corrArr, function(item) {
                    return [item.targetCode];
                })

                return groupedArray.map(function(item, key) {
                    let targetList = item.sort(function(a,b){return a.sourceCode-b.sourceCode}).map(function(subItem, key){
                        return (
                            <li key={key}><b>{subItem.sourceCode}</b> - {subItem.sourceName}</li>
                        )
                    })

                    return (
                        <tr key={key}>
                            <td><b>{item[0].targetCode}</b> - {item[0].targetName}</td>
                            <td>
                                <ul className="corr-targetlist">{targetList}</ul>
                            </td>
                        </tr>
                    )
                })
            case true:
                corrArr.sort(function(a,b) {
    				if (a.sourceCode.toLowerCase() > b.sourceCode.toLowerCase()) {
    					return 1
    				}
    				if (a.sourceCode.toLowerCase() < b.sourceCode.toLowerCase()) {
    					return -1
    				}
    				return 0
                })

                groupedArray = groupBy(corrArr, function(item) {
                    return [item.sourceCode];
                })

                return groupedArray.map(function(item, key) {
                    let targetList = item.sort(function(a,b){return a.targetCode-b.targetCode}).map(function(subItem, key){
                        return (
                            <li key={key}><b>{subItem.targetCode}</b> - {subItem.targetName}</li>
                        )
                    })

                    return (
                        <tr key={key}>
                            <td><b>{item[0].sourceCode}</b> - {item[0].sourceName}</td>
                            <td>
                                <ul className="corr-targetlist">{targetList}</ul>
                            </td>
                        </tr>
                    )
                })
        }
	}

	downloadCodes() {
		const { params } = this.props
		const csvURL = config.API_BASE_URL + '/correspondencetables/' + params.itemId + '.csv'

		var tempLink = document.createElement('a')
        document.body.appendChild(tempLink)
		tempLink.href = csvURL
		tempLink.setAttribute('download', 'correspondencetable')
		tempLink.click()
	}

	render () {
		const { params, selectedVersion } = this.props
		const selectedCorrespondence = selectedVersion.selectedCorrespondence

		if (params.itemId) {
			if (selectedVersion.isFetchingCorrespondence) {
				return (
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
				)
			}
			if (_.isEmpty(selectedCorrespondence)) {
				return (
					<Translate component="div" content="TABS.CORRESPONDENCES.CORRESPONDENCE_TABLE_NOT_FOUND" />
				)
			}
			return (
				<div>
					<p className="back-link">
						&lt;&lt; <Translate component="a" content="TABS.CORRESPONDENCES.BACK_TO_CORRESPONDENCES" href="javascript:history.back()" />
					</p>
					<h3>{selectedCorrespondence.name}</h3>
					<p>
                        <b><Translate content="TABS.CORRESPONDENCES.RESPONSIBLE" />:</b> {selectedCorrespondence.contactPerson.name}, <Translate content="TABS.CORRESPONDENCES.SECTION_FOR" /> {selectedCorrespondence.owningSection}<br/>
                        <b><Translate content="TABS.CORRESPONDENCES.PUBLISHED" />:</b> {selectedCorrespondence.published.join()}<br/>
    					{selectedCorrespondence.description}
                    </p>
					<div className="button-heading">
                        <Translate component="button" content="COMMON.INVERT_TABLE" className="expand-tree" onClick={this.invertTable.bind(this)} />
						<Translate component="button" content="COMMON.DOWNLOAD_CSV" className="expand-tree" onClick={this.downloadCodes.bind(this)} />
					</div>

					<table className="table-correspondenceTable alternate">
						<thead>
							<tr>
                                <th>{this.state.invertedTable ? selectedCorrespondence.source : selectedCorrespondence.target}</th>
								<th>{this.state.invertedTable ? selectedCorrespondence.target : selectedCorrespondence.source}</th>
							</tr>
						</thead>
						<tbody>
							{this.renderCorrTableBody(selectedCorrespondence.correspondenceMaps)}
						</tbody>
					</table>
				</div>
			)
		}

		return (
			<div>
				<Translate component="h3" content="TABS.CORRESPONDENCES.CORRESPONDENCES" />
				<Translate component="p" content="TABS.CORRESPONDENCES.DESCRIPTION" />
				<table className="table-correspondences alternate">
					<thead>
						<tr>
							<Translate component="th" content="TABS.CORRESPONDENCES.CORRESPONDENCES_FROM" />
							<Translate component="th" content="TABS.CORRESPONDENCES.CORRESPONDENCES_TO" />
							<Translate component="th" content="TABS.CORRESPONDENCES.OWNER" />
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

Correspondences.propTypes = {
	selectedVersion: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired
}

Correspondences.contextTypes = {
	router: PropTypes.object
}

export default Correspondences
