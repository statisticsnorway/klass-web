import _ from "lodash";
import * as types from "../constants/ActionTypes";
import FlatToNested from "../lib/flat-to-nested";

const initialState = {
	isFetching: false,
	isFetchingChanges: false,
	isFetchingCorrespondence: false,
	isFetchingVariant: false,
	version: {},
	selectedCorrespondence: {},
	selectedVariant: {},
	changes: {},
	errorMsg: "",
};

const flatToNested = new FlatToNested({
	id: "code",
	parent: "parentCode",
});

let nestedItems, newState, items, mappedItems, selectedItem;

function selectedVersion(state = initialState, action) {
	switch (action.type) {
		case types.SELECTED_VERSION_REQUEST:
			return _.assign({}, state, {
				isFetching: true,
				version: {},
			});
		case types.CHANGES_REQUEST:
			return _.assign({}, state, {
				isFetchingChanges: true,
				changes: {},
			});
		case types.CORRESPONDENCE_REQUEST:
			return _.merge({}, state, {
				isFetchingCorrespondence: true,
			});

		case types.VARIANT_REQUEST:
			return _.merge({}, state, {
				isFetchingVariant: true,
			});

		case types.SELECTED_VERSION_SUCCESS:
			// Converting flat to nested structure here in order to preserve the state
			nestedItems = flatToNested.convert(
				_.cloneDeep(action.response.classificationItems),
			);
			mappedItems = _.merge({}, action.response, {
				id: action.id,
				language: action.requestParams.language,
				nestedItems: nestedItems.children,
			});

			return _.assign({}, state, {
				isFetching: false,
				version: mappedItems,
			});

		case types.CHANGES_SUCCESS:
			return _.assign({}, state, {
				isFetchingChanges: false,
				changes: action.response,
				errorMsg: "",
			});

		case types.CORRESPONDENCE_SUCCESS: {
			nestedItems = flatToNested.convert(
				_.cloneDeep(action.response.correspondenceMaps),
			);
			const mergedValues = _.merge({}, action.response, {
				language: action.requestParams.language,
				nestedItems: nestedItems.children,
			});
			return _.assign({}, state, {
				isFetchingCorrespondence: false,
				selectedCorrespondence: mergedValues,
			});
		}

		case types.VARIANT_SUCCESS:
			nestedItems = flatToNested.convert(
				_.cloneDeep(action.response.classificationItems),
			);
			mappedItems = _.merge({}, action.response, {
				id: action.id,
				language: action.requestParams.language,
				nestedItems: nestedItems.children,
			});

			return _.assign({}, state, {
				isFetchingVariant: false,
				selectedVariant: mappedItems,
			});

		case types.TOGGLE_ALL:
			nestedItems =
				action.tab == "code"
					? _.cloneDeep(state.version.nestedItems)
					: _.cloneDeep(state.selectedVariant.nestedItems);
			traverseToggle(nestedItems, action.show);

			switch (action.tab) {
				case "code":
					newState = _.merge({}, state, {
						version: {
							nestedItems: nestedItems,
						},
					});
					break;
				case "variant":
					newState = _.merge({}, state, {
						selectedVariant: {
							nestedItems: nestedItems,
						},
					});
					break;
			}

			return _.assign({}, state, newState);

		case types.TOGGLE_CODE:
			nestedItems =
				action.tab == "code"
					? _.cloneDeep(state.version.nestedItems)
					: _.cloneDeep(state.selectedVariant.nestedItems);
			selectedItem = findNestedIndex(nestedItems, { code: action.code });
			selectedItem.active = !selectedItem.active;

			switch (action.tab) {
				case "code":
					newState = _.merge({}, state, {
						version: {
							nestedItems: nestedItems,
						},
					});
					break;
				case "variant":
					newState = _.merge({}, state, {
						selectedVariant: {
							nestedItems: nestedItems,
						},
					});
					break;
			}

			return _.assign({}, state, newState);

		case types.SEARCH_CODE:
			switch (action.tab) {
				case "code":
					nestedItems = flatToNested.convert(
						_.cloneDeep(state.version.classificationItems),
					).children;
					if (action.query) {
						nestedItems = filterClassificationItemTree(
							nestedItems,
							action.query,
						);
					}

					newState = _.merge({}, state);
					_.set(newState, "version.nestedItems", nestedItems);
					_.set(newState, "version.filterQuery", action.query);

					return _.assign({}, state, newState);
				case "variant":
					nestedItems = flatToNested.convert(
						_.cloneDeep(state.selectedVariant.classificationItems),
					).children;
					if (action.query) {
						nestedItems = filterClassificationItemTree(
							nestedItems,
							action.query,
						);
					}

					newState = _.merge({}, state);
					_.set(newState, "selectedVariant.nestedItems", nestedItems);
					_.set(newState, "selectedVariant.filterQuery", action.query);

					return _.assign({}, state, newState);
				case "correspondences":
					nestedItems = flatToNested.convert(
						_.cloneDeep(state.selectedCorrespondence.correspondenceMaps),
					).children;
					if (action.query) {
						nestedItems = filterCorrespondencesTree(nestedItems, action.query);
					}

					newState = _.merge({}, state);
					_.set(newState, "selectedCorrespondence.nestedItems", nestedItems);
					_.set(newState, "selectedCorrespondence.filterQuery", action.query);

					return _.assign({}, state, newState);
			}

		case types.CORRESPONDENCE_FAILURE:
			return _.merge({}, state, {
				isFetchingCorrespondence: false,
				selectedCorrespondence: {},
				errorMsg: action.error,
			});
		case types.VARIANT_FAILURE:
			return _.merge({}, state, {
				isFetchingVariant: false,
				selectedVariant: {},
				errorMsg: action.error,
			});
		case types.CHANGES_FAILURE:
			return _.assign({}, state, {
				isFetchingChanges: false,
				changes: {},
				errorMsg: action.error,
			});
		case types.SELECTED_VERSION_FAILURE:
			return _.assign({}, state, {
				isFetching: false,
				version: {},
			});
		default:
			return state;
	}
}

