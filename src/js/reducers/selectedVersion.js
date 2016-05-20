import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import _ from 'lodash'
import { loadVersion } from '../actions'
import FlatToNested from '../lib/flat-to-nested'

const initialState = {
	isFetching: false,
	version: {}
}

const flatToNested = new FlatToNested({
	id: 'code',
	parent: 'parentCode'
})

let nestedItems, newState, items

function selectedVersion(state = initialState, action) {
	switch (action.type) {
		case types.SELECTED_VERSION_REQUEST:
			return _.merge({}, state, {
				isFetching: true
			})


		case types.SELECTED_VERSION_SUCCESS:

			nestedItems = flatToNested.convert(_.cloneDeep(action.response.classificationItems))

			const mappedVersion = _.merge({}, action.response, {
				"id": action.id,
				"nestedItems": nestedItems.children
			})

			return _.assign({}, state, {
				isFetching: false,
				version: mappedVersion
			})


		case types.CHANGES_SUCCESS:
			return _.merge({}, state, {
				isFetching: false,
				version: {
					changes: action.response
				}
			})

		case types.TOGGLE_CODE:
			nestedItems = _.cloneDeep(state.version.nestedItems)

			let selectedItem = findNestedIndex(nestedItems, {'code': action.code})

			selectedItem.active = !selectedItem.active

			newState = _.merge({}, state, {
				version: {
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

		case types.CHANGES_FAILURE:
			return _.merge({}, state, {
				isFetching: false,
				version: {
					changes: action.response
				}
			})
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
