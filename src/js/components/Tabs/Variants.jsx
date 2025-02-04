import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import List from "../List";
import config from "../../config";
import { translate, TranslateComponent } from "../../lib/languageUtils";

function Variants({ selectedVersion, actions, modal }) {
  const { classId, versionId, tab, itemId } = useParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (itemId) {
      actions.loadVariant(itemId);
    }
  }, [itemId, actions]);

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.searchCode(query.trim(), "variant");
  };

  const resetFilter = (ev) => {
    ev.preventDefault();
    setQuery("");
    actions.searchCode("", "variant");
  };

  // Build a path for a given `variant`
  const getVariantPath = (variant) => {
    const url = variant._links.self.href;
    const variantPath = "/" + url.substring(url.lastIndexOf("/") + 1);
    const versionPath = versionId ? `/versjon/${versionId}` : "";
    return `/klassifikasjoner/${classId}${versionPath}/${tab}${variantPath}`;
  };

  const renderBody = () => {
    const variants = selectedVersion?.version?.classificationVariants;
    if (!variants?.length) {
      return (
        <tr>
          <td colSpan="2">
            <TranslateComponent content="TABS.VARIANTS.VARIANTS_NOT_FOUND" />
          </td>
        </tr>
      );
    }

    return variants.map((variant, key) => (
      <tr key={key}>
        <td>
          <Link to={getVariantPath(variant)}>{variant.name}</Link>
        </td>
        <td>{variant.owningSection}</td>
      </tr>
    ));
  };

  const renderVariantList = (items) => {
    if (_.isEmpty(items)) {
      return (
        <p>
          <i>
            <TranslateComponent content="TABS.VARIANTS.VARIANTS_NOT_FOUND" />
          </i>
        </p>
      );
    }

    return (
      <List
        items={items}
        displayName="code"
        type="variant"
        actions={actions}
        modal={modal}
        translations={{ screenReaderShowHide: translate("COMMON.SHOW_HIDE") }}
      />
    );
  };

  const downloadCodes = () => {
    const language = selectedVersion?.selectedVariant?.language || "";
    const languageArgument = language ? `?language=${language}` : "";
    const csvURL = `${config.API_BASE_URL}/variants/${itemId}.csv${languageArgument}`;

    const tempLink = document.createElement("a");
    document.body.appendChild(tempLink);
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "variant");
    tempLink.click();
  };

  const addValidToIfPresent = (validTo) => {
    if (!validTo) return null;
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
    if (validTo && moment(validTo).isBefore(new Date())) {
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
    if (validFrom && moment(validFrom).isAfter(new Date())) {
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
    return null;
  };

  if (itemId) {
    if (selectedVersion?.isFetchingVariant) {
      return (
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      );
    }

    if (_.isEmpty(selectedVersion?.selectedVariant)) {
      return (
        <TranslateComponent
          component="div"
          content="TABS.VARIANTS.VARIANT_EMPTY"
        />
      );
    }

    const variantData = selectedVersion.selectedVariant;
    const joinedLanguages = variantData.published.map((val, index) => {
      const isLast = index === variantData.published.length - 1;
      const separator = isLast ? "" : ", ";
      return (
        <span key={val}>
          <TranslateComponent content={`LANGUAGE.${val.toUpperCase()}`} />
          {separator}
        </span>
      );
    });

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

        {showWarning(variantData.validFrom, variantData.validTo)}

        <h3>{variantData.name}</h3>

        <p>
          <b>
            <TranslateComponent content="TABS.CORRESPONDENCES.RESPONSIBLE" />:
          </b>{" "}
          {variantData.contactPerson?.name}
          <br />
          <b>
            <TranslateComponent content="TABS.CORRESPONDENCES.PUBLISHED" />:
          </b>{" "}
          {joinedLanguages}
          <br />
          <b>
            <TranslateComponent content="TABS.VALID_FROM" />:
          </b>{" "}
          {moment(variantData.validFrom).format("D MMMM YYYY")}
          <br />
          {addValidToIfPresent(variantData.validTo)}
          {variantData.introduction}
        </p>

        <form onSubmit={handleSubmit} className="search-box">
          <div className="flex-container">
            <div className="flex-item search-input-text">
              <input
                aria-label={translate("TABS.CODES.SEARCH_BY_CODE_OR_NAME")}
                placeholder={translate("TABS.CODES.SEARCH_BY_CODE_OR_NAME")}
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
                type="button"
                content="SEARCH.RESET"
                onClick={resetFilter}
              />
            </div>
          </div>
        </form>

        <div className="button-heading">
          <TranslateComponent
            component="button"
            content="COMMON.DOWNLOAD_CSV"
            onClick={downloadCodes}
          />
        </div>

        <div className="results class-list">
          {renderVariantList(variantData.nestedItems)}
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
            <th>
              <TranslateComponent content="TABS.VARIANTS.VARIANT" />
            </th>
            <th>
              <TranslateComponent content="TABS.VARIANTS.OWNER" />
            </th>
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
}

Variants.propTypes = {
  selectedVersion: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
};

export default Variants;
