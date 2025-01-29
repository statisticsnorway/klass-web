import PropTypes from "prop-types";
import React, { useCallback } from "react";
import _ from "lodash";
import StaticListItem from "./StaticListItem"; // Make sure this import is correct

const CodeListItem = ({
  item,
  idx,
  displayName,
  type,
  actions,
  modal,
  translations,
}) => {
  const shouldComponentUpdate = useCallback(
    (nextProps) => {
      // Ensure that the shouldComponentUpdate logic is correct
      let visibleChanged = modal.modalIsOpen !== nextProps.modal.modalIsOpen;
      let modalItemChanged = modal.item !== nextProps.modal.item;

      let visible = nextProps.modal.modalIsOpen;

      let modalWasThisItem = false;
      if (modal.item !== null)
        modalWasThisItem = _.isEqual(modal.item.code, item.code);

      let modalIsThisItem = false;
      if (nextProps.modal.item !== null)
        modalIsThisItem = _.isEqual(
          nextProps.modal.item.code,
          nextProps.item.code
        );

      let modalWasChildOfThisItem = searchForChildren(item, modal.item);
      let modalIsChildOfThisItem = searchForChildren(
        nextProps.item,
        nextProps.modal.item
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

      return !(
        _.isEqual(item, nextProps.item) &&
        _.isEqual(item.active, nextProps.item.active) &&
        _.isEqual(idx, nextProps.idx) &&
        _.isEqual(displayName, nextProps.displayName) &&
        _.isEqual(type, nextProps.type)
      );
    },
    [modal, item, idx, displayName, type]
  );

  const searchForChildren = (itemTree, target) => {
    if (target === null) return false;
    if (itemTree.children !== undefined) {
      for (let child of itemTree.children) {
        let match = _.isEqual(target.code, child.code);
        if (match) return true;
        let subChildFound = searchForChildren(child, target);
        if (subChildFound) return true;
      }
    }
    return false;
  };

  // Returning JSX using React.createElement for more explicit syntax
  return React.createElement(StaticListItem, {
    item: item,
    idx: idx,
    displayName: displayName,
    type: type,
    actions: actions,
    modal: modal,
    translations: translations,
  });
};

CodeListItem.propTypes = {
  item: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  displayName: PropTypes.element.isRequired,
  type: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  translations: PropTypes.object,
};

const mapStateToProps = (state) => ({
  search: state.searchResult.search,
});

export default CodeListItem;
