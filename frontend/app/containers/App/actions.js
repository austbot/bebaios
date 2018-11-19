/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_NAMESPACES,
  LOAD_NAMESPACES_ERROR,
  LOAD_NAMESPACES_SUCCESS, LOAD_PERMS_ERROR, LOAD_PERMS_SUCCESS,
  LOAD_PODS_ERROR,
  LOAD_PODS_SUCCESS,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_NAMESPACES
 */
export function loadNamespaces() {
  return {
    type: LOAD_NAMESPACES,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_NAMESPACES_SUCCESS passing the repos
 */
export function namespacesLoaded(ns) {
  return {
    type: LOAD_NAMESPACES_SUCCESS,
    ns
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_NAMESPACES_ERROR passing the error
 */
export function namespacesLoadingError(error) {
  return {
    type: LOAD_NAMESPACES_ERROR,
    error,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_NAMESPACES
 */
export function loadedPods(pods) {
  return {
    type: LOAD_PODS_SUCCESS,
    pods
  };
}

export function podsLoadingError(error) {
  return {
    type: LOAD_PODS_ERROR,
    error,
  };
}

export function loadedPerms(pods) {
  return {
    type: LOAD_PERMS_SUCCESS,
    pods
  };
}

export function permsLoadingError(error) {
  return {
    type: LOAD_PERMS_ERROR,
    error,
  };
}
