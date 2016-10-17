import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import Translate from "react-translate-component";
import Notes from "../Notes";
import Modal from "simple-react-modal";
import _ from "lodash";

class ListItem extends Component {
	renderItemList() {
		const { item, displayName, type, actions, modal } = this.props;

		if (item.children && item.children.length > 0) {
			const listEl = item.children.map((childItem, key) =>
				{
					if (childItem._links) {
						return (
							<li key={key} role="treeitem" tabIndex="-1">
								<Link to={`/klassifikasjoner/${childItem.id}`} className="child-link">
									<span>{childItem.name}&#160;&#160;»</span>
									<span className="link-type">{childItem.classificationType}</span>
								</Link>
							</li>
						)
					} else {
						const toggleIcon = childItem.active ? 'hovedemne collapse' : 'hovedemne expand';
        				let name
        				switch (type) {
        					case 'code':
        					case 'variant':
        						name = <span className="itemName"><b>{childItem.code}</b> - <span className="longName">{childItem.name}</span><span className="shortName" aria-hidden="true">{childItem.shortName}</span></span>
        						break;
        					case 'classFamilies':
        						name = <span>{childItem.name} ({childItem.numberOfClassifications})</span>
        						break;
        					default:
        						name = <span>{childItem.name}</span>
        				}
						return (
							<ListItem
								key={key}
								idx={key}
								item={childItem}
								displayName={name}
								type={type}
		                        actions={actions}
                                modal={modal} />
						)
					}
				}
			)

            const hidden = item.active ? 'false' : 'true'

            // return (
            //     <Panel collapsible expanded={item.active} role="tree" aria-hidden={hidden}>
            //         {listEl}
            //     </Panel>
            // )

			return (
				<ol className="delemne-children" role="tree" aria-hidden={hidden}>
					{listEl}
				</ol>
			)
		}
	}

	closeModal () {
		const { actions } = this.props
		actions.hideModal()
	}

	renderNoteBlocks (arr) {
		return arr.map(function (item, key) {
			var splitted = item.split(/:(.+)?/)
			if (splitted.length > 1) {
				return (
					<div className="flex-container" key={key}>
						<div className="label">{splitted[0]}:</div>
						<div className="content">{splitted[1]}</div>
					</div>
				)
			}else {
				return (
					<div className="flex-container" key={key}>
						<div className="content">{splitted[0]}</div>
					</div>
				)
			}

		})
	}

    renderModal () {
		const { modal, item } = this.props


		if (!modal.modalIsOpen || (!_.isEqual(modal.item, item))) {
			return null
		}

		let noteBlock = modal.item.notes.split('\n')

		return (
			<Modal
				className='modal-notes'
				closeOnOuterClick={true}
				show={modal.modalIsOpen}
				onClose={this.closeModal.bind(this)}>
					<div className="modal-content">
						<a onClick={this.closeModal.bind(this)}>
							<i className="fa fa-times-circle-o close-button" aria-hidden="true"></i>
						</a>
						<h5>{modal.item.code} - {modal.item.name}</h5>
						{this.renderNoteBlocks(noteBlock)}
					</div>
			</Modal>
		)
    }

	toggle(e) {
		e.preventDefault();
		const { item, idx, actions, type, search } = this.props

		if (item.numberOfClassifications || item.children) {
			if (type == 'code' || type == 'variant') {
				actions.toggleCode(item.code, type)
			} else {
				actions.toggleSubject(idx, search)
			}
		}
	}

	render () {
		const { item, displayName, actions, idx } = this.props
		const toggleIcon = (item.children || item.numberOfClassifications) ? (item.active ? 'hovedemne collapse' : 'hovedemne expand') : 'last-item'
        // const showHide = item.children ? <Translate content="COMMON.SHOW_HIDE" component="span" className="screen-reader-only" /> : ''
        const showHide = <Translate content="COMMON.SHOW_HIDE" component="span" className="screen-reader-only" />
        const toggleLink = (item.children || item.numberOfClassifications) ? 'toggle-children' : ''
        const itemId = item.code ? (item.level + '_' + item.code) : idx

        // return (
        //     <div role="treeitem" aria-expanded={item.active === true} id={itemId}>
		// 		<a className={toggleLink} onClick={(ev) => this.toggle(ev)} href="#">
        //             {showHide}
		// 			{displayName}
        //             <Notes item={item} actions={actions} />
		// 		</a>
        //         {this.renderModal()}
		// 		{this.renderItemList()}
        //     </div>
        // )

		return (
			<li className={toggleIcon} role="treeitem" aria-expanded={item.active === true} >
				<a className="toggle-children" onClick={(ev) => this.toggle(ev)} role="link" href="#">
                    {showHide}
					{displayName}
                    <Notes item={item} actions={actions} />
				</a>
                {this.renderModal()}
				{this.renderItemList()}
			</li>
		)
	}
}


ListItem.propTypes = {
	item: PropTypes.object.isRequired,
	idx: PropTypes.number.isRequired,
	displayName: PropTypes.element.isRequired,
	type: PropTypes.string.isRequired,
	actions: PropTypes.object.isRequired,
	modal: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    search: state.searchResult.search
})

export default connect(mapStateToProps)(ListItem)
