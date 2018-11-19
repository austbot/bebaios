/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {fromJS} from 'immutable';

import {
  LOAD_NAMESPACES,
  LOAD_NAMESPACES_ERROR,
  LOAD_NAMESPACES_SUCCESS, LOAD_PERMS_ERROR, LOAD_PERMS_SUCCESS,
  LOAD_PODS,
  LOAD_PODS_ERROR,
  LOAD_PODS_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  namespaces: [],
  permissions: {},
  pods: []
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NAMESPACES:
    case LOAD_PODS:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_NAMESPACES_SUCCESS:
      return state
        .set('namespaces', action.ns)
        .set('loading', false);
    case LOAD_NAMESPACES_ERROR:
    case LOAD_PODS_ERROR:
    case LOAD_PERMS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_PODS_SUCCESS:
      return state
        .set('pods', action.pods)
        .set('loading', false);
    case LOAD_PERMS_SUCCESS:
      return state
        .set('permissions', action.pods)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
