import * as types from "../constants/ActionTypes";

const initialState = {
  isFetching: false,
  search: {
    query: "",
    ssbSection: "",
    includeCodelists: false,
  },
  items: [],
};

function searchResult(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        search: action.params,
      };

    case types.SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: Array.isArray(action.response._embedded?.searchResults)
          ? action.response._embedded.searchResults
          : [],
      };

    case types.SEARCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case types.SET_SEARCH_QUERY:
      return {
        ...state,
        search: {
          ...state.search,
          ...action.search, // This ensures all properties (query, ssbSection, includeCodelists) are updated
        },
      };

    default:
      return state;
  }
}

export default searchResult;
