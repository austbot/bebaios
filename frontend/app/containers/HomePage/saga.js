/**
 * Gets resources from api
 */

import {call, put, select, takeLatest} from 'redux-saga/effects';
import {LOAD_NAMESPACES} from 'containers/App/constants';
import {loadedPerms, namespacesLoaded, namespacesLoadingError, permsLoadingError} from 'containers/App/actions';

import request from 'utils/request';
import {loadedPods, podsLoadingError} from "../App/actions";
import {SELECT_NAMESPACE, SELECT_POD} from "./constants";
import {makeSelectNamespace} from "./selectors";

/**
 * Namespaces
 */
export function* getNamespaces() {
  const requestURL = `http://localhost:8080/api/namespaces`;

  try {
    // Call our request helper (see 'utils/request')
    const ns = yield call(request, requestURL);
    yield put(namespacesLoaded(ns.namespaces));
  } catch (err) {
    yield put(namespacesLoadingError(err));
  }
}

export function* getPods(action) {
  const requestURL = `http://localhost:8080/api/pods/${action.name}`;
  try {
    // Call our request helper (see 'utils/request')
    const pods = yield call(request, requestURL);
    yield put(loadedPods(pods.pods));
  } catch (err) {
    yield put(podsLoadingError(err));
  }
}

export function* getPermissions(action) {
  const ns = yield select(makeSelectNamespace());
  const requestURL = `http://localhost:8080/api/permissions-for/${ns}/pod/${action.name}`;
  try {
    const permissions = yield call(request, requestURL);
    yield put(loadedPerms(permissions.permissions));
  } catch (err) {
    yield put(permsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* namespaces() {
  yield takeLatest(LOAD_NAMESPACES, getNamespaces);
}

export function* namespace() {
  yield takeLatest(SELECT_NAMESPACE, getPods);
}

export function* pod() {
  yield takeLatest(SELECT_POD, getPermissions);
}

export default [
  {key: "namespace", saga: namespace},
  {key: "namespaces", saga: namespaces},
  {key: "pod", saga: pod},
]
