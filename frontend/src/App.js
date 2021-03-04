import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import {connect} from 'react-redux'
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ShowDrawer from './components/ShowDrawer'
import RegisterUser from './components/RegisterUser'
<<<<<<< HEAD
import ProductsByCategory from './components/ProductsByCategory'
import userActions from './Redux/actions/userActions'
=======
import UserDetails from './components/UserDetails'
>>>>>>> 323b282f3fe1f1340e5980cfb899db54ec3b871a

function App(props) {
  console.log(props.loggedUser)
  if(props.loggedUser){
    console.log("inicie sesion")
    var links =
    <>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/products/:category' component={ProductsByCategory}/>
        <Redirect to ="/"/>
      </Switch>
    </>
  }else if(localStorage.getItem('token')){
    props.preserveLog(localStorage.getItem('token'))
  }else{
     links =
    <>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/registerUser'component={RegisterUser}/>
          <Route path='/products/:category' component={ProductsByCategory}/>
          <Redirect to="/"/>
        </Switch>
    </>
  }
  return (
<>
<Router>
<NavBar/>
<ShowDrawer />
<<<<<<< HEAD
  {links}
=======
<Switch>
  <Route exact path='/' component={LandingPage}/>
  <Route path='/registerUser'component={RegisterUser}/>
  <Route path='/userdetails'component={UserDetails}/>
</Switch>
>>>>>>> 323b282f3fe1f1340e5980cfb899db54ec3b871a
</Router>
<Footer/>
</>
  )
}
const mapStateToProps =state=>{
  return{
    loggedUser:state.userR.loggedUser
  }
}
const mapDispatchToProps = {
  preserveLog: userActions.preserveLog
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
