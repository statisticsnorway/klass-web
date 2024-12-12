import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router";
import moment from "moment";
import _ from "lodash";
import { TranslateComponent } from "../../lib/languageUtils";

class Versions extends Component {
  renderTableBody() {
    const { classification } = this.props;
    const url = classification._links.self.href;
    const classificationId = url.substring(
      url.lastIndexOf("/") + 1,
      url.length
    );
    const versions = classification.versions;

    return _.orderBy(versions, ["validFrom"], ["desc"]).map(function (
      version,
      key
    ) {
      return (
        <tr key={key}>
          <td>{moment(version.validFrom).format("MMMM YYYY")}</td>
          <td>{ValidToText(version.validFrom, version.validTo)}</td>
          <td>
            <Link
              to={`/klassifikasjoner/${classificationId}/versjon/${version.id}`}
            >
              {version.name}
            </Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { classification } = this.props;

    return (
      <div>
        <h3>
          <TranslateComponent content="TABS.VERSIONS.OTHER_VERSIONS_OF" />{" "}
          {classification.name}
        </h3>
        <table className="versions-table alternate">
          <thead>
            <tr>
              <TranslateComponent component="th" content="TABS.VALID_FROM" />
              <TranslateComponent component="th" content="TABS.VALID_TO" />
              <TranslateComponent component="th" content="COMMON.NAME" />
            </tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
        </table>
      </div>
    );
  }
}

function ValidToText(validFrom, validTo) {
  let versionState = getVersionState(validFrom, validTo);

  switch (versionState) {
    case "future":
      return <TranslateComponent content="TABS.VERSIONS.VERSION_FUTURE" />;
    case "current":
      return <TranslateComponent content="TABS.VERSIONS.STILL_VALID" />;
    case "expired":
      return moment(validTo).format("MMMM YYYY");
  }
}

function getVersionState(validFrom, validTo) {
  let versionState = null;

  if (validTo == null) {
    if (moment(validFrom).isAfter(new Date())) {
      versionState = "future";
    } else {
      versionState = "current";
    }
  } else {
    if (moment(validFrom).isAfter(new Date())) {
      versionState = "future";
    } else {
      if (moment(validTo).isBefore(new Date())) {
        versionState = "expired";
      } else {
        versionState = "current";
      }
    }
  }

  return versionState;
}

Versions.propTypes = {
  classification: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default Versions;
