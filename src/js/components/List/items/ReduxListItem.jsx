import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import Notes from "../../Notes";
import CodeDate from "../../CodeDate";
import Modal from "simple-react-modal";
import _ from "lodash";
import { TranslateComponent } from "../../../lib/languageUtils";

const StandardListItem = ({
  item,
  displayName,
  type,
  actions,
  modal,
  idx,
  search,
}) => {
  const renderItemList = () => {
    if (item.children && item.children.length > 0) {
      const listEl = item.children.map((childItem, key) => {
        if (childItem._links) {
          return (
            <li key={"item" + key} role="treeitem" tabIndex="-1">
              <Link
                to={`/klassifikasjoner/${childItem.id}`}
                className="child-link"
              >
                <span>{childItem.name}&#160;&#160;»</span>
                <span className="link-type">
                  {childItem.classificationType}
                </span>
              </Link>
            </li>
          );
        } else {
          const toggleIcon = childItem.active
            ? "hovedemne collapse"
            : "hovedemne expand";
          let name;
          switch (type) {
            case "code":
            case "variant":
              name = (
                <span className="itemName">
                  <b>{childItem.code}</b> -{" "}
                  <span className="longName">{childItem.name}</span>
                  <span className="shortName" aria-hidden="true">
                    {childItem.shortName}
                  </span>
                </span>
              );
              break;
            case "classFamilies":
              name = (
                <span>
                  {childItem.name} ({childItem.numberOfClassifications})
                </span>
              );
              break;
            default:
              name = <span>{childItem.name}</span>;
          }
          return (
            <StandardListItem
              key={type + key}
              idx={key}
              item={childItem}
              displayName={name}
              type={type}
              actions={actions}
              modal={modal}
            />
          );
        }
      });

      const hidden = item.active ? "false" : "true";
      return (
        <ol className="delemne-children" role="tree" aria-hidden={hidden}>
          {listEl}
        </ol>
      );
    }
  };

  const closeModal = useCallback(() => {
    actions.hideModal();
  }, [actions]);

  const renderNoteBlocks = (arr) => {
    return arr.map((item, key) => {
      const splitted = item.split(/:(.+)?/);
      if (splitted.length > 1) {
        return (
          <div className="flex-container" key={key}>
            <div className="label">{splitted[0]}:</div>
            <div className="content">{splitted[1]}</div>
          </div>
        );
      } else {
        return (
          <div className="flex-container" key={key}>
            <div className="content">{splitted[0]}</div>
          </div>
        );
      }
    });
  };

  const renderModal = () => {
    if (!modal.modalIsOpen || !_.isEqual(modal.item, item)) {
      return null;
    }

    if (modal.contentType === "notes") {
      let noteBlock = modal.item.notes.split("\n");

      return (
        <Modal
          className="modal-notes"
          closeOnOuterClick={true}
          show={modal.modalIsOpen}
          onClose={closeModal}
        >
          <div className="modal-content">
            <a onClick={closeModal}>
              <i
                className="fa fa-times-circle-o close-button"
                aria-hidden="true"
              />
            </a>
            <h5>
              {modal.item.code} - {modal.item.name}
            </h5>
            {renderNoteBlocks(noteBlock)}
          </div>
        </Modal>
      );
    } else {
      return (
        <Modal
          className="modal-notes"
          closeOnOuterClick={true}
          show={modal.modalIsOpen}
          onClose={closeModal}
        >
          <div className="modal-content">
            <a onClick={closeModal}>
              <i
                className="fa fa-times-circle-o close-button"
                aria-hidden="true"
              />
            </a>
            <div className="content">
              <TranslateComponent content="TABS.VALID_FROM" />
              &nbsp;{item.validFrom} <br />
              {!_.isEmpty(item.validTo)
                ? translate("TABS.VALID_TO") + " " + item.validTo
                : translate("TABS.VERSIONS.STILL_VALID")}
            </div>
          </div>
        </Modal>
      );
    }
  };

  const toggle = (e) => {
    e.preventDefault();

    if (item.numberOfClassifications || item.children) {
      if (type === "code" || type === "variant") {
        actions.toggleCode(item.code, type);
      } else {
        actions.toggleSubject(idx, search);
      }
    }
  };

  const toggleIcon =
    item.children || item.numberOfClassifications
      ? item.active
        ? "hovedemne collapse"
        : "hovedemne expand"
      : "last-item";
  const showHide = (
    <TranslateComponent
      content="COMMON.SHOW_HIDE"
      component="span"
      className="screen-reader-only"
    />
  );

  return (
    <li
      key={"li" + idx}
      className={toggleIcon}
      role="treeitem"
      aria-expanded={item.active === true}
    >
      <a
        className="toggle-children clearfix"
        onClick={toggle}
        role="link"
        href="#"
      >
        {showHide}
        {displayName}
        <CodeDate item={item} actions={actions} />
        <Notes item={item} actions={actions} />
      </a>
      {renderModal()}
      {renderItemList()}
    </li>
  );
};

StandardListItem.propTypes = {
  item: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  displayName: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  type: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  search: PropTypes.object,
};

const mapStateToProps = (state) => ({
  search: state.searchResult?.search || {},
});

export default connect(mapStateToProps)(StandardListItem);
