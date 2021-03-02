import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CartIcon from './components/CartIcon';
import signIn from './components/SignIn'
import Register from './components/Register';
function App() {
  return (
<>
<Router>
<NavBar/>
<CartIcon/>
<Switch>
  <Route exact path='/' component={LandingPage}/>
  <Route path='/signin'component={signIn}/>
  <Route path='/signup'component={Register}/>
</Switch>
</Router>
<Footer/>
</>
  )
}

export default App;
