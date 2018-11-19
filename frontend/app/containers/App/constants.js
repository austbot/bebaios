/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_NAMESPACES = 'boilerplate/App/LOAD_NAMESPACES';
export const LOAD_NAMESPACES_SUCCESS = 'boilerplate/App/LOAD_NAMESPACES_SUCCESS';
export const LOAD_NAMESPACES_ERROR = 'boilerplate/App/LOAD_NAMESPACES_ERROR';
export const LOAD_PODS = 'boilerplate/App/LOAD_PODS';
export const LOAD_PODS_SUCCESS = 'boilerplate/App/LOAD_PODS_SUCCESS';
export const LOAD_PODS_ERROR = 'boilerplate/App/LOAD_PODS_ERROR';
export const LOAD_PERMS_SUCCESS = 'boilerplate/App/LOAD_PERMS_SUCCESS';
export const LOAD_PERMS_ERROR = 'boilerplate/App/LOAD_PERMS_ERROR';
export const DEFAULT_LOCALE = 'en';
