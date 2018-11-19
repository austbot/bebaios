import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectNamespaces,
  makeSelectPermissions
} from 'containers/App/selectors';
import {loadNamespaces} from '../App/actions';
import reducer from './reducer';
import HomePage from './HomePage';
import {makeSelectNamespace, makeSelectPod} from "./selectors";
import {selectNamespace, selectPod} from "./actions";
import {makeSelectPods} from "../App/selectors";
import saga from "./saga";

const mapDispatchToProps = (dispatch) => ({
  loadNamespaces: () => dispatch(loadNamespaces()),
  onNsSelect: (value) => {
    if (value !== undefined) dispatch(selectNamespace(value));
  },
  onPodSelect: (value) => {
    if (value !== undefined) dispatch(selectPod(value));
  }
});

const mapStateToProps = createStructuredSelector({
  namespaces: makeSelectNamespaces(),
  namespace: makeSelectNamespace(),
  pods: makeSelectPods(),
  pod: makeSelectPod(),
  permissions: makeSelectPermissions(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'home', reducer});
const withSaga = saga.map(injectSaga);

export default compose(withReducer, ...withSaga, withConnect)(HomePage);
export {mapDispatchToProps};
