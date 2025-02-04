import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import config from "../../config";
import { translate, TranslateComponent } from "../../lib/languageUtils";

const Correspondences = ({ actions, selectedVersion }) => {
  const [invertedTable, setInvertedTable] = useState(true);
  const queryRef = useRef();
  const { classId, versionId, tab, itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (itemId) {
      actions.loadCorrespondence(itemId);
    }
  }, [itemId, actions]);

  useEffect(() => {
    if (
      itemId &&
      selectedVersion.selectedCorrespondence &&
      itemId !== selectedVersion.selectedCorrespondence.id
    ) {
      actions.loadCorrespondence(itemId);
    }
  }, [itemId, actions, selectedVersion.selectedCorrespondence]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = queryRef.current.value.trim();
    actions.searchCode(query, "correspondences");
  };

  const resetFilter = (ev) => {
    ev.preventDefault();
    queryRef.current.value = "";
    actions.searchCode("", "correspondences");
  };

  const invertTable = () => {
    setInvertedTable(!invertedTable);
  };

  const handleClick = (correspondence) => {
    const url = correspondence._links.self.href;
    const corrPath = `/${url.substring(url.lastIndexOf("/") + 1)}`;
    const versionPath = versionId ? `/versjon/${versionId}` : "";
    navigate(`/klassifikasjoner/${classId}${versionPath}/${tab}${corrPath}`);
  };

  const renderBody = () => {
    const version = selectedVersion.version;
    if (
      !version?.correspondenceTables ||
      version.correspondenceTables.length < 1 ||
      (version.correspondenceTables.length === 1 &&
        version.correspondenceTables[0].changeTable)
    ) {
      return (
        <tr>
          <td colSpan="5">
            <TranslateComponent content="TABS.CORRESPONDENCES.CORRESPONDENCE_NOT_FOUND" />
          </td>
        </tr>
      );
    }

    return version.correspondenceTables.map((correspondence, key) =>
      !correspondence.changeTable ? (
        <tr
          key={key}
          className="clickable"
          onClick={() => handleClick(correspondence)}
        >
          <td>{correspondence.source}</td>
          <td>
            {correspondence.sourceLevel
              ? correspondence.sourceLevel.levelName
              : translate("TABS.CORRESPONDENCES.CORRESPONDENCES_LEVELS_ALL")}
          </td>
          <td>{correspondence.target}</td>
          <td>
            {correspondence.targetLevel
              ? correspondence.targetLevel.levelName
              : translate("TABS.CORRESPONDENCES.CORRESPONDENCES_LEVELS_ALL")}
          </td>
          <td>{correspondence.owningSection}</td>
        </tr>
      ) : null
    );
  };

  const downloadCodes = () => {
    const language = selectedVersion.selectedCorrespondence?.language || "";
    const languageArgument = language ? `?language=${language}` : "";
    const csvURL = `${config.API_BASE_URL}/correspondencetables/${itemId}.csv${languageArgument}`;

    const tempLink = document.createElement("a");
    document.body.appendChild(tempLink);
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "correspondencetable");
    tempLink.click();
  };

  if (itemId) {
    if (selectedVersion.isFetchingCorrespondence) {
      return (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      );
    }
    if (_.isEmpty(selectedVersion.selectedCorrespondence)) {
      return (
        <TranslateComponent content="TABS.CORRESPONDENCES.CORRESPONDENCE_TABLE_NOT_FOUND" />
      );
    }

    const joinedLanguages =
      selectedVersion.selectedCorrespondence.published.map((val, idx, arr) => {
        const comma = idx === arr.length - 1 ? "" : ", ";
        return (
          <span key={val}>
            <TranslateComponent content={`LANGUAGE.${val.toUpperCase()}`} />
            {comma}
          </span>
        );
      });

    return (
      <div>
        <p className="back-link">
          &lt;&lt;
          <TranslateComponent
            component="a"
            content="TABS.CORRESPONDENCES.BACK_TO_CORRESPONDENCES"
            href="javascript:history.back()"
          />
        </p>
        <h3>{selectedVersion.selectedCorrespondence.name}</h3>
        <p>
          <b>
            <TranslateComponent content="TABS.CORRESPONDENCES.RESPONSIBLE" />:
          </b>{" "}
          {selectedVersion.selectedCorrespondence.contactPerson.name},{" "}
          <TranslateComponent content="TABS.CORRESPONDENCES.SECTION_FOR" />{" "}
          {selectedVersion.selectedCorrespondence.owningSection}
          <br />
          <b>
            <TranslateComponent content="TABS.CORRESPONDENCES.PUBLISHED" />:
          </b>{" "}
          {joinedLanguages}
          <br />
          {selectedVersion.selectedCorrespondence.description}
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
                type="button"
                content="SEARCH.RESET"
                onClick={resetFilter}
              />
            </div>
          </div>
        </form>
        <button onClick={invertTable} className="corr-toggle">
          <TranslateComponent content="TABS.CORRESPONDENCES.SWITCH_TABLE" />
        </button>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>
                <TranslateComponent content="TABS.CORRESPONDENCES.SOURCE" />
              </th>
              <th>
                <TranslateComponent content="TABS.CORRESPONDENCES.LEVEL" />
              </th>
              <th>
                <TranslateComponent content="TABS.CORRESPONDENCES.TARGET" />
              </th>
              <th>
                <TranslateComponent content="TABS.CORRESPONDENCES.LEVEL" />
              </th>
              <th>
                <TranslateComponent content="TABS.CORRESPONDENCES.OWNING_SECTION" />
              </th>
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
        <h4>
          <TranslateComponent content="TABS.CORRESPONDENCES.CORRESPONDENCES" />
        </h4>
        <button onClick={downloadCodes} className="download-button">
          <TranslateComponent content="TABS.CORRESPONDENCES.DOWNLOAD" />
        </button>
      </div>
    );
  } else {
    return <p>No correspondence found.</p>;
  }
};

Correspondences.propTypes = {
  actions: PropTypes.object.isRequired,
  selectedVersion: PropTypes.object.isRequired,
};

export default Correspondences;
