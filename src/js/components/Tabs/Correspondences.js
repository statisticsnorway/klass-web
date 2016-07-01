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

	componentWillReceiveProps(nextProps) {
		const { actions } = this.props
		if (nextProps.params.itemId && (nextProps.params.itemId !== this.props.params.itemId)) {
			actions.loadCorrespondence(nextProps.params.itemId)
		}
	}

	componentDidMount() {
		const { actions, params } = this.props
		if (params.itemId) {
			actions.loadCorrespondence(params.itemId)
		}
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

		if (version.correspondenceTables.length < 1) {
			return (
				<tr>
					<Translate component="td" content="TABS.CORRESPONDENCES.CORRESPONDENCE_NOT_FOUND" colSpan="3" />
				</tr>
			)
		}

		return version.correspondenceTables.map(function(correspondence, key) {
			return (
				<tr key={key} className="clickable" onClick={(ev) => this.handleClick(ev, correspondence)}>
					<td>{correspondence.source}</td>
					<td>{correspondence.target}</td>
					<td><Translate content="TABS.CORRESPONDENCES.OWNING_SECTION" /> {correspondence.owningSection}</td>
				</tr>
			)
		}.bind(this))
	}

	renderCorrTableBody(corrArr) {
		corrArr.sort(function(a,b) {
			return a.sourceCode - b.sourceCode
		})

		let groupedArray = groupBy(corrArr, function(item) {
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

	downloadCodes() {
		const { params } = this.props
		const csvURL = config.API_BASE_URL + '/correspondencetables/' + params.itemId + '.csv'

		var tempLink = document.createElement('a')
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
					<div><Translate content="TABS.CORRESPONDENCES.LOADING_CORRESPONDENCE_TABLE" /></div>
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
					<div><b><Translate content="TABS.CORRESPONDENCES.RESPONSIBLE" />:</b> {selectedCorrespondence.contactPerson}, <Translate content="TABS.CORRESPONDENCES.SECTION_FOR" /> {selectedCorrespondence.owningSection}</div>
					<div><b><Translate content="TABS.CORRESPONDENCES.PUBLISHED" />:</b> {selectedCorrespondence.published.join()}</div>
					<p>{selectedCorrespondence.description}</p>
					<div className="button-heading">
						<Translate component="button" content="COMMON.DOWNLOAD_CSV" className="expand-tree" onClick={this.downloadCodes.bind(this)} />
					</div>

					<table className="table-correspondenceTable alternate">
						<thead>
							<tr>
								<th>{selectedCorrespondence.source}</th>
								<th>{selectedCorrespondence.target}</th>
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
