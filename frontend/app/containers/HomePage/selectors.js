/**
 * Homepage selectors
 */

import {createSelector} from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectNamespace = () => createSelector(
  selectHome,
  (homeState) => homeState.get('namespace')
);

export {
  selectHome,
  makeSelectNamespace,
};
