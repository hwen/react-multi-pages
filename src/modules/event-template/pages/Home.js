import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Avatar from 'src/components/Avatar';

class Home extends Component {
  componentDidMount() {
    this.props.getYiyan();
  }
  render() {
    const { match, location, saying } = this.props;
    return (
      <div className="Home">
        <div className="Home-header">
          <Avatar />
          <h2>{saying.hitokoto}</h2>
          <p>route match: {JSON.stringify(match)}</p>
          <p>location: {JSON.stringify(location)}</p>
          <li>
            <Link to="/about">Go to About</Link>
          </li>
          <li>
            <Link to="/count">Go to Count</Link>
          </li>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  saying: state.saying,
});

const mapDispatch = dispatch => ({
  getYiyan: dispatch.saying.getYiyan,
});

export default connect(
  mapState,
  mapDispatch
)(Home);
