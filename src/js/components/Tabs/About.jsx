import PropTypes from "prop-types";
import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { translate, TranslateComponent } from "../../lib/languageUtils";

class About extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props.version, nextProps.version);
  }

  renderLevels(levels) {
    return levels.map(function (level, key) {
      return (
        <tr key={key}>
          <td className="align-right">{level.levelNumber}</td>
          <td>{level.levelName}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    });
  }

  renderChangeLog() {
    const { version } = this.props;

    if (_.isEmpty(version.changelogs)) {
      return (
        <tr>
          <td colSpan="3">Ingen endringer</td>
        </tr>
      );
    }

    return this.changeLogBody(version.changelogs);
  }

  changeLogBody(items) {
    return items.map(function (change, key) {
      return (
        <tr key={key}>
          <td>{moment(change.changeOccured).format("DD.MMMM YYYY")}</td>
          <td>{moment(change.changeOccured).format("H:m:s")}</td>
          <td>{change.description}</td>
        </tr>
      );
    });
  }

  addValidToIfPresent(validTo) {
    if (validTo != null)
      return (
        <tr>
          <td className="label">
            <TranslateComponent content="TABS.VALID_TO" />:
          </td>
          <td>{moment(validTo).format("MMMM YYYY")}</td>
        </tr>
      );
  }

  render() {
    const { version, actions } = this.props;

    let publications;
    if (version.publications) {
      publications = <a href={version.publications}>{version.publications}</a>;
    } else {
      publications = translate("TABS.ABOUT.NOT_RELEVANT");
    }
    let joinedLanguages = version.published.map(function (val) {
      let comma =
        val === version.published[version.published.length - 1] ? "" : ",";
      if (val === "nb")
        return (
          <span key="nb">
            <TranslateComponent content="LANGUAGE.NORWEGIAN" />
            {comma}{" "}
          </span>
        );
      if (val === "nn")
        return (
          <span key="nn">
            <TranslateComponent content="LANGUAGE.NYNORSK" />
            {comma}{" "}
          </span>
        );
      if (val === "en")
        return (
          <span key="en">
            <TranslateComponent content="LANGUAGE.ENGLISH" />
            {comma}{" "}
          </span>
        );
    });

    return (
      <div>
        <h3>
          <TranslateComponent content="TABS.ABOUT.ABOUT_PREFIX" />{" "}
          {version.name}
        </h3>
        <table className="about-table">
          <tbody>
            <tr>
              <td className="label">
                <TranslateComponent content="TABS.ABOUT.DESCRIPTION" />:
              </td>
              <td>{version.introduction}</td>
            </tr>
            <tr>
              <td className="label">
                <TranslateComponent content="TABS.ABOUT.OWNER" />:
              </td>
              <td>
                {version.contactPerson.name},{" "}
                <TranslateComponent content="TABS.ABOUT.SECTION_FOR" />{" "}
                {_.lowerFirst(version.owningSection)}
              </td>
            </tr>
            <tr>
              <td className="label">
                <TranslateComponent content="TABS.VALID_FROM" />:
              </td>
              <td>{moment(version.validFrom).format("MMMM YYYY")}</td>
            </tr>
            {this.addValidToIfPresent(version.validTo)}
            <tr>
              <td className="label">
                <TranslateComponent content="TABS.ABOUT.PUBLISHED" />:
              </td>
              <td>{joinedLanguages}</td>
            </tr>
            <tr>
              <td className="label">
                <TranslateComponent content="TABS.ABOUT.DERIVEDFROM" />:
              </td>
              <td>
                {version.derivedFrom
                  ? version.derivedFrom
                  : translate("TABS.ABOUT.NOT_RELEVANT")}
              </td>
            </tr>
            <tr>
              <td className="label">
                <TranslateComponent content="TABS.ABOUT.LEGALBASE" />:
              </td>
              <td>
                {version.legalBase
                  ? version.legalBase
                  : translate("TABS.ABOUT.NOT_RELEVANT")}
              </td>
            </tr>
            <tr>
              <td className="label">
                <TranslateComponent content="TABS.ABOUT.PUBLICATIONS" />:
              </td>
              <td>{publications}</td>
            </tr>
            <tr>
              <td className="label">
                <TranslateComponent content="TABS.ABOUT.LEVELS" />:
              </td>
              <td>
                <table className="levels-table alternate">
                  <thead>
                    <tr>
                      <TranslateComponent
                        component="th"
                        content="TABS.ABOUT.NUMBER"
                        className="align-right"
                      />
                      <TranslateComponent
                        component="th"
                        content="COMMON.NAME"
                      />
                      <TranslateComponent
                        component="th"
                        content="TABS.ABOUT.DESCRIPTION"
                      />
                      <TranslateComponent
                        component="th"
                        content="TABS.ABOUT.STRUCTURE"
                      />
                      <TranslateComponent
                        component="th"
                        content="TABS.ABOUT.NUMBER_OF_UNITS"
                      />
                    </tr>
                  </thead>
                  <tbody>{this.renderLevels(version.levels)}</tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td className="label">
                <TranslateComponent content="TABS.ABOUT.CHANGELOG" />:
              </td>
              <td>
                <table className="levels-table alternate">
                  <thead>
                    <tr>
                      <TranslateComponent
                        component="th"
                        content="COMMON.DATE"
                      />
                      <TranslateComponent
                        component="th"
                        content="COMMON.TIME"
                      />
                      <TranslateComponent
                        component="th"
                        content="COMMON.COMMENTS"
                      />
                    </tr>
                  </thead>
                  <tbody>{this.renderChangeLog()}</tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

About.propTypes = {
  actions: PropTypes.object.isRequired,
  version: PropTypes.object.isRequired,
};

export default About;
