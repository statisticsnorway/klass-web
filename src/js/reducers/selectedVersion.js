import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import { loadVersion } from '../actions'
import FlatToNested from '../lib/flat-to-nested'

const initialState = {
	isFetching: false,
	version: {},
	selectedCorrespondence: {},
	selectedVariant: {}
}

const flatToNested = new FlatToNested({
	id: 'code',
	parent: 'parentCode'
})

let nestedItems, newState, items, mappedItems, selectedItem

function selectedVersion(state = initialState, action) {
	switch (action.type) {
		case types.SELECTED_VERSION_REQUEST:
		case types.CORRESPONDENCE_REQUEST:
		case types.VARIANT_REQUEST:
			return _.merge({}, state, {
				isFetching: true
			})

		case types.SELECTED_VERSION_SUCCESS:
			// Converting flat to nested structure here in order to preserve the state
			nestedItems = flatToNested.convert(_.cloneDeep(action.response.classificationItems))
			mappedItems = _.merge({}, action.response, {
				"id": action.id,
				"nestedItems": nestedItems.children
			})

			return _.assign({}, state, {
				isFetching: false,
				version: mappedItems
			})

		case types.CHANGES_SUCCESS:
			return _.merge({}, state, {
				isFetching: false,
				version: {
					changes: action.response
				}
			})

		case types.CORRESPONDENCE_SUCCESS:
			return _.assign({}, state, {
				selectedCorrespondence: action.response
			})

		case types.VARIANT_SUCCESS:
			nestedItems = flatToNested.convert(_.cloneDeep(action.response.classificationItems))
			mappedItems = _.merge({}, action.response, {
				"id": action.id,
				"nestedItems": nestedItems.children
			})

			return _.assign({}, state, {
				selectedVariant: mappedItems
			})

		case types.TOGGLE_CODE:
			nestedItems = _.cloneDeep(state.version.nestedItems)
			selectedItem = findNestedIndex(nestedItems, {'code': action.code})
			selectedItem.active = !selectedItem.active

			newState = _.merge({}, state, {
				version: {
					nestedItems: nestedItems
				}
			})

			return _.assign({}, state, newState)

		case types.TOGGLE_VARIANT:
			nestedItems = _.cloneDeep(state.selectedVariant.nestedItems)
			selectedItem = findNestedIndex(nestedItems, {'code': action.code})
			selectedItem.active = !selectedItem.active

			newState = _.merge({}, state, {
				selectedVariant: {
					nestedItems: nestedItems
				}
			})

			return _.assign({}, state, newState)

		case types.SEARCH_CODE:
			nestedItems = flatToNested.convert(_.cloneDeep(state.version.classificationItems)).children
			if (action.query) {
				nestedItems = filterTree(nestedItems, action.query)
			}

			newState = _.merge({}, state)
			_.set(newState, 'version.nestedItems', nestedItems)

			return _.assign({}, state, newState)

		case types.CORRESPONDENCE_FAILURE:
		case types.VARIANT_FAILURE:
		case types.CHANGES_FAILURE:
			// return _.merge({}, state, {
			// 	isFetching: false,
			// 	version: {
			// 		changes: action.response
			// 	}
			// })
		case types.SELECTED_VERSION_FAILURE:
			return _.merge({}, state, {
				isFetching: false
			})

		default:
			return state
	}
}

function findNestedIndex(items, attrs) {

  function match(value) {
    for (var key in attrs) {
      if(!_.isUndefined(value)) {
        if (attrs[key] !== value[key]) {
          return false;
        }
      }
    }

    return true;
  }

  function traverse(value) {
    var result;

    _.forEach(value, function (val) {
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

function filterTree(items, query) {
	var retArray = []
	_.each(items, function(item, key) {
		var obj
		if (_.isArray(item.children)) {
			var childArray = filterTree(item.children, query)
			if (!_.isEmpty(childArray)) {
				obj = _.omit(item, ['children'])
				_.merge(obj, {
					children: childArray,
					active: true
				})
				retArray.push(obj)
			} else if (	_.includes(item.name.toLowerCase(), query.toLowerCase()) ||
						_.includes(item.code.toLowerCase(), query.toLowerCase())) {
				obj = _.omit(item, ['children'])
				retArray.push(obj)
			}
		} else {
			if (_.includes(item.name.toLowerCase(), query.toLowerCase()) ||
				_.includes(item.code.toLowerCase(), query.toLowerCase())) {
				retArray.push(item)
			}

		}
	})

	return retArray
}

export default selectedVersion
