import React, { Component, PropTypes } from 'react'
import Translate from 'react-translate-component'
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
		const { selectedVersion } = this.props
		const version = selectedVersion.version

		if (version.classificationVariants.length < 1) {
			return (
				<tr>
					<Translate component="td" content="TABS.VARIANTS.VARIANTS_NOT_FOUND" colSpan="2" />
				</tr>
			)
		}

		return version.classificationVariants.map(function(variant, key) {
			return (
				<tr key={key} className="clickable" onClick={(ev) => this.handleClick(ev, variant)}>
					<td>{variant.name}</td>
					<td><Translate content="TABS.VARIANTS.SECTION_FOR" /> {variant.owningSection}</td>
				</tr>
			)
		}.bind(this))
	}

	renderVariantList(items) {
		const { actions } = this.props
		if (items.length < 1) {
			return (
				<p><Translate component="i" content="TABS.VARIANTS.VARIANTS_NOT_FOUND" /></p>
			)
		}
		return (
			<List items={items} displayName="code" type="variant" actions={actions}/>
		)
	}

	render () {
		const { selectedVersion, params } = this.props
		const selectedVariant = selectedVersion.selectedVariant

		if (params.itemId) {
			if (_.isEmpty(selectedVariant)) {
				return (
					<Translate component="div" content="TABS.VARIANTS.VARIANT_EMPTY" />
				)
			}
			return (
				<div>
					<p className="back-link">
						&lt;&lt; <Translate component="a" content="TABS.VARIANTS.BACK_TO_VARIANTS" href="javascript:history.back()" />
					</p>
					<h3>{selectedVariant.name}</h3>
					<div><b><Translate content="TABS.CORRESPONDENCES.RESPONSIBLE" />:</b> {selectedVariant.contactPerson}, <Translate content="TABS.CORRESPONDENCES.SECTION_FOR" /> {selectedVariant.owningSection}</div>
					<div><b><Translate content="TABS.CORRESPONDENCES.PUBLISHED" />:</b> {selectedVariant.published.join()}</div>
					<p>{selectedVariant.description}</p>
					<div className="button-heading">
						<Translate component="button" content="COMMON.OPEN_HIERARCHY" className="expand-tree" />
						<Translate component="button" content="COMMON.DOWNLOAD_CSV" className="expand-tree" />
					</div>

					<div className="results class-list" id="expandcollapse">
						{this.renderVariantList(selectedVariant.nestedItems)}
					</div>
				</div>
			)
		}

		return (
			<div>
				<Translate component="h3" content="TABS.VARIANTS.VARIANTS" />
				<Translate component="p" content="TABS.VARIANTS.DESCRIPTION" />
				<table className="table-correspondences alternate">
					<thead>
						<tr>
							<Translate component="th" content="TABS.VARIANTS.VARIANT" />
							<Translate component="th" content="TABS.VARIANTS.OWNER" />
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
	selectedVersion: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired
}

Variants.contextTypes = {
	router: PropTypes.object
}

export default Variants
