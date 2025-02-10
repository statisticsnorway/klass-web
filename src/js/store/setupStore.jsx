import { configureStore } from '@reduxjs/toolkit/react';
import merge from 'lodash/merge';

import api from '../middleware/api';

import classFamilies from '../reducers/classFamilies';
import selectedClass from '../reducers/selectedClass';
import selectedVersion from '../reducers/selectedVersion';
import searchResult from '../reducers/searchResult';
import ssbSections from '../reducers/ssbSections';
import subscription from '../reducers/subscription';

const initialState = {
  modalIsOpen: false,
  item: {},
  contentType: 'notes',
};
function modal(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return merge({}, state, {
        modalIsOpen: action.display,
        item: action.item,
        contentType: action.contentType,
      });
    default:
      return state;
  }
}

export default function setupStore() {
  const store = configureStore({
    reducer: {
      modal: modal,
      classFamilies: classFamilies,
      ssbSections: ssbSections,
      selectedClass: selectedClass,
      selectedVersion: selectedVersion,
      searchResult: searchResult,
      subscription: subscription,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
    // devTools:
    //   process.env.NODE_ENV === 'production'
    //     ? false
    //     : {
    //         stateSanitizer: stateSanitizerForDevtools,
    //       },
  });

  // Enable Webpack hot module replacement for reducers
  // if (import.meta.hot) {
  //   import.meta.hot.accept("../reducers", async () => {
  //     const newRootReducer = (await import("../reducers")).default;
  //     store.replaceReducer(newRootReducer);
  //   });
  // }

  return store;
}
