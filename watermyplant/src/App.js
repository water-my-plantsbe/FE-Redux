import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';

import Login from './components/user/login.js';
// import Logout from './components/views/Logout';
import Register from './components/user/register.js';
import PrivateRouter from '../src/components/Router/Router.js';


const Home = () => (
  <div> Hello</div>
)



class App extends Component {
  render() {
    return (
      <AppContainer>
        <PageContent>
          <PrivateRouter exact path="/" component={Home} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/register" render={props => <Register {...props} />} />

        </PageContent>
      </AppContainer>
    );
  }
}

export default App;


const AppContainer = styled.div`
  background: lightgrey;
  min-height: 100vh;
  height: 100%;
  padding: 0;
  margin: 0;
`;


const PageContent = styled.div`
  width: 100%;
  margin: 0 auto;
`;