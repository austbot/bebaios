import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {makeSelectError, makeSelectLoading, makeSelectNamespaces} from 'containers/App/selectors';
import {loadNamespaces} from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';
import {makeSelectNamespace} from "./selectors";
import {selectNamespace} from "./actions";
import {makeSelectPods} from "../App/selectors";

const mapDispatchToProps = (dispatch) => ({
  loadNamespaces: () => dispatch(loadNamespaces()),
  onNsSelect: (value) => {
    if (value !== undefined) dispatch(selectNamespace(value));
  }
});

const mapStateToProps = createStructuredSelector({
  namespaces: makeSelectNamespaces(),
  namespace: makeSelectNamespace(),
  pods: makeSelectPods(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'home', reducer});
const withSaga = injectSaga({key: 'home', saga});

export default compose(withReducer, withSaga, withConnect)(HomePage);
export {mapDispatchToProps};
