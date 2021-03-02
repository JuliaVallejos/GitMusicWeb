import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CartIcon from './components/CartIcon';
import signIn from './components/SignIn'
function App() {
  return (
<>
<Router>
<NavBar/>
<CartIcon/>
<Switch>
  <Route exact path='/' component={LandingPage}/>
  <Route path='/signin'component={signIn}/>
</Switch>
</Router>
<Footer/>
</>
  )
}

export default App;
