import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import { Auth } from "aws-amplify";
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Details from './pages/Details';
import Verification from './pages/Verification';
import NavigationBar from './components/organism/NavigationBar'
import Footer from './components/organism/Footer'
import AppliedRoute from './components/generic/AppliedRoute'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      } else {
        console.log('not logged in');
      }
    }
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  async handleLogout() {
    await Auth.signOut();
    this.userHasAuthenticated(false);
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <Router>
          <div>
            <NavigationBar isAuthenticated={this.state.isAuthenticated} userHasAuthenticated={this.userHasAuthenticated}/>
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}>
              <AppliedRoute exact path="/" component={Home} props={childProps} />
              <AppliedRoute exact path="/details/:reward_id/:created_at" component={Details} props={childProps} />
              <AppliedRoute exact path="/verify" component={Verification} props={childProps} />
              <AppliedRoute component={NotFound} />
            </AnimatedSwitch>
            <Footer/>
          </div>
      </Router>
    )
  }
}

export default App;
