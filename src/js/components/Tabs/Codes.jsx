import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import List from "../List";
import config from "../../config";
import { translate, TranslateComponent } from "../../lib/languageUtils";

class Codes extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let dataChanged =
      !_.isEqual(this.props.classification, nextProps.classification) ||
      !_.isEqual(this.props.version, nextProps.version) ||
      !_.isEqual(this.props.modal.modalIsOpen, nextProps.modal.modalIsOpen) ||
      !_.isEqual(this.props.modal.item, nextProps.modal.item);

    let tabChange =
      !_.isEqual(this.props.params.tab, nextProps.params.tab) &&
      _.isEqual(nextProps.params.tab, "endringer");

    return dataChanged || tabChange;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { actions } = this.props;
    const query = ReactDOM.findDOMNode(this.refs.query).value.trim();

    actions.searchCode(query, "code");
  }

  resetFilter(ev) {
    ev.preventDefault();
    const { actions } = this.props;
    ReactDOM.findDOMNode(this.refs.query).value = "";
    actions.searchCode("", "code");
  }

  downloadCodes() {
    const { version } = this.props;
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
  }

  filterText() {
    const { version } = this.props;
    if (!_.isEmpty(version.filterQuery)) {
      return (
        <h3>
          <TranslateComponent content="TABS.CODES.FILTERED_BY" /> "
          {version.filterQuery}"
        </h3>
      );
    }
  }

  renderList() {
    const { version, actions, modal } = this.props;
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
  }

  openHierarchy(ev) {
    const { version, actions } = this.props;
    if (ev.currentTarget.value == "true") {
      ev.target.innerHTML = translate("COMMON.CLOSE_HIERARCHY");
      ev.currentTarget.value = "false";
      actions.toggleAll(true, "code");
    } else {
      ev.target.innerHTML = translate("COMMON.OPEN_HIERARCHY");
      ev.currentTarget.value = "true";
      actions.toggleAll(false, "code");
    }
  }

  handleChange(e) {
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
  }

  renderShortnameBox() {
    const { classification } = this.props;
    if (classification.includeShortName) {
      return (
        <div>
          <input
            type="checkbox"
            id="includeCodelist"
            onChange={(ev) => this.handleChange(ev)}
          />
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
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} className="search-box">
          <div className="flex-container">
            <div className="flex-item search-input-text">
              <TranslateComponent
                component="input"
                aria-label={translate("TABS.CODES.SEARCH_BY_CODE_OR_NAME")}
                attributes={{
                  placeholder: "TABS.CODES.SEARCH_BY_CODE_OR_NAME",
                }}
                type="text"
                ref="query"
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
                onClick={(ev) => this.resetFilter(ev)}
              />
            </div>
          </div>
          {this.renderShortnameBox()}
        </form>
        <div className="button-heading">
          <div className="flex-item">
            <button
              ref="openCloseButton"
              value="true"
              onClick={(ev) => this.openHierarchy(ev)}
            >
              <TranslateComponent content="COMMON.OPEN_HIERARCHY" />
            </button>
          </div>
          <div className="flex-item">
            <TranslateComponent
              component="button"
              content="COMMON.DOWNLOAD_CSV"
              onClick={this.downloadCodes.bind(this)}
            />
          </div>
        </div>
        <div className="results class-list" id="expandcollapse">
          {this.filterText()}
          {this.renderList()}
        </div>
      </div>
    );
  }
}

Codes.propTypes = {
  classification: PropTypes.object.isRequired,
  version: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
};

export default Codes;
