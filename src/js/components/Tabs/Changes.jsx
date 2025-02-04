import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import commonUtils from "../../lib/common-utils";
import { TranslateComponent } from "../../lib/languageUtils";

const Changes = ({ classification, selectedVersion, actions }) => {
  const [invertedTable, setInvertedTable] = useState(true);
  const { versionId } = useParams();

  const invertTable = () => {
    setInvertedTable(!invertedTable);
  };

  const renderChangesBody = () => {
    if (selectedVersion.isFetching) {
      return (
        <tr>
          <td colSpan="2">
            <TranslateComponent content="LOADING.LOADING_CONTENT" />
          </td>
        </tr>
      );
    }

    if (_.isEmpty(selectedVersion.changes?.codeChanges)) {
      return (
        <tr>
          <td colSpan="2">
            <TranslateComponent content="TABS.CHANGES.CHANGES_NOT_FOUND" />
          </td>
        </tr>
      );
    }

    let groupedArray;
    const { codeChanges } = selectedVersion.changes;

    if (!invertedTable) {
      codeChanges.sort((a, b) => a.oldCode.localeCompare(b.oldCode));

      groupedArray = commonUtils.groupBy(codeChanges, (item) => [item.oldCode]);

      return groupedArray.map((item, key) => (
        <tr key={key}>
          <td>
            <b>{item[0].oldCode}</b> - {item[0].oldName}
          </td>
          <td>
            <ul className="grouped-codelist">
              {item
                .sort((a, b) => a.newCode.localeCompare(b.newCode))
                .map((subItem, subKey) => (
                  <li key={subKey}>
                    <b>{subItem.newCode}</b> - {subItem.newName}
                  </li>
                ))}
            </ul>
          </td>
        </tr>
      ));
    } else {
      codeChanges.sort((a, b) => a.newCode.localeCompare(b.newCode));

      groupedArray = commonUtils.groupBy(codeChanges, (item) => [item.newCode]);

      return groupedArray.map((item, key) => (
        <tr key={key}>
          <td>
            <b>{item[0].newCode}</b> - {item[0].newName}
          </td>
          <td>
            <ul className="grouped-codelist">
              {item
                .sort((a, b) => a.oldCode.localeCompare(b.oldCode))
                .map((subItem, subKey) => (
                  <li key={subKey}>
                    <b>{subItem.oldCode}</b> - {subItem.oldName}
                  </li>
                ))}
            </ul>
          </td>
        </tr>
      ));
    }
  };

  useEffect(() => {
    if (versionId && actions) {
      actions.loadChanges(classification.id, versionId);
    }
  }, [versionId, actions, classification.id]);

  const versionsSorted = [...classification.versions].sort(
    (a, b) => new Date(b.validFrom) - new Date(a.validFrom)
  );

  let selectedVersionIndex = versionsSorted.findIndex(
    (obj) => obj.id === selectedVersion.version?.id
  );
  let selectedChanges = versionsSorted[selectedVersionIndex] || {};
  let previousVersion = versionsSorted[selectedVersionIndex + 1] || {};

  if (versionId) {
    _.forEach(versionsSorted, (v, i) => {
      if (v.id === versionId) {
        selectedChanges = v;
        previousVersion = versionsSorted[i + 1] || {};
        return false;
      }
    });
  }

  if (_.isEmpty(selectedChanges)) {
    return (
      <div>
        <p className="back-link">
          &lt;&lt;{" "}
          <TranslateComponent
            component="a"
            content="TABS.CHANGES.BACK_TO_CHANGES"
            href="javascript:history.back()"
          />
        </p>
        <TranslateComponent content="TABS.CHANGES.CHANGES_NOT_FOUND" />
      </div>
    );
  }

  const validFrom = moment(selectedChanges.validFrom).format("MMMM YYYY");
  const validTo = moment(selectedChanges.validTo).isValid()
    ? moment(selectedChanges.validTo).format("MMMM YYYY")
    : translate("TABS.CHANGES.CURRENT_VERSION");
  const previousVersionValidFrom = previousVersion.validFrom
    ? moment(previousVersion.validFrom).format("MMMM YYYY")
    : "-";

  return (
    <div>
      <h3>
        <TranslateComponent content="TABS.CHANGES.HEADER" />
      </h3>
      <div className="button-heading">
        <TranslateComponent
          component="button"
          content="COMMON.INVERT_TABLE"
          className="expand-tree"
          onClick={invertTable}
        />
      </div>
      <table className="change-table alternate">
        <thead>
          <tr>
            <th>{invertedTable ? validFrom : previousVersionValidFrom}</th>
            <th>{invertedTable ? previousVersionValidFrom : validFrom}</th>
          </tr>
        </thead>
        <tbody>{renderChangesBody()}</tbody>
      </table>
    </div>
  );
};

Changes.propTypes = {
  classification: PropTypes.object.isRequired,
  selectedVersion: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default Changes;
