import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRouter, Header } from './components';


export const App = () => {
  return (
    < >
      <Header />
      <Router>
        <AppRouter />
      </Router>
    </>
  );
}

