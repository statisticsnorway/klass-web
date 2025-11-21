import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import CodeDate from "../../CodeDate";
import Notes from "../../Notes";
import StaticListItem from "./StaticListItem";

class CodeListItem extends StaticListItem {
	shouldComponentUpdate(nextProps, nextState) {
		const visibleChanged =
			this.props.modal.modalIsOpen !== nextProps.modal.modalIsOpen;
		const modalItemChanged = this.props.modal.item !== nextProps.modal.item;

		const visible = nextProps.modal.modalIsOpen;

		let modalWasThisItem = false;
		if (this.props.modal.item !== null)
			modalWasThisItem = _.isEqual(
				this.props.modal.item.code,
				this.props.item.code,
			);

		let modalIsThisItem = false;
		if (nextProps.modal.item !== null)
			modalIsThisItem = _.isEqual(
				nextProps.modal.item.code,
				nextProps.item.code,
			);

		const modalWasChildOfThisItem = this.searchForChildren(
			this.props.item,
			this.props.modal.item,
		);
		const modalIsChildOfThisItem = this.searchForChildren(
			nextProps.item,
			nextProps.modal.item,
		);

		if (
			(visibleChanged || visible || modalItemChanged) &&
			(modalWasThisItem ||
				modalWasChildOfThisItem ||
				modalIsThisItem ||
				modalIsChildOfThisItem)
		) {
			return true;
		}

		// check if content has changed
		return !(
			_.isEqual(this.props.item, nextProps.item) &&
			_.isEqual(this.props.item.active, nextProps.item.active) &&
			_.isEqual(this.props.idx, nextProps.idx) &&
			_.isEqual(this.props.displayName, nextProps.displayName) &&
			_.isEqual(this.props.type, nextProps.type)
		);
	}

	searchForChildren(itemTree, target) {
		if (target === null) return false;
		if (itemTree.children !== undefined) {
			// Object.keys(itemTree.children).forEach(function (itemId) {
			// _.forEach(itemTree.children, function (item) {
			for (const item of itemTree.children) {
				const match = _.isEqual(target.code, item.code);
				if (match) {
					return true;
				} else {
					const subChildFound = this.searchForChildren(item, target);
					if (subChildFound) {
						return true;
					}
				}
			}
		}
		// window.console.log("search result:" + found)
		return false;
	}
}

CodeListItem.propTypes = {
	item: PropTypes.object.isRequired,
	idx: PropTypes.number.isRequired,
	displayName: PropTypes.element.isRequired,
	type: PropTypes.string.isRequired,
	actions: PropTypes.object.isRequired,
	modal: PropTypes.object.isRequired,
	translations: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
	search: state.searchResult.search,
});

export default CodeListItem;
