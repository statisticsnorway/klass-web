import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import config from "../../config";
import { translate, TranslateComponent } from "../../lib/languageUtils";

function groupBy(array, f) {
  var groups = {};
  array.forEach(function (o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    return groups[group];
  });
}

const Correspondences = ({ actions, params, selectedVersion }) => {
  const [invertedTable, setInvertedTable] = useState(true);
  const queryRef = useRef();

  useEffect(() => {
    if (params.itemId) {
      actions.loadCorrespondence(params.itemId);
    }
  }, [params.itemId, actions]);

  useEffect(() => {
    if (
      params.itemId &&
      params.itemId !== selectedVersion.selectedCorrespondence.id
    ) {
      actions.loadCorrespondence(params.itemId);
    }
  }, [params.itemId, actions, selectedVersion.selectedCorrespondence]);

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

  const handleClick = (event, correspondence) => {
    const { params } = event.target;
    const url = correspondence._links.self.href;
    const corrPath = "/" + url.substring(url.lastIndexOf("/") + 1, url.length);
    const classPath = "/" + params.classId;
    const versionPath = params.versionId ? "/versjon/" + params.versionId : "";
    const tabPath = "/" + params.tab;

    const path =
      "/klassifikasjoner" + classPath + versionPath + tabPath + corrPath;
    this.context.router.push(path);
  };

  const renderBody = () => {
    const { selectedVersion } = selectedVersion;
    const version = selectedVersion.version;

    if (
      version.correspondenceTables.length < 1 ||
      (version.correspondenceTables.length === 1 &&
        version.correspondenceTables[0].changeTable)
    ) {
      return (
        <tr>
          <TranslateComponent
            component="td"
            content="TABS.CORRESPONDENCES.CORRESPONDENCE_NOT_FOUND"
            colSpan="3"
          />
        </tr>
      );
    }

    return version.correspondenceTables.map((correspondence, key) => {
      if (!correspondence.changeTable) {
        return (
          <tr
            key={key}
            className="clickable"
            onClick={(ev) => handleClick(ev, correspondence)}
          >
            <td>{correspondence.source}</td>
            <td>
              {correspondence.sourceLevel == undefined
                ? translate("TABS.CORRESPONDENCES.CORRESPONDENCES_LEVELS_ALL")
                : correspondence.sourceLevel.levelName}
            </td>
            <td>{correspondence.target}</td>
            <td>
              {correspondence.targetLevel == undefined
                ? translate("TABS.CORRESPONDENCES.CORRESPONDENCES_LEVELS_ALL")
                : correspondence.targetLevel.levelName}
            </td>
            <td>{correspondence.owningSection}</td>
          </tr>
        );
      }
    });
  };

  const renderCorrTableBody = (corrArr) => {
    let groupedArray;

    switch (invertedTable) {
      case false:
        corrArr.sort((a, b) => {
          if (a.targetCode.toLowerCase() > b.targetCode.toLowerCase()) {
            return 1;
          }
          if (a.targetCode.toLowerCase() < b.targetCode.toLowerCase()) {
            return -1;
          }
          return 0;
        });

        groupedArray = groupBy(corrArr, function (item) {
          return [item.targetCode];
        });

        return groupedArray.map((item, key) => {
          let targetList = item
            .sort((a, b) => {
              return a.sourceCode - b.sourceCode;
            })
            .map((subItem, key) => {
              return (
                <li key={key}>
                  <b>{subItem.sourceCode}</b> - {subItem.sourceName}
                </li>
              );
            });

          return (
            <tr key={key}>
              <td>
                <b>{item[0].targetCode}</b> - {item[0].targetName}
              </td>
              <td>
                <ul className="corr-targetlist">{targetList}</ul>
              </td>
            </tr>
          );
        });
      case true:
        corrArr.sort((a, b) => {
          if (a.sourceCode.toLowerCase() > b.sourceCode.toLowerCase()) {
            return 1;
          }
          if (a.sourceCode.toLowerCase() < b.sourceCode.toLowerCase()) {
            return -1;
          }
          return 0;
        });

        groupedArray = groupBy(corrArr, function (item) {
          return [item.sourceCode];
        });

        return groupedArray.map((item, key) => {
          let targetList = item
            .sort((a, b) => {
              return a.targetCode - b.targetCode;
            })
            .map((subItem, key) => {
              return (
                <li key={key}>
                  <b>{subItem.targetCode}</b> - {subItem.targetName}
                </li>
              );
            });

          return (
            <tr key={key}>
              <td>
                <b>{item[0].sourceCode}</b> - {item[0].sourceName}
              </td>
              <td>
                <ul className="corr-targetlist">{targetList}</ul>
              </td>
            </tr>
          );
        });
    }
  };

  const downloadCodes = () => {
    const { params, selectedVersion } = params;
    let language = selectedVersion.selectedCorrespondence.language;
    let languageArgument = language == null ? "" : "?language=" + language;
    const csvURL =
      config.API_BASE_URL +
      "/correspondencetables/" +
      params.itemId +
      ".csv" +
      languageArgument;

    var tempLink = document.createElement("a");
    document.body.appendChild(tempLink);
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "correspondencetable");
    tempLink.click();
  };

  if (params.itemId) {
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
        <TranslateComponent
          component="div"
          content="TABS.CORRESPONDENCES.CORRESPONDENCE_TABLE_NOT_FOUND"
        />
      );
    }
    let joinedLanguages = selectedVersion.selectedCorrespondence.published.map(
      function (val) {
        let comma =
          val ===
          selectedVersion.selectedCorrespondence.published[
            selectedVersion.selectedCorrespondence.published.length - 1
          ]
            ? ""
            : ",";
        if (val === "nb")
          return (
            <span>
              <TranslateComponent content="LANGUAGE.NORWEGIAN" />
              {comma}{" "}
            </span>
          );
        if (val === "nn")
          return (
            <span>
              <TranslateComponent content="LANGUAGE.NYNORSK" />
              {comma}{" "}
            </span>
          );
        if (val === "en")
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <TranslateComponent content="TABS.CORRESPONDENCES.CODE" />
              </th>
              <th>
                <TranslateComponent content="TABS.CORRESPONDENCES.LINKED_CODES" />
              </th>
            </tr>
          </thead>
          <tbody>
            {renderCorrTableBody(selectedVersion.selectedCorrespondence.codes)}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <p>No correspondence found.</p>;
  }
};

Correspondences.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  selectedVersion: PropTypes.object.isRequired,
};

export default Correspondences;
