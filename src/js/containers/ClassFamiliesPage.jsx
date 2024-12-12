import React, { Component } from "react";
import Translate from "react-translate-component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ClassActions from "../actions";
import Search from "../components/Search";
import List from "../components/List";
import Contact from "../components/Sidebar/Contact";
import config from "../config";
import { translate } from "../lib/languageUtils";

function loadData(props) {
  const { actions } = props;
  actions.loadSubjects();
  actions.hideModal();
}

class ClassFamiliesPage extends Component {
  UNSAFE_componentWillMount() {
    loadData(this.props);
  }

  openHierarchy(ev) {
    const { items, actions } = this.props;
    if (ev.currentTarget.value == "true") {
      ev.target.innerHTML = translate("COMMON.CLOSE_HIERARCHY");
      ev.currentTarget.value = "false";
      actions.toggleAllSubjects(true);
    } else {
      ev.target.innerHTML = translate("COMMON.OPEN_HIERARCHY");
      ev.currentTarget.value = "true";
      actions.toggleAllSubjects(false);
    }
  }

  renderContent() {
    const { items, isFetching, actions, modal } = this.props;
    const translations = {
      screenReaderShowHide: translate("COMMON.SHOW_HIDE"),
    };

    return (
      <div>
        <div className="list-heading">
          <button
            ref="openCloseButton"
            className="expand-tree"
            value="true"
            onClick={(ev) => this.openHierarchy(ev)}
          >
            <Translate content="COMMON.OPEN_HIERARCHY" />
          </button>
          <Translate
            component="h3"
            content="CLASSIFICATIONS.CHOOSE_CLASS_FAMILY"
          />
        </div>
        <div className="results class-list" id="expandcollapse">
          <List
            items={items}
            isFetching={isFetching}
            type="classFamilies"
            actions={actions}
            modal={modal}
            translations={translations}
          />
        </div>
      </div>
    );
  }

  render() {
    document.title = translate("PAGE.TITLE");
    const { actions, ssbSections, search, location } = this.props;
    return (
      <div className="content">
        <div className="heading">
          <Translate
            component="h1"
            content="CLASSIFICATIONS.CLASSIFICATIONS_AND_CODELISTS"
          />
        </div>
        <div className="main">
          <Translate
            component="p"
            content="CLASSIFICATIONS.CLASS_DESCRIPTION"
          />
          <p>
            <a className="child-link" href={config.OM_KLASS_URL}>
              {" "}
              <Translate content="CLASSIFICATIONS.OM_KLASS_LINK_TEXT" />
            </a>
          </p>
          <p>
            <a className="child-link" href={config.API_BASE_URL + "/"}>
              {" "}
              <Translate content="CLASSIFICATIONS.API_LINK_TEXT" />
            </a>
            <Translate content="CLASSIFICATIONS.API_POST_LINK_TEXT" />
          </p>
          <Search
            actions={actions}
            sections={ssbSections}
            search={search}
            location={location}
          />
          {this.renderContent()}
        </div>
        <div className="sidebar">
          <Contact />
        </div>
        <div className="clear-fix" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  items: state.classFamilies.items,
  isFetching: state.classFamilies.isFetching,
  ssbSections: state.ssbSections,
  search: state.searchResult.search,
  searchResult: state.searchResult.items,
  searchIsFetching: state.searchResult.isFetching,
  modal: state.modal,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ClassActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassFamiliesPage);
