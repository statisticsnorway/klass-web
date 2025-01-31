import "./Search.scss";
import PropTypes from "prop-types";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import Modal from "simple-react-modal";
import i18next from "i18next";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const Search = ({ actions, sections, search = {}, modal, location }) => {
  // Destructure with default values to avoid undefined errors
  const { query = "", ssbSection = "", includeCodelists = false } = search;

  const queryRef = useRef(null);
  const ssbSectionRef = useRef(null);
  const includeCodelistsRef = useRef(null);
  const errorRef = useRef(null);

  const [localQuery, setLocalQuery] = useState(query); // Local state for input control

  const navigate = useNavigate();

  useEffect(() => {
    actions.loadSSBSections();
    return () => resetSearch();
  }, [actions]);

  // Reset the search state when component unmounts
  const resetSearch = () => {
    actions.setSearchObject({
      query: "",
      ssbSection: "",
      includeCodelists: false,
    });
  };

  // Handle form submission, only dispatching if the query is valid
  const handleSubmit = useCallback(
    (event) => {
      if (event) event.preventDefault();

      // Only proceed if query is not empty, null, or undefined
      if (_.isEmpty(localQuery)) {
        errorRef.current.style.display = "block";
      } else {
        const searchObj = { query: localQuery, ssbSection, includeCodelists };
        actions.searchClassification(searchObj);

        // Update the URL based on the search
        const path = `/sok?query=${encodeURIComponent(
          searchObj.query
        )}&includeCodelists=${searchObj.includeCodelists}&ssbSection=${
          searchObj.ssbSection
        }`;
        navigate(path); // Programmatic navigation using react-router-dom
      }
    },
    [actions, localQuery, ssbSection, includeCodelists, navigate]
  );

  // Handle input change locally and update Redux store when necessary
  const handleChange = useCallback(
    (e) => {
      setLocalQuery(e.target.value); // Update local query state
      // Optionally, you can update Redux store here too if needed, but keep it controlled to avoid unnecessary dispatches
      // actions.setSearchObject({ ...search, query: e.target.value });
    },
    [actions, search]
  );

  // Handle filter changes (e.g., section change or includeCodelists toggle)
  const filterParams = useCallback(
    (event) => {
      // Trigger only when necessary (e.g., when the user interacts with the filter or selects a section)
      const searchObj = { ssbSection, includeCodelists };

      if (location.pathname.indexOf("sok") > -1) {
        handleSubmit();
      } else {
        actions.loadSubjects(searchObj);
      }
    },
    [handleSubmit, actions, location, ssbSection, includeCodelists]
  );

  // Display modal with information about codelists
  const displayModal = () => {
    const item = {
      title: i18next.t("SEARCH.WHAT_IS_CODELIST_HEADER"),
      body: i18next.t("SEARCH.WHAT_IS_CODELIST_BODY"),
    };
    actions.displayModal(item);
  };

  // Close the modal
  const closeModal = () => {
    actions.hideModal();
  };

  // Render the modal when necessary
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
      value={ssbSection}
      onChange={(e) => {
        actions.setSearchObject({ ...search, ssbSection: e.target.value });
        filterParams();
      }}
    >
      <option value="">{i18next.t("SEARCH.ALL_SECTIONS")}</option>
      {options}
    </select>
  );

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <div className="flex-container">
        <div className="flex-item search-input-text">
          <label htmlFor="search">{i18next.t("SEARCH.SEARCH_KODEVERK")}</label>
          <input
            id="search"
            type="text"
            ref={queryRef}
            value={localQuery} // Bind to local state for better control
            onChange={handleChange} // Handle change in input
            aria-label={i18next.t("SEARCH.SEARCH")}
            placeholder={i18next.t("SEARCH.SEARCH")}
          />
        </div>
        <div className="flex-item search-button">
          <button type="submit">{i18next.t("SEARCH.SEARCH")}</button>
        </div>
      </div>
      <p ref={errorRef} className="error">
        {i18next.t("SEARCH.SEARCH_ERROR")}
      </p>

      <div className="flex-container filter">
        <label>{i18next.t("SEARCH.FILTER")}:</label>
        <div>
          <input
            type="checkbox"
            id="includeCodelists"
            checked={includeCodelists}
            onChange={(e) =>
              actions.setSearchObject({
                ...search,
                includeCodelists: e.target.checked,
              })
            }
          />
          <label htmlFor="includeCodelists">
            {i18next.t("SEARCH.INCLUDE_CODELISTS")}
          </label>
          <i
            className="fa fa-info-circle"
            aria-hidden="true"
            onClick={displayModal}
          ></i>
        </div>
        <div className="search-dropdown-section">
          <label>{i18next.t("SEARCH.OWNING_SECTION")}</label>
          {dropdown}
        </div>
      </div>

      {renderModal()}
    </form>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  search: state.search || {}, // Ensure search is always an object
});

Search.propTypes = {
  actions: PropTypes.object.isRequired,
  sections: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired, // Ensure 'search' is always an object
};

export default connect(mapStateToProps)(Search);
