import "./Search.scss";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Modal from "simple-react-modal";
import _ from "lodash";
import { TranslateComponent, translate } from "../../lib/languageUtils";

class Search extends Component {
  UNSAFE_componentWillMount() {
    const { actions } = this.props;
    actions.loadSSBSections();
  }

  componentWillUnmount() {
    this.resetSearch();
  }

  resetSearch() {
    const { actions } = this.props;
    const searchObj = {};
    actions.setSearchObject(searchObj);
  }

  handleSubmit(event) {
    const { actions, location } = this.props;
    if (event) {
      event.preventDefault();
    }
    const query = ReactDOM.findDOMNode(this.refs.query).value.trim();

    if (_.isEmpty(query)) {
      ReactDOM.findDOMNode(this.refs.error).style.display = "block";
    } else {
      const searchObj = {
        query: ReactDOM.findDOMNode(this.refs.query).value.trim(),
        ssbSection: ReactDOM.findDOMNode(this.refs.ssbSection).value,
        includeCodelists: this.refs.includeCodelists.checked,
      };

      actions.searchClassification(searchObj);

      const path =
        "/sok?query=" +
        searchObj.query +
        "&includeCodelists=" +
        searchObj.includeCodelists +
        "&ssbSection=" +
        searchObj.ssbSection;
      this.context.router.push(path);
    }
  }

  handleChange(event) {
    const { actions } = this.props;
    const searchObj = {
      query: this.refs.query.value,
      ssbSection: this.refs.ssbSection.value,
      includeCodelists: this.refs.includeCodelists.checked,
    };
    actions.setSearchObject(searchObj);
  }

  filterParams(event) {
    const { actions, location } = this.props;
    this.handleChange(event);
    let searchObj = {
      ssbSection: this.refs.ssbSection.value,
      includeCodelists: this.refs.includeCodelists.checked,
    };

    if (location.pathname.indexOf("sok") > -1) {
      this.handleSubmit();
    } else {
      actions.loadSubjects(searchObj);
    }
  }

  displayModal() {
    const { actions } = this.props;
    const item = {
      title: translate("SEARCH.WHAT_IS_CODELIST_HEADER"),
      body: translate("SEARCH.WHAT_IS_CODELIST_BODY"),
    };

    actions.displayModal(item);
  }

  closeModal() {
    const { actions } = this.props;
    actions.hideModal();
  }

  renderModal() {
    const { modal } = this.props;

    if (modal && !_.isEmpty(modal.item)) {
      return (
        <Modal
          closeOnOuterClick={true}
          style={{ background: "rgba(0, 0, 0, 0.2)" }}
          containerStyle={{ background: "#666666" }}
          show={modal.modalIsOpen}
          onClose={this.closeModal.bind(this)}
        >
          <div className="modal-content">
            <a onClick={this.closeModal.bind(this)}>
              <i
                className="fa fa-times-circle-o close-button"
                aria-hidden="true"
              ></i>
            </a>
            <h2>{modal.item.title}</h2>
            <div>
              <p>{modal.item.body}</p>
            </div>
          </div>
        </Modal>
      );
    }
    return null;
  }

  render() {
    const { sections, search } = this.props;
    const ssbSections = sections.ssbSections;

    let options;
    if (ssbSections.length) {
      ssbSections.sort(function (a, b) {
        return a.name == b.name ? 0 : a.name < b.name ? -1 : 1;
      });
      options = ssbSections.map(function (section, key) {
        return (
          <option key={key} value={section.name}>
            {section.name}
          </option>
        );
      });
    }
    const dropdown = (
      <select
        name="seksjon"
        ref="ssbSection"
        defaultValue={search.ssbSection}
        onChange={this.filterParams.bind(this)}
      >
        <TranslateComponent
          component="option"
          value=""
          content="SEARCH.ALL_SECTIONS"
        />
        {options}
      </select>
    );
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="search-box">
        <div className="flex-container">
          <div className="flex-item search-input-text">
            <TranslateComponent
              component="label"
              content="SEARCH.SEARCH_KODEVERK"
            />
            <TranslateComponent
              component="input"
              type="text"
              ref="query"
              defaultValue={search.query}
              onChange={this.handleChange.bind(this)}
              aria-label={translate("SEARCH.SEARCH")}
              attributes={{ placeholder: "SEARCH.SEARCH" }}
            />
          </div>
          <div className="flex-item search-button">
            <TranslateComponent
              component="button"
              type="submit"
              content="SEARCH.SEARCH"
            />
          </div>
        </div>
        <TranslateComponent
          component="p"
          content="SEARCH.SEARCH_ERROR"
          ref="error"
          className="error"
        />

        <div className="flex-container filter">
          <label>
            <TranslateComponent content="SEARCH.FILTER" />:
          </label>
          <div>
            <input
              type="checkbox"
              id="includeCodelists"
              ref="includeCodelists"
              onChange={this.filterParams.bind(this)}
              defaultChecked={search.includeCodelists === true}
            />
            <TranslateComponent
              component="label"
              htmlFor="includeCodelists"
              content="SEARCH.INCLUDE_CODELISTS"
            />
            <i
              className="fa fa-info-circle"
              aria-hidden="true"
              onClick={() => this.displayModal()}
            ></i>
          </div>
          <div className="search-dropdown-section">
            <TranslateComponent
              component="label"
              content="SEARCH.OWNING_SECTION"
            />
            {dropdown}
          </div>
        </div>

        {this.renderModal()}
      </form>
    );
  }
}

Search.propTypes = {
  actions: PropTypes.object.isRequired,
  sections: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  modal: state.modal,
});

Search.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Search);
