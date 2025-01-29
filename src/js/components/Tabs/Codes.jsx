import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import List from "../List";
import config from "../../config";
import { translate, TranslateComponent } from "../../lib/languageUtils";

const Codes = ({ classification, version, params, actions, modal }) => {
  const [hierarchyOpen, setHierarchyOpen] = useState(true);
  const queryRef = useRef();

  useEffect(() => {
    // Handle tab change or prop change logic if necessary
  }, [params.tab, version, classification, modal]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = queryRef.current.value.trim();
    actions.searchCode(query, "code");
  };

  const resetFilter = (ev) => {
    ev.preventDefault();
    queryRef.current.value = "";
    actions.searchCode("", "code");
  };

  const downloadCodes = () => {
    let language = version.language;
    let languageArgument = language == null ? "" : "?language=" + language;
    const csvURL =
      config.API_BASE_URL +
      "/versions/" +
      version.id +
      ".csv" +
      languageArgument;

    var tempLink = document.createElement("a");
    document.body.appendChild(tempLink);
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "code");
    tempLink.click();
  };

  const filterText = () => {
    if (!_.isEmpty(version.filterQuery)) {
      return (
        <h3>
          <TranslateComponent content="TABS.CODES.FILTERED_BY" /> "
          {version.filterQuery}"
        </h3>
      );
    }
  };

  const renderList = () => {
    if (_.isEmpty(version.nestedItems)) {
      return (
        <p>
          <i>
            <TranslateComponent content="TABS.CODES.CODES_NOT_FOUND" />
          </i>
        </p>
      );
    }
    const translations = {
      validFromText: translate("TABS.VALID_FROM"),
      validToText: translate("TABS.VALID_TO"),
      stillValidText: translate("TABS.VERSIONS.STILL_VALID"),
      screenReaderShowHide: translate("COMMON.SHOW_HIDE"),
    };

    return (
      <List
        items={version.nestedItems}
        type="code"
        actions={actions}
        modal={modal}
        translations={translations}
      />
    );
  };

  const openHierarchy = () => {
    if (hierarchyOpen) {
      setHierarchyOpen(false);
      actions.toggleAll(true, "code");
    } else {
      setHierarchyOpen(true);
      actions.toggleAll(false, "code");
    }
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      _.forEach(document.getElementsByClassName("itemName"), function (el) {
        el.getElementsByClassName("longName")[0].style.display = "none";
        el.getElementsByClassName("longName")[0].setAttribute(
          "aria-hidden",
          "true"
        );
        el.getElementsByClassName("shortName")[0].style.display = "inline";
        el.getElementsByClassName("shortName")[0].setAttribute(
          "aria-hidden",
          "false"
        );
      });
    } else {
      _.forEach(document.getElementsByClassName("itemName"), function (el) {
        el.getElementsByClassName("longName")[0].style.display = "inline";
        el.getElementsByClassName("longName")[0].setAttribute(
          "aria-hidden",
          "false"
        );
        el.getElementsByClassName("shortName")[0].style.display = "none";
        el.getElementsByClassName("shortName")[0].setAttribute(
          "aria-hidden",
          "true"
        );
      });
    }
  };

  const renderShortnameBox = () => {
    if (classification.includeShortName) {
      return (
        <div>
          <input type="checkbox" id="includeCodelist" onChange={handleChange} />
          <TranslateComponent
            component="label"
            content="TABS.CODES.SHOW_SHORT_TITLES"
            htmlFor="includeCodelist"
          />
        </div>
      );
    } else {
      return "";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-box">
        <div className="flex-container">
          <div className="flex-item search-input-text">
            <TranslateComponent
              component="input"
              aria-label={translate("TABS.CODES.SEARCH_BY_CODE_OR_NAME")}
              attributes={{
                placeholder: "TABS.CODES.SEARCH_BY_CODE_OR_NAME",
              }}
              type="text"
              ref={queryRef}
              name="kodeverk"
            />
          </div>
          <div className="flex-item search-button">
            <TranslateComponent
              component="button"
              type="submit"
              content="SEARCH.FILTER"
            />
          </div>
          <div className="flex-item reset-button">
            <TranslateComponent
              component="button"
              content="SEARCH.RESET"
              onClick={resetFilter}
            />
          </div>
        </div>
        {renderShortnameBox()}
      </form>
      <div className="button-heading">
        <div className="flex-item">
          <button
            value={hierarchyOpen ? "true" : "false"}
            onClick={openHierarchy}
          >
            <TranslateComponent
              content={
                hierarchyOpen
                  ? "COMMON.CLOSE_HIERARCHY"
                  : "COMMON.OPEN_HIERARCHY"
              }
            />
          </button>
        </div>
        <div className="flex-item">
          <TranslateComponent
            component="button"
            content="COMMON.DOWNLOAD_CSV"
            onClick={downloadCodes}
          />
        </div>
      </div>
      <div className="results class-list" id="expandcollapse">
        {filterText()}
        {renderList()}
      </div>
    </div>
  );
};

Codes.propTypes = {
  classification: PropTypes.object.isRequired,
  version: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
};

export default Codes;
