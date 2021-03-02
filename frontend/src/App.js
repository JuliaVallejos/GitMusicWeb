import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from './components/Register'
import './styles.css'

function App() {
  return (
    <BrowserRouter>
     <Switch>
      <Route path="/" component={Register}/>
      </Switch>
  </BrowserRouter>
  );
}

export default App;
