import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}>
              <Route exact path="/" component={Home} />
              <Route component={NotFound} />
            </AnimatedSwitch>
          </div>
      </Router>
    )
  }
}

export default App;
