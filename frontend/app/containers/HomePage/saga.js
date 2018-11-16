/**
 * Gets resources from api
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {LOAD_NAMESPACES} from 'containers/App/constants';
import {namespacesLoaded, namespacesLoadingError} from 'containers/App/actions';

import request from 'utils/request';

/**
 * Namespaces
 */
export function* getNamespaces() {
  const requestURL = `/api/namespaces`;

  try {
    // Call our request helper (see 'utils/request')
    const ns = yield call(request, requestURL);
    yield put(namespacesLoaded(ns));
  } catch (err) {
    yield put(namespacesLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* namespaceData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_NAMESPACES, getNamespaces);
}
