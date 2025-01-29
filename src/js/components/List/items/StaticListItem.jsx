import PropTypes from "prop-types";
import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router";
import Notes from "../../Notes";
import CodeDate from "../../CodeDate";
import Modal from "simple-react-modal";
import _ from "lodash";
import CodeListItem from "./CodeListItem";
import { connect } from "react-redux"; // <-- Add this import

const StaticListItem = ({
  item,
  type,
  actions,
  modal,
  translations,
  idx,
  displayName,
}) => {
  const [active, setActive] = useState(item.active);

  useEffect(() => {
    setActive(item.active);
  }, [item.active]);

  const closeModal = () => {
    actions.hideModal();
  };

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

  const renderItemList = useCallback(() => {
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
              return (
                <CodeListItem
                  key={type + key}
                  idx={key}
                  item={childItem}
                  displayName={name}
                  type={type}
                  actions={actions}
                  translations={translations}
                  modal={modal}
                />
              );
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
            <StaticListItem
              key={type + key}
              idx={key}
              item={childItem}
              displayName={name}
              type={type}
              actions={actions}
              translations={translations}
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
  }, [item, type, actions, translations, modal]);

  const renderModal = useCallback(() => {
    if (!modal.modalIsOpen || !_.isEqual(modal.item.code, item.code)) {
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
              {translations.validFromText}&nbsp;{item.validFrom} <br />
              {!_.isEmpty(item.validTo)
                ? translations.validToText + " " + item.validTo
                : translations.stillValidText}
            </div>
          </div>
        </Modal>
      );
    }
  }, [modal, item, translations, closeModal]);

  const toggle = (e) => {
    e.preventDefault();
    if (item.numberOfClassifications || item.children) {
      if (type === "code" || type === "variant") {
        actions.toggleCode(item.code, type);
      } else {
        actions.toggleSubject(idx, translations.search);
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
    <span className="screen-reader-only">
      {translations.screenReaderShowHide}
    </span>
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

StaticListItem.propTypes = {
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

export default connect(mapStateToProps)(StaticListItem);
