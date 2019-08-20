import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Details from './pages/Details';
import Verification from './pages/Verification';
import NavigationBar from './components/organism/NavigationBar'
import Footer from './components/organism/Footer'
import AppliedRoute from './components/generic/AppliedRoute'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <NavigationBar/>
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}>
              <AppliedRoute exact path="/" component={Home} />
              <AppliedRoute exact path="/details" component={Details} />
              <AppliedRoute exact path="/verify" component={Verification} />
              <AppliedRoute component={NotFound} />
            </AnimatedSwitch>
            <Footer/>
          </div>
      </Router>
    )
  }
}

export default App;
