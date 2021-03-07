import React, {Component} from 'react'
import '../../node_modules/rsuite/dist/styles/rsuite-default.css';
import '../styles/DrawerContent.css'
import {ButtonToolbar, Drawer, Button} from 'rsuite'
import DrawerContent from './DrawerContent'
import CartIcon from './CartIcon';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

class ShowDrawer extends Component {
  constructor() {
    super();
    this.state = {
      size: 'xs',
      show: false
    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
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
    
    const { size, placement, show } = this.state;
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
              <h4 style={{textAlign: 'center'}}>Shopping Cart</h4>
            </Drawer.Header>
            <Drawer.Body>
              <DrawerContent/>
            </Drawer.Body>
            <Drawer.Footer>
              <Link onClick={this.goToCart} appearance="primary" to='/cartlist'>
                Comprar
              </Link>
              <Button onClick={this.close} appearance="subtle">
                Cerrar
              </Button>
            </Drawer.Footer>
          </Drawer>
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    return {
        allProducts: state.product.allProducts,
        shoppingCart:state.shoppingR.shoppingCart
    }
}
  
  export default connect(mapStateToProps)(ShowDrawer)