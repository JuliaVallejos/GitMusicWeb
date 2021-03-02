import './signIn.css';
import signIn from './components/SignIn'
import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

function App() {
  return (
    <div >
      <BrowserRouter>
        <Switch>
        <Route path='/'component={signIn}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
