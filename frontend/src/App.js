import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ShowDrawer from './components/ShowDrawer'
import signIn from './components/SignIn'
import Register from './components/Register'
import RegisterUser from './components/RegisterUser'
import UserDetails from './components/UserDetails'


function App() {
  return (
<>
<Router>
<NavBar/>
<ShowDrawer />
<Switch>
  <Route exact path='/' component={LandingPage}/>
  <Route path='/registerUser'component={RegisterUser}/>
  <Route path='/userdetails'component={UserDetails}/>
</Switch>
</Router>
<Footer/>
</>
  )
}

export default App;
