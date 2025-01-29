import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router";
import ResultItem from "./ResultItem";
import { TranslateComponent } from "../../lib/languageUtils";

const SearchResult = ({ items, isFetching, search, actions }) => {
  const isEmpty = !items || items.length === 0; // Ensure items is not null or undefined

  const renderList = () => {
    if (items) {
      const sortedItems = [...items].sort(
        (a, b) => b.searchScore - a.searchScore
      );

      return sortedItems.map((item) => (
        <ResultItem key={item.id || item.code} item={item} actions={actions} />
      ));
    }
  };

  if (isEmpty && isFetching) {
    return (
      <TranslateComponent component="p" content="LOADING.LOADING_CONTENT" />
    );
  }

  return (
    <div className="search-results">
      <div className="list-heading">
        <h2>
          Resultat på "{search.query}" {items.length} stk
        </h2>
      </div>
      <div className="result-list">{renderList()}</div>
      <p className="back-link">
        &lt;&lt;{" "}
        <Link to={`/`}>
          <TranslateComponent content="SEARCH.BACK_TO_CLASSIFICATION_OVERVIEW" />
        </Link>
      </p>
    </div>
  );
};

SearchResult.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  search: PropTypes.object.isRequired,
};

export default SearchResult;
