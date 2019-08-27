import React, { Component } from 'react';
import './App.css';
import PrivateRouter from '../src/components/Router/Router.js';
import styled from 'styled-components';

const Home = () => (
  <div> Hello</div>
)



class App extends Component {
  render() {
    return (
      <AppContainer>
        <PageContent>
          <PrivateRouter exact path="/" component={Home} />


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