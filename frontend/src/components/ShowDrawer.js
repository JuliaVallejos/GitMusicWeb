import React, {Component} from 'react'
import '../../node_modules/rsuite/dist/styles/rsuite-default.css';
import '../styles/DrawerContent.css'
import '../styles/DrawerCart.css'
import {ButtonToolbar, Drawer, Button, Alert} from 'rsuite'
import DrawerContent from './DrawerContent'
import CartIcon from './CartIcon';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import shoppingCartActions from '../Redux/actions/shoppingCartActions'
import {FaShoppingCart} from 'react-icons/fa'

class ShowDrawer extends Component {
    state = {
      size: 'sm',
      show: false
    };
    close = this.close.bind(this);
    toggleDrawer = this.toggleDrawer.bind(this);
  close() {
    this.setState({
      show: false
    });
  }
  toggleDrawer(placement) {
    this.setState({
      placement,
      show: true
    });
  }
  render() {
  const goToCart =()=>{
      if(!this.props.loggedUser){
        Alert.error('Debes iniciar sesión para terminar tu compra')
      }else{
        this.close()
      }
    }
    const { size, placement, show } = this.state;
    var total=0
    return (
        <div >
          <ButtonToolbar>
            <div node="button" onClick={() => this.toggleDrawer('right')} >
            <CartIcon />
            </div>
          </ButtonToolbar>  
          <Drawer
            size={size}
            placement={placement}
            show={show}
            onHide={this.close}
            className="showDrawerContainer"
          >
            <Drawer.Header>
              <h4>Mi carrito</h4>
            </Drawer.Header>
            <Drawer.Body>
              <DrawerContent/>
            </Drawer.Body>
            <Drawer.Footer>
              <div className="footerShoppingCart">
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'70%'}}>
                  {
                    this.props.shoppingCart.length!==0 && this.props.shoppingCart.map((product)=>{
                      total+=(product.quantity*product.product.price)
                    })
                  }
                  <Button onClick={this.props.clearCart} className="button clearCart" appearance="subtle">
                  Vaciar <FaShoppingCart style={{paddingLeft:'.5vw',fontSize:'30px'}} />
                  </Button>
                  <span className="totalCart">Total:<span className="totalPrice">${total}</span></span>
                </div>
                <div>
                  <Link onClick={goToCart} to='/paymentPanel'>
                    <Button className="button success" appearance="primary">Comprar</Button>
                  </Link>
                </div>
              </div>
            </Drawer.Footer>
          </Drawer>
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    return {
        allProducts: state.product.allProducts,
        shoppingCart:state.shoppingR.shoppingCart,
        loggedUser: state.userR.loggedUser
    }
}
const mapDispatchToProps={
  clearCart:shoppingCartActions.clearCart
} 
  export default connect(mapStateToProps,mapDispatchToProps)(ShowDrawer)