import React, {Component} from 'react'
import '../../node_modules/rsuite/dist/styles/rsuite-default.css';
import '../styles/DrawerContent.css'
import {ButtonToolbar, Drawer, Button} from 'rsuite'
import DrawerContent from './DrawerContent'
import CartIcon from './CartIcon';

class ShowDrawer extends Component {
    constructor(props) {
      super(props);
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
            <CartIcon/>
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
              <Drawer.Title>Shopping Cart</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <DrawerContent closeDrawer={this.close} />
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={this.close} appearance="primary">
                Comprar
              </Button>
              <Button onClick={this.close} appearance="subtle">
                Cerrar
              </Button>
            </Drawer.Footer>
          </Drawer>
        </div>
      );
    }
  }
  
  export default ShowDrawer