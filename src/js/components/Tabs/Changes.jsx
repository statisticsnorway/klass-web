import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";
import commonUtils from "../../lib/common-utils";
import { TranslateComponent } from "../../lib/languageUtils";

const Changes = ({ classification, selectedVersion, params, actions }) => {
  const [invertedTable, setInvertedTable] = useState(true);

  const invertTable = () => {
    setInvertedTable(!invertedTable);
  };

  const renderChangesBody = () => {
    const changes = selectedVersion.changes;

    if (selectedVersion.isFetching) {
      return (
        <tr>
          <TranslateComponent
            component="td"
            colSpan="2"
            content="LOADING.LOADING_CONTENT"
          />
        </tr>
      );
    }

    if (_.isEmpty(changes.codeChanges)) {
      return (
        <tr>
          <TranslateComponent
            component="td"
            colSpan="2"
            content="TABS.CHANGES.CHANGES_NOT_FOUND"
          />
        </tr>
      );
    }

    let groupedArray;

    switch (invertedTable) {
      case false:
        changes.codeChanges.sort((a, b) => a.oldCode - b.oldCode);

        groupedArray = commonUtils.groupBy(changes.codeChanges, (item) => [
          item.oldCode,
        ]);

        return groupedArray.map((item, key) => {
          const targetList = item
            .sort((a, b) => a.newCode - b.newCode)
            .map((subItem, key) => (
              <li key={key}>
                <b>{subItem.newCode}</b> - {subItem.newName}
              </li>
            ));

          return (
            <tr key={key}>
              <td>
                <b>{item[0].oldCode}</b> - {item[0].oldName}
              </td>
              <td>
                <ul className="grouped-codelist">{targetList}</ul>
              </td>
            </tr>
          );
        });

      case true:
        changes.codeChanges.sort((a, b) => a.newCode - b.newCode);

        groupedArray = commonUtils.groupBy(changes.codeChanges, (item) => [
          item.newCode,
        ]);

        return groupedArray.map((item, key) => {
          const targetList = item
            .sort((a, b) => a.oldCode - b.oldCode)
            .map((subItem, key) => (
              <li key={key}>
                <b>{subItem.oldCode}</b> - {subItem.oldName}
              </li>
            ));

          return (
            <tr key={key}>
              <td>
                <b>{item[0].newCode}</b> - {item[0].newName}
              </td>
              <td>
                <ul className="grouped-codelist">{targetList}</ul>
              </td>
            </tr>
          );
        });
    }

    return null;
  };

  useEffect(() => {
    // Handle changes when props or state update
  }, [selectedVersion, classification]);

  const versionsSorted = classification.versions.sort((a, b) =>
    a.validFrom < b.validFrom ? 1 : -1
  );
  let selectedVersionIndex = versionsSorted.findIndex(
    (obj) => obj.id === selectedVersion.version.id
  );
  let selectedChanges = versionsSorted[selectedVersionIndex];
  let previousVersion = versionsSorted[selectedVersionIndex + 1];

  if (params.versionId) {
    _.forEach(versionsSorted, (v, i) => {
      if (v.id === params.versionId) {
        selectedChanges = v;
        previousVersion = versionsSorted[i + 1];
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
        <TranslateComponent
          component="p"
          content="TABS.CHANGES.CHANGES_NOT_FOUND"
        />
      </div>
    );
  }

  const validFrom = moment(selectedChanges.validFrom).format("MMMM YYYY");
  const validTo = moment(selectedChanges.validTo).isValid()
    ? moment(selectedChanges.validTo).format("MMMM YYYY")
    : "Gjeldende versjon";
  const previousVersionValidFrom =
    previousVersion && moment(previousVersion.validFrom).isValid()
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
  params: PropTypes.object.isRequired,
};

export default Changes;
