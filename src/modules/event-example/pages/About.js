import React from 'react';
import Hello from '../components/Hello';

const About = ({ match }) => (
  <div>
    <Hello />
    <h2>About</h2>
    <p>{JSON.stringify(match)}</p>
  </div>
);

export default About;
