import 'src/styles/index.scss';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

const async = dynamicImport => {
  return Loadable({
    loader: () => dynamicImport,
    loading: () => <div>loading...</div>,
  });
};

class App extends Component {
  render() {
    return (
      // set basename for module
      <Router basename="/event-template">
        <div>
          <Switch>
            {/* prettier-ignore */}
            <Route exact path='/' component={async(import(/* webpackChunkName: "home" */ './pages/Home'))}></Route>
            {/* prettier-ignore */}
            <Route path="/about" component={async(import(/* webpackChunkName: "about" */ './pages/About'))} />
            {/* prettier-ignore */}
            <Route path="/count" component={async(import(/* webpackChunkName: "count" */ './pages/Count'))} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
