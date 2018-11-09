import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'src/components/Avatar';

class Home extends Component {
  componentDidMount() {}
  render() {
    const { match, location } = this.props;
    return (
      <div className="Home">
        <div className="Home-header">
          <Avatar />
          <h2>I am event-example</h2>
          <p>{JSON.stringify(match)}</p>
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

export default Home;
