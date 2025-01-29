import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ClassActions from "../actions";
import Search from "../components/Search";
import SearchResult from "../components/Search/SearchResult";
import Sidebar from "../components/Sidebar";
import { translate, TranslateComponent } from "../lib/languageUtils";

const SearchPage = ({
  search,
  actions,
  location,
  isFetching,
  items,
  ssbSections,
}) => {
  useEffect(() => {
    if (!search.query) {
      actions.searchClassification(location.query);
    }
  }, [search.query, actions, location.query]);

  const searchObj = search.query ? search : location.query;
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
        <Search
          actions={actions}
          sections={ssbSections}
          search={searchObj}
          location={location}
        />
        <SearchResult
          items={items}
          actions={actions}
          isFetching={isFetching}
          search={location.query}
        />
      </div>
      <Sidebar />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  items: state.searchResult.items,
  search: state.searchResult.search,
  isFetching: state.searchResult.isFetching,
  ssbSections: state.ssbSections,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ClassActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
