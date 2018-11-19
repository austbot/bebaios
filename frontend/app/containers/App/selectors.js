/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectNamespaces = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('namespaces')
);

const makeSelectPods = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('pods')
);

const makeSelectPermissions = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('permissions')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectNamespaces,
  makeSelectPods,
  makeSelectLocation,
  makeSelectPermissions
};
