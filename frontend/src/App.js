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
import shoppingCartActions from './Redux/actions/shoppingCartActions';
import ShippingAddress from './components/ShippingAddress'
import BillingAddress from './components/BillingAddress'
import Payment from './components/Payment'
import PaymentPanel from './components/PaymentPanel'
import ListCart from './components/ListCart'

function App(props) {
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
        <Route path='/shippingAddress'component={ShippingAddress}/>
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
          <Route path='/addProducts' component={AddProducts}/>
          <Route path='/product/:id' component={SingleProduct}/>
          <Route path='/shippingAddress'component={ShippingAddress}/>
          <Route path='/billingAddress'component={BillingAddress}/>
          <Route path='/payment'component={Payment}/>
          <Route path='/paymentPanel'component={PaymentPanel}/>
          <Route path='/listCart'component={ListCart}/>
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
