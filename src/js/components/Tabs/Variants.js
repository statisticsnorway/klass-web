import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import List from '../List'
import FlatToNested from '../../lib/flat-to-nested'

const flatToNested = new FlatToNested({
	id: 'code',
	parent: 'parentCode'
})

class Variants extends Component {

	componentWillReceiveProps(nextProps) {
		const { actions } = this.props
		if (nextProps.params.itemId && (nextProps.params.itemId !== this.props.params.itemId)) {
			actions.loadVariant(nextProps.params.itemId)
		}
	}

	componentDidMount() {
		const { actions, params } = this.props
		if (params.itemId) {
			actions.loadVariant(params.itemId)
		}
	}

	handleClick(event, variant) {
		const { params } = this.props

		const url = variant._links.self.href
		const variantPath = '/' + url.substring(url.lastIndexOf("/") + 1, url.length)

		const classPath = '/' + params.classId
		const versionPath = params.versionId ? '/versjon/' + params.versionId : ''
		const tabPath = '/' + params.tab

		const path = "/klassifikasjoner" + classPath + versionPath + tabPath + variantPath
		this.context.router.push(path)
	}

	renderBody () {
		const { version } = this.props

		if (version.classificationVariants.length < 1) {
			return (
				<tr>
					<td colSpan="2">Fant ingen varianter</td>
				</tr>
			)
		}

		return version.classificationVariants.map(function(variant, key) {
			return (
				<tr key={key} className="clickable" onClick={() => this.handleClick(event, variant)}>
					<td>{variant.name}</td>
					<td>Seksjon for {variant.owningSection}</td>
				</tr>
			)
		}.bind(this))
	}

	renderVariantList(items) {
		const { actions } = this.props
		if (items.length < 1) {
			return (
				<p><i>Fant ingen varianter</i></p>
			)
		}
		return (
			<List items={items} displayName="code" type="variant" actions={actions}/>
		)
	}

	render () {
		const { selectedVariant, params } = this.props

		if (params.itemId) {
			if (_.isEmpty(selectedVariant)) {
				return (
					<div>Ingen korrespondansetabell</div>
				)
			}
			return (
				<div>
					<p className="back-link">
						&lt;&lt; <a href="javascript:history.back()">Tilbake til alle varianter</a>
					</p>
					<h3>{selectedVariant.name}</h3>
					<div><b>Ansvarlig:</b> {selectedVariant.contactPerson}, seksjon for {selectedVariant.owningSection}</div>
					<div><b>Publisert på:</b> {selectedVariant.published.join()}</div>
					<p>{selectedVariant.description}</p>
					<div className="button-heading">
						<button className="expand-tree">Åpne hierarkiet</button>
						<button className="expand-tree">Last ned til Excel (csv)</button>
					</div>

					<div className="results class-list" id="expandcollapse">
						{this.renderVariantList(selectedVariant.nestedItems)}
					</div>
				</div>
			)
		}

		return (
			<div>
				<h3>Varianter</h3>
				<p>En kort tekst som forteller hva en variant er.</p>
				<table className="table-correspondences alternate">
					<thead>
						<tr>
							<th>Variant</th>
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

Variants.propTypes = {
	version: PropTypes.object.isRequired,
	selectedVariant: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired
}

Variants.contextTypes = {
	router: PropTypes.object
}

export default Variants
