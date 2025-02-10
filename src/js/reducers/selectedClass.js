import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';
import { loadVersion } from '../actions';
import _ from 'lodash';
import moment from 'moment';

const initialState = {
  isFetching: false,
  classification: {},
};

function selectedClass(state = initialState, action) {
  switch (action.type) {
    case types.SELECTED_CLASS_REQUEST:
      return _.merge({}, state, {
        isFetching: true,
      });

    case types.SELECTED_CLASS_SUCCESS:
      let mappedVersion = action.response.versions.map(function (version, key) {
        const url = version._links.self.href;
        const id = url.substring(url.lastIndexOf('/') + 1, url.length);
        return _.merge({}, version, { id: id });
      });

      mappedVersion.sort(function (a, b) {
        var validToA = moment(a.validTo).isValid() ? a.validTo : '9999-12-31';
        var validToB = moment(b.validTo).isValid() ? b.validTo : '9999-12-31';
        return moment(validToA).isAfter(validToB)
          ? -1
          : moment(validToA).isBefore(validToB)
          ? 1
          : 0;
        // return (moment(b.validTo) - moment(a.validTo) ? 1 : moment(b.validTo) - moment(a.validTo))
      });

      const newState = {
        isFetching: false,
        classification: action.response,
      };

      _.assign(newState.classification.versions, mappedVersion);

      return _.merge({}, newState);

    case types.SELECTED_CLASS_FAILURE:
      return _.assign({}, state, {
        isFetching: false,
        classification: {},
      });

    default:
      return state;
  }
}

export default selectedClass;
