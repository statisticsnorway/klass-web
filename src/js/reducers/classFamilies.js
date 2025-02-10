import * as types from '../constants/ActionTypes';
import merge from 'lodash/merge';

const initialState = {
  isFetching: false,
  items: [],
};

function classFamilies(state = initialState, action) {
  switch (action.type) {
    case types.SUBJECTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.SUBJECTS_SUCCESS:
      if (
        action.response._embedded &&
        action.response._embedded.classificationFamilies
      ) {
        return Object.assign({}, state, {
          isFetching: false,
          items: action.response._embedded.classificationFamilies,
        });
      } else {
        let mappedClass = [];
        if (action.response.classifications) {
          mappedClass = action.response.classifications
            .map(function (classification) {
              const url = classification._links.self.href;
              const id = url.substring(url.lastIndexOf('/') + 1, url.length);
              return merge({}, classification, { id: id });
            })
            .sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            });
        }
        merge(state.items[action.id], {
          children: mappedClass,
        });
        return merge({}, state, {
          isFetching: false,
        });
      }
      break;
    case types.SUBJECTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case types.TOGGLE_SUBJECT:
      let active;
      if (action.show == undefined) {
        active = !state.items[action.id].active;
      } else {
        if (action.show == true) active = true;
        else active = false;
      }
      merge(state.items[action.id], {
        active: active,
      });
      return merge({}, state);

    default:
      return state;
  }
}

export default classFamilies;
