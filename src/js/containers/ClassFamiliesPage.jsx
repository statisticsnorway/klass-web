import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ClassActions from "../actions";
import Search from "../components/Search";
import List from "../components/List";
import Contact from "../components/Sidebar/Contact";
import config from "../config";
import { translate, TranslateComponent } from "../lib/languageUtils";
import { useLocation } from "react-router-dom";  // Import useLocation


const loadData = (actions) => {
  actions.loadSubjects();
  actions.hideModal();
};

const ClassFamiliesPage = ({
  items,
  isFetching,
  actions,
  modal,
  ssbSections,
  search,
}) => {
  const location = useLocation();  // Get location via useLocation hook

  useEffect(() => {
    loadData(actions);
  }, [actions]);

  const openHierarchy = (ev) => {
    if (ev.currentTarget.value === "true") {
      ev.target.innerHTML = translate("COMMON.CLOSE_HIERARCHY");
      ev.currentTarget.value = "false";
      actions.toggleAllSubjects(true);
    } else {
      ev.target.innerHTML = translate("COMMON.OPEN_HIERARCHY");
      ev.currentTarget.value = "true";
      actions.toggleAllSubjects(false);
    }
  };

  const renderContent = () => {
    const translations = {
      screenReaderShowHide: translate("COMMON.SHOW_HIDE"),
    };

    return (
      <div>
        <div className="list-heading">
          <button className="expand-tree" value="true" onClick={openHierarchy}>
            <TranslateComponent content="COMMON.OPEN_HIERARCHY" />
          </button>
          <TranslateComponent
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
  };

  document.title = translate("PAGE.TITLE");

  return (
    <div className="content">
      <div className="heading">
        <TranslateComponent
          component="h1"
          content="CLASSIFICATIONS.CLASSIFICATIONS_AND_CODELISTS"
        />
      </div>
      <div className="main">
        <TranslateComponent
          component="p"
          content="CLASSIFICATIONS.CLASS_DESCRIPTION"
        />
        <p>
          <a className="child-link" href={config.OM_KLASS_URL}>
            <TranslateComponent content="CLASSIFICATIONS.OM_KLASS_LINK_TEXT" />
          </a>
        </p>
        <p>
          <a className="child-link" href={`${config.API_BASE_URL}/`}>
            <TranslateComponent content="CLASSIFICATIONS.API_LINK_TEXT" />
          </a>
          <TranslateComponent content="CLASSIFICATIONS.API_POST_LINK_TEXT" />
        </p>
        <Search
          actions={actions}
          sections={ssbSections}
          search={search}
          location={location}  // Pass location from useLocation here
        />
        {renderContent()}
      </div>
      <div className="sidebar">
        <Contact />
      </div>
      <div className="clear-fix" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.classFamilies.items,
  isFetching: state.classFamilies.isFetching,
  ssbSections: state.ssbSections,
  search: state.searchResult.search,
  searchResult: state.searchResult.items,
  searchIsFetching: state.searchResult.isFetching,
  modal: state.modal,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ClassActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassFamiliesPage);
