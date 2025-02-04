import "./Search.scss";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import i18next from "i18next";

const Search = ({ actions, search, ssbSections }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    const ssbSection = params.get("ssbSection") || "";
    const includeCodelists = params.get("includeCodelists") === "true";

    // Update Redux state with current URL parameters
    actions.setSearchObject({ query, ssbSection, includeCodelists });

    // Perform the search if there's a query present
    if (query) {
      actions.searchClassification({ query, ssbSection, includeCodelists });
    }

    // Load sections once on mount
    actions.loadSSBSections();
  }, [actions, location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.query.trim()) {
      // Perform search with current state
      actions.searchClassification(search);
      // Update URL with current search parameters
      navigate(
        `/sok?query=${encodeURIComponent(search.query)}&includeCodelists=${
          search.includeCodelists
        }&ssbSection=${search.ssbSection}`
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    actions.setSearchObject({ ...search, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    actions.setSearchObject({ ...search, [name]: checked });
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  return (
    <>
      <form onSubmit={handleSubmit} className="search-box">
        <div className="flex-container">
          <div className="flex-item search-input-text">
            <label htmlFor="search">
              {i18next.t("SEARCH.SEARCH_KODEVERK")}
            </label>
            <input
              id="search"
              type="text"
              name="query"
              value={search.query || ""}
              onChange={handleChange}
              placeholder={i18next.t("SEARCH.SEARCH")}
            />
          </div>
          <div className="flex-item search-button">
            <button type="submit">{i18next.t("SEARCH.SEARCH")}</button>
          </div>
        </div>
        <div className="flex-container filter">
          <label>{i18next.t("SEARCH.FILTER")}:</label>
          <div>
            <input
              type="checkbox"
              id="includeCodelists"
              name="includeCodelists"
              checked={search.includeCodelists || false}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="includeCodelists">
              {i18next.t("SEARCH.INCLUDE_CODELISTS")}
            </label>
            <i
              className="fa fa-info-circle"
              aria-hidden="true"
              onClick={handleModalOpen}
            ></i>
          </div>
          <div className="search-dropdown-section">
            <label htmlFor="ssbSection">
              {i18next.t("SEARCH.OWNING_SECTION")}
            </label>
            <select
              id="ssbSection"
              name="ssbSection"
              value={search.ssbSection || ""}
              onChange={(e) => {
                const selectedValue = e.target.value;
                // Update the Redux state with the selected dropdown value
                actions.setSearchObject({
                  ...search,
                  ssbSection: selectedValue,
                });
              }}
            >
              <option value="">{i18next.t("SEARCH.ALL_SECTIONS")}</option>
              {ssbSections.map((section) => (
                <option key={section.name} value={section.name}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={handleModalClose}>
              &times;
            </button>
            <h2>{i18next.t("SEARCH.WHAT_IS_CODELIST_HEADER")}</h2>
            <p>{i18next.t("SEARCH.WHAT_IS_CODELIST_BODY")}</p>
          </div>
        </div>
      )}
    </>
  );
};

Search.propTypes = {
  actions: PropTypes.shape({
    setSearchObject: PropTypes.func.isRequired,
    searchClassification: PropTypes.func.isRequired,
    loadSSBSections: PropTypes.func.isRequired,
  }).isRequired,
  search: PropTypes.shape({
    query: PropTypes.string,
    ssbSection: PropTypes.string,
    includeCodelists: PropTypes.bool,
  }).isRequired,
  ssbSections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  items: state.searchResult?.items || [],
  search: state.searchResult?.search || {},
  isFetching: state.searchResult?.isFetching || false,
  ssbSections: Array.isArray(state.ssbSections?.ssbSections)
    ? state.ssbSections.ssbSections
    : [],
});

export default connect(mapStateToProps)(Search);
