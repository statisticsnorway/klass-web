import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import _ from "lodash";
import List from "../List";
import config from "../../config";
import moment from "moment";
import { translate, TranslateComponent } from "../../lib/languageUtils";

const Variants = ({ selectedVersion, actions, modal, params }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (params.itemId) {
      actions.loadVariant(params.itemId);
    }
  }, [params.itemId, actions]);

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.searchCode(query.trim(), "variant");
  };

  const resetFilter = (ev) => {
    ev.preventDefault();
    setQuery("");
    actions.searchCode("", "variant");
  };

  const renderBody = () => {
    const { selectedVersion } = props;
    const version = selectedVersion.version;

    if (version.classificationVariants.length < 1) {
      return (
        <tr>
          <TranslateComponent
            component="td"
            content="TABS.VARIANTS.VARIANTS_NOT_FOUND"
            colSpan="2"
          />
        </tr>
      );
    }

    const getVariantPath = (params, variant) => {
      const url = variant._links.self.href;
      const variantPath =
        "/" + url.substring(url.lastIndexOf("/") + 1, url.length);

      const classPath = "/" + params.classId;
      const versionPath = params.versionId
        ? "/versjon/" + params.versionId
        : "";
      const tabPath = "/" + params.tab;

      const path =
        "/klassifikasjoner" + classPath + versionPath + tabPath + variantPath;
      return path;
    };

    return version.classificationVariants.map((variant, key) => (
      <tr key={key}>
        <td>
          <Link to={`${getVariantPath(params, variant)}`}>{variant.name}</Link>
        </td>
        <td>{variant.owningSection}</td>
      </tr>
    ));
  };

  const renderVariantList = (items) => {
    if (_.isEmpty(items)) {
      return (
        <p>
          <TranslateComponent
            component="i"
            content="TABS.VARIANTS.VARIANTS_NOT_FOUND"
          />
        </p>
      );
    }

    const translations = {
      screenReaderShowHide: translate("COMMON.SHOW_HIDE"),
    };
    return (
      <List
        items={items}
        displayName="code"
        type="variant"
        actions={actions}
        modal={modal}
        translations={translations}
      />
    );
  };

  const openHierarchy = (ev) => {
    const { actions } = props;
    if (ev.currentTarget.value == "true") {
      ev.target.innerHTML = translate("COMMON.CLOSE_HIERARCHY");
      ev.currentTarget.value = "false";
      actions.toggleAll(true, "variant");
    } else {
      ev.target.innerHTML = translate("COMMON.OPEN_HIERARCHY");
      ev.currentTarget.value = "true";
      actions.toggleAll(false, "variant");
    }
  };

  const downloadCodes = () => {
    const { params, selectedVersion } = props;
    let language = selectedVersion.selectedVariant.language;
    let languageArgument = language == null ? "" : "?language=" + language;
    const csvURL =
      config.API_BASE_URL +
      "/variants/" +
      params.itemId +
      ".csv" +
      languageArgument;

    var tempLink = document.createElement("a");
    document.body.appendChild(tempLink);
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "variant");
    tempLink.click();
  };

  const addValidToIfPresent = (validTo) => {
    if (validTo != null)
      return (
        <div>
          <b>
            <TranslateComponent content="TABS.VALID_TO" />:
          </b>
          {moment(validTo).format("MMMM YYYY")}
          <br />
        </div>
      );
  };

  const showWarning = (validFrom, validTo) => {
    if (validTo != null && moment(validTo).isBefore(new Date())) {
      return (
        <div className="version-info">
          <TranslateComponent
            component="p"
            content="TABS.VARIANT_NO_LONGER_VALID"
            className="red-box"
          />
        </div>
      );
    }

    if (validFrom != null && moment(validFrom).isAfter(new Date())) {
      return (
        <div className="version-info">
          <TranslateComponent
            component="p"
            content="TABS.VARIANT_NOT_YET_VALID"
            className="green-box"
          />
        </div>
      );
    }
  };

  if (params.itemId) {
    if (selectedVersion.isFetchingVariant) {
      return (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      );
    }
    if (_.isEmpty(selectedVersion.selectedVariant)) {
      return (
        <TranslateComponent
          component="div"
          content="TABS.VARIANTS.VARIANT_EMPTY"
        />
      );
    }

    let joinedLanguages = selectedVersion.selectedVariant.published.map(
      function (val) {
        let comma =
          val ==
          selectedVersion.selectedVariant.published[
            selectedVersion.selectedVariant.published.length - 1
          ]
            ? ""
            : ",";
        if (val == "nb")
          return (
            <span>
              <TranslateComponent content="LANGUAGE.NORWEGIAN" />
              {comma}{" "}
            </span>
          );
        if (val == "nn")
          return (
            <span>
              <TranslateComponent content="LANGUAGE.NYNORSK" />
              {comma}{" "}
            </span>
          );
        if (val == "en")
          return (
            <span>
              <TranslateComponent content="LANGUAGE.ENGLISH" />
              {comma}{" "}
            </span>
          );
      }
    );
    return (
      <div>
        <p className="back-link">
          &lt;&lt;{" "}
          <TranslateComponent
            component="a"
            content="TABS.VARIANTS.BACK_TO_VARIANTS"
            href="javascript:history.back()"
          />
        </p>
        {showWarning(
          selectedVersion.selectedVariant.validFrom,
          selectedVersion.selectedVariant.validTo
        )}
        <h3>{selectedVersion.selectedVariant.name}</h3>
        <p>
          <b>
            <TranslateComponent content="TABS.CORRESPONDENCES.RESPONSIBLE" />:
          </b>{" "}
          {selectedVersion.selectedVariant.contactPerson.name}
          <br />
          <b>
            <TranslateComponent content="TABS.CORRESPONDENCES.PUBLISHED" />:
          </b>{" "}
          {joinedLanguages}
          <br />
          <b>
            <TranslateComponent content="TABS.VALID_FROM" />:
          </b>{" "}
          {moment(selectedVersion.selectedVariant.validFrom).format(
            "D MMMM YYYY"
          )}
          <br />
          {addValidToIfPresent(selectedVersion.selectedVariant.validTo)}
          {selectedVersion.selectedVariant.introduction}
        </p>
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
        </form>
        <div className="button-heading">
          <button className="expand-tree" value="true" onClick={openHierarchy}>
            <TranslateComponent content="COMMON.OPEN_HIERARCHY" />
          </button>
          <TranslateComponent
            component="button"
            content="COMMON.DOWNLOAD_CSV"
            className="expand-tree"
            onClick={downloadCodes}
          />
        </div>

        <div className="results class-list" id="expandcollapse">
          {renderVariantList(selectedVersion.selectedVariant.nestedItems)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <TranslateComponent component="h3" content="TABS.VARIANTS.VARIANTS" />
      <TranslateComponent component="p" content="TABS.VARIANTS.DESCRIPTION" />
      <table className="table-correspondences alternate">
        <thead>
          <tr>
            <TranslateComponent
              component="th"
              content="TABS.VARIANTS.VARIANT"
            />
            <TranslateComponent component="th" content="TABS.VARIANTS.OWNER" />
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};

Variants.propTypes = {
  selectedVersion: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default Variants;
