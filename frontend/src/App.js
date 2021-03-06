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
import AddProducts from './components/AddProducts'
import SingleProduct from '../src/components/SingleProduct'
import ShippingAddress from './components/ShippingAddress'
import BillingAddress from './components/BillingAddress'
import Payment from './components/Payment'
import PaymentPanel from './components/PaymentPanel'

function App(props) {
  console.log(props.loggedUser)
  if(props.loggedUser){
    var links =
    <>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/products/:category' component={ProductsByCategory}/>
        <Route path='/userdetails'component={UserDetails}/>
        <Route path='/shippingAddress'component={ShippingAddress}/>
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
          <Route path='/products/:category' component={ProductsByCategory}/>
          <Route path='/registerUser' component={RegisterUser}/>
          <Route path='/addProducts' component={AddProducts}/>
          <Route path='/singleproduct' component={SingleProduct}/>
          <Route path='/shippingAddress'component={ShippingAddress}/>
          <Route path='/billingAddress'component={BillingAddress}/>
          <Route path='/payment'component={Payment}/>
          <Route path='/paymentPanel'component={PaymentPanel}/>
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
  preserveLog: userActions.preserveLog
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
