import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useLocation } from "react-router-dom";
import * as ClassActions from "../actions";
import Search from "../components/Search";
import SearchResult from "../components/Search/SearchResult";
import Sidebar from "../components/Sidebar";
import { translate, TranslateComponent } from "../lib/languageUtils";

const SearchPage = ({ search, actions, isFetching, items, ssbSections }) => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    const ssbSection = params.get("ssbSection") || "";
    const includeCodelists = params.get("includeCodelists") === "true";

    if (!search || search.query === undefined) {
      actions.setSearchObject({ query, ssbSection, includeCodelists });
      if (query) {
        actions.searchClassification({ query, ssbSection, includeCodelists });
      }
    }
  }, [actions, location, search]);

  const searchObj = search
    ? search
    : { query: "", ssbSection: "", includeCodelists: false };
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
        <Search actions={actions} sections={ssbSections} search={searchObj} />
        <SearchResult
          items={items}
          actions={actions}
          isFetching={isFetching}
          search={searchObj}
        />
      </div>
      <Sidebar contactInfo={searchObj.contactInfo} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.searchResult.items,
  search: state.searchResult.search,
  isFetching: state.searchResult.isFetching,
  ssbSections: state.ssbSections,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ClassActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
