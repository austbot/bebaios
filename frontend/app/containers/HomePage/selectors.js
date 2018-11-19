/**
 * Homepage selectors
 */

import {createSelector} from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectNamespace = () => createSelector(
  selectHome,
  (homeState) => homeState.get('namespace')
);

const makeSelectPod = () => createSelector(
  selectHome,
  (homeState) => homeState.get('pod')
);

export {
  selectHome,
  makeSelectNamespace,
  makeSelectPod
};
