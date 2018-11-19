/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.handleChange = (evt) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
        this.props.onNsSelect(evt.target.value)
      }
    };

    this.handlePodClick = (name, evt) => {
      if(evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
        this.props.onPodSelect(name);
      }
    }
  }

  componentDidMount() {
    this.props.loadNamespaces();
    this.props.onNsSelect(this.props.namespace);
  }

  pods() {
    const list = this.props.pods.map((pod, i) => {
     return <li key={i}>
       <a href="#" onClick={this.handlePodClick.bind(this, pod.metadata.name)}>{pod.metadata.name}</a>
     </li>
    });
    return <ul>{list}</ul>;
  }


  render() {
    const {namespaces, namespace, permissions} = this.props;

    return (
      <article>
        <Helmet>
          <title>RBAC Tools</title>
          <meta name="description" content="A React.js Boilerplate application homepage"/>
        </Helmet>
        <div className="home-page">
          <section className="centered">
            <h2>View Permissions</h2>
            <p>Select a POD to view permissions</p>
          </section>
          <section>
            <h2>Try me!</h2>
            <label htmlFor="ns">
              <span className="at-prefix">Show pods from namespace</span>
              <select onChange={this.handleChange} name="ns" defaultValue={namespace}>
                {namespaces.map((n) => <option key={n.metadata.name}>{n.metadata.name}</option>)}
              </select>
              {this.pods()}
            </label>
          </section>
          <section>
            <pre>{JSON.stringify(permissions, null, 2) }</pre>
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  namespace: PropTypes.string,
  namespaces: PropTypes.array,
  permissions: PropTypes.object,
  loadNamespaces: PropTypes.func,
  onNsSelect: PropTypes.func,
  onPodSelect: PropTypes.func
};
