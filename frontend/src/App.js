import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import {connect} from 'react-redux'
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ShowDrawer from './components/ShowDrawer'
import RegisterUser from './components/RegisterUser'
import ProductsByCategory from './components/ProductsByCategory'
import userActions from './Redux/actions/userActions'
import UserDetails from './components/UserDetails'
import shoppingCartActions from './Redux/actions/shoppingCartActions';

function App(props) {
  console.log(props.loggedUser)
  if(props.loggedUser){
    if(localStorage.getItem('shoppingCart')){
      props.preservedShoppingCart(localStorage.getItem('shoppingCart'))
    }
    var links =
    <>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/products/:category' component={ProductsByCategory}/>
        <Route path='/userdetails'component={UserDetails}/>
        <Redirect to ="/"/>
      </Switch>
    </>
  }else if(localStorage.getItem('token')){
    props.preserveLog(localStorage.getItem('token'))
  }else{
    if(localStorage.getItem('shoppingCart')){
      props.preservedShoppingCart(localStorage.getItem('shoppingCart'))
    }
     links =
    <>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/products/:category' component={ProductsByCategory}/>
          <Route path='/registerUser' component={RegisterUser}/>
          <Redirect to="/"/>
        </Switch>
    </>
  }
  return (
<>
<Router>
<NavBar/>
<ShowDrawer />
  {links}
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
  preserveLog: userActions.preserveLog,
  preservedShoppingCart:shoppingCartActions.preservedShoppingCart

}
export default connect(mapStateToProps, mapDispatchToProps)(App);
