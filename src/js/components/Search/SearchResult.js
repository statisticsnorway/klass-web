import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router";
import Translate from "react-translate-component";
import ResultItem from "./ResultItem";

class SearchResult extends Component {
	renderList() {
		const { items, actions } = this.props;

		if (items) {
			const sortedItems = items.sort((a, b) => {
				if (a.searchScore > b.searchScore) {
					return -1;
				}
				if (a.searchScore < b.searchScore) {
					return 1;
				}
				return 0;
			});

			return sortedItems.map((item, key) => (
				<ResultItem key={key} item={item} actions={actions} />
			));
		}
	}

	render() {
		const { items, isFetching, search } = this.props;
		const isEmpty = items.length === 0;

		if (isEmpty && isFetching) {
			return <Translate component="p" content="LOADING.LOADING_CONTENT" />;
		}

		return (
			<div className="search-results">
				<div className="list-heading">
					<h2>
						Resultat på "{search.query}" {items.length} stk
					</h2>
				</div>
				<div className="result-list">{this.renderList()}</div>
				<p className="back-link">
					&lt;&lt;{" "}
					<Link to={`/`}>
						<Translate content="SEARCH.BACK_TO_CLASSIFICATION_OVERVIEW" />
					</Link>
				</p>
			</div>
		);
	}
}

SearchResult.propTypes = {
	isFetching: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired,
	items: PropTypes.array.isRequired,
	search: PropTypes.object.isRequired,
};

export default SearchResult;
