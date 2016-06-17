import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

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
					<td colSpan="3">Fant ingen korrespondanser</td>
				</tr>
			)
		}

		return version.correspondenceTables.map(function(correspondence, key) {
			return (
				<tr key={key} className="clickable" onClick={() => this.handleClick(event, correspondence)}>
					<td>{correspondence.source}</td>
					<td>{correspondence.target}</td>
					<td>Ansvarlig seksjon {correspondence.owningSection}</td>
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

	}

	render () {
		const { params, selectedVersion } = this.props
		const selectedCorrespondence = selectedVersion.selectedCorrespondence

		if (params.itemId) {
			if (selectedVersion.isFetchingCorrespondence) {
				return (
					<div>Laster korrespondansetabell...</div>
				)
			}
			if (_.isEmpty(selectedCorrespondence)) {
				return (
					<div>Ingen korrespondansetabell</div>
				)
			}
			return (
				<div>
					<p className="back-link">
						&lt;&lt; <a href="javascript:history.back()">Tilbake til alle korrespondanser</a>
					</p>
					<h3>{selectedCorrespondence.name}</h3>
					<div><b>Ansvarlig:</b> {selectedCorrespondence.contactPerson}, seksjon for {selectedCorrespondence.owningSection}</div>
					<div><b>Publisert på:</b> {selectedCorrespondence.published.join()}</div>
					<p>{selectedCorrespondence.description}</p>
					<div className="button-heading">
						<button className="expand-tree" onClick={this.downloadCodes.bind(this)}>Last ned til Excel (csv)</button>
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
				<h3>Korrespondanser</h3>
				<p>En kort tekst som forteller hva en korrespondansetabell er.</p>
				<table className="table-correspondences alternate">
					<thead>
						<tr>
							<th>Korrespondanser fra</th>
							<th>Korrespondanser til</th>
							<th>Eier</th>
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
