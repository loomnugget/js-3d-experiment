import React from 'react';
import {render} from 'react-dom';

const Vector3D = require('./vectors.js');

class App extends React.Component {
  componentDidMount(){
    this.updateCanvas();
  }