function traverseToggle(items, toggle) {
	_.forEach(items, (item) => {
		item.active = toggle;
		if (item.children) {
			traverseToggle(item.children, toggle);
		}
	});
}

function findNestedIndex(items, attrs) {
	function match(value) {
		for (var key in attrs) {
			if (!_.isUndefined(value) && !_.isNull(value)) {
				return attrs[key] === value[key];
			} else {
				return false;
			}
		}
		return false;
	}

	function traverse(value) {
		var result;

		_.forEach(value, (val) => {
			if (match(val)) {
				result = val;
				return false;
			}

			if (_.isObject(val) || _.isArray(val)) {
				result = traverse(val);
			}

			if (result) {
				return false;
			}
		});

		return result;
	}

	return traverse(items);
}

function toLower(value) {
	if (value === null) return null;
	return value.toLowerCase();
}

function filterCorrespondencesTree(items, query) {
	var retArray = [];
	const lowerQuery = toLower(query);
	_.each(items, (item, key) => {
		var obj;
		if (_.isArray(item.children)) {
			var childArray = filterClassificationItemTree(item.children, query);
			if (!_.isEmpty(childArray)) {
				obj = _.omit(item, ["children"]);
				_.merge(obj, {
					children: childArray,
					active: true,
				});
				retArray.push(obj);
			} else if (
				_.includes(toLower(item.sourceCode), lowerQuery) ||
				_.includes(toLower(item.sourceName), lowerQuery) ||
				_.includes(toLower(item.targetCode), lowerQuery) ||
				_.includes(toLower(item.targetName), lowerQuery)
			) {
				obj = _.omit(item, ["children"]);
				retArray.push(obj);
			}
		} else {
			if (
				_.includes(toLower(item.sourceCode), lowerQuery) ||
				_.includes(toLower(item.sourceName), lowerQuery) ||
				_.includes(toLower(item.targetCode), lowerQuery) ||
				_.includes(toLower(item.targetName), lowerQuery)
			) {
				retArray.push(item);
			}
		}
	});

	return retArray;
}
function filterClassificationItemTree(items, query) {
	var retArray = [];
	const lowerQuery = toLower(query);
	_.each(items, (item, key) => {
		var obj;
		if (_.isArray(item.children)) {
			var childArray = filterClassificationItemTree(item.children, query);
			if (!_.isEmpty(childArray)) {
				obj = _.omit(item, ["children"]);
				_.merge(obj, {
					children: childArray,
					active: true,
				});
				retArray.push(obj);
			} else if (
				_.includes(toLower(item.name), lowerQuery) ||
				_.includes(toLower(item.shortName), lowerQuery) ||
				_.includes(toLower(item.notes), lowerQuery) ||
				_.includes(toLower(item.code), lowerQuery)
			) {
				obj = _.omit(item, ["children"]);
				retArray.push(obj);
			}
		} else {
			if (
				_.includes(toLower(item.name), lowerQuery) ||
				_.includes(toLower(item.shortName), lowerQuery) ||
				_.includes(toLower(item.notes), lowerQuery) ||
				_.includes(toLower(item.code), lowerQuery)
			) {
				retArray.push(item);
			}
		}
	});

	return retArray;
}

export default selectedVersion;
