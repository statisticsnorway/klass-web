import "./Search.scss";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import Modal from "simple-react-modal";
import _ from "lodash";
import { TranslateComponent, translate } from "../../lib/languageUtils";

const Search = ({ actions, sections, search, modal, location }) => {
  const queryRef = useRef(null);
  const ssbSectionRef = useRef(null);
  const includeCodelistsRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    actions.loadSSBSections();
    return () => resetSearch();
  }, [actions]);

  const resetSearch = () => {
    actions.setSearchObject({});
  };

  const handleSubmit = useCallback(
    (event) => {
      if (event) event.preventDefault();
      const query = queryRef.current.value.trim();

      if (_.isEmpty(query)) {
        errorRef.current.style.display = "block";
      } else {
        const searchObj = {
          query: queryRef.current.value.trim(),
          ssbSection: ssbSectionRef.current.value,
          includeCodelists: includeCodelistsRef.current.checked,
        };

        actions.searchClassification(searchObj);

        const path =
          "/sok?query=" +
          searchObj.query +
          "&includeCodelists=" +
          searchObj.includeCodelists +
          "&ssbSection=" +
          searchObj.ssbSection;
        actions.push(path); // Assumed `this.context.router.push` should be replaced with `actions.push`
      }
    },
    [actions]
  );

  const handleChange = useCallback(() => {
    const searchObj = {
      query: queryRef.current.value,
      ssbSection: ssbSectionRef.current.value,
      includeCodelists: includeCodelistsRef.current.checked,
    };
    actions.setSearchObject(searchObj);
  }, [actions]);

  const filterParams = useCallback(
    (event) => {
      handleChange();
      let searchObj = {
        ssbSection: ssbSectionRef.current.value,
        includeCodelists: includeCodelistsRef.current.checked,
      };

      if (location.pathname.indexOf("sok") > -1) {
        handleSubmit();
      } else {
        actions.loadSubjects(searchObj);
      }
    },
    [handleChange, handleSubmit, actions, location]
  );

  const displayModal = () => {
    const item = {
      title: translate("SEARCH.WHAT_IS_CODELIST_HEADER"),
      body: translate("SEARCH.WHAT_IS_CODELIST_BODY"),
    };

    actions.displayModal(item);
  };

  const closeModal = () => {
    actions.hideModal();
  };

  const renderModal = () => {
    if (modal && !_.isEmpty(modal.item)) {
      return (
        <Modal
          closeOnOuterClick={true}
          style={{ background: "rgba(0, 0, 0, 0.2)" }}
          containerStyle={{ background: "#666666" }}
          show={modal.modalIsOpen}
          onClose={closeModal}
        >
          <div className="modal-content">
            <a onClick={closeModal}>
              <i
                className="fa fa-times-circle-o close-button"
                aria-hidden="true"
              ></i>
            </a>
            <h2>{modal.item.title}</h2>
            <div>
              <p>{modal.item.body}</p>
            </div>
          </div>
        </Modal>
      );
    }
    return null;
  };

  const ssbSections = sections.ssbSections;

  let options;
  if (ssbSections.length) {
    ssbSections.sort((a, b) =>
      a.name === b.name ? 0 : a.name < b.name ? -1 : 1
    );
    options = ssbSections.map((section, key) => (
      <option key={key} value={section.name}>
        {section.name}
      </option>
    ));
  }

  const dropdown = (
    <select
      name="seksjon"
      ref={ssbSectionRef}
      defaultValue={search.ssbSection}
      onChange={filterParams}
    >
      <TranslateComponent
        component="option"
        value=""
        content="SEARCH.ALL_SECTIONS"
      />
      {options}
    </select>
  );

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <div className="flex-container">
        <div className="flex-item search-input-text">
          <TranslateComponent
            component="label"
            content="SEARCH.SEARCH_KODEVERK"
          />
          <TranslateComponent
            component="input"
            type="text"
            ref={queryRef}
            defaultValue={search.query}
            onChange={handleChange}
            aria-label={translate("SEARCH.SEARCH")}
            attributes={{ placeholder: "SEARCH.SEARCH" }}
          />
        </div>
        <div className="flex-item search-button">
          <TranslateComponent
            component="button"
            type="submit"
            content="SEARCH.SEARCH"
          />
        </div>
      </div>
      <TranslateComponent
        component="p"
        content="SEARCH.SEARCH_ERROR"
        ref={errorRef}
        className="error"
      />
      <div className="flex-container filter">
        <label>
          <TranslateComponent content="SEARCH.FILTER" />:
        </label>
        <div>
          <input
            type="checkbox"
            id="includeCodelists"
            ref={includeCodelistsRef}
            onChange={filterParams}
            defaultChecked={search.includeCodelists === true}
          />
          <TranslateComponent
            component="label"
            htmlFor="includeCodelists"
            content="SEARCH.INCLUDE_CODELISTS"
          />
          <i
            className="fa fa-info-circle"
            aria-hidden="true"
            onClick={displayModal}
          ></i>
        </div>
        <div className="search-dropdown-section">
          <TranslateComponent
            component="label"
            content="SEARCH.OWNING_SECTION"
          />
          {dropdown}
        </div>
      </div>
      {renderModal()}
    </form>
  );
};

Search.propTypes = {
  actions: PropTypes.object.isRequired,
  sections: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps)(Search);
