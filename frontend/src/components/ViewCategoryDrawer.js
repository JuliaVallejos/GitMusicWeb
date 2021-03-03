import React, { Component } from 'react'
import '../../node_modules/rsuite/dist/styles/rsuite-default.css';
import { FaBars } from 'react-icons/fa'
import {ButtonToolbar, Drawer, Button} from 'rsuite'
import CategoryDrawer from './CategoryDrawer'

class ViewCategoryDrawer extends Component {
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
        <div>
          <ButtonToolbar>
            <div node="button" onClick={() => this.toggleDrawer('left')} >
            <FaBars style={{marginLeft: '1.2vw', height: '4vh'}} />
            </div>
          </ButtonToolbar>  
          <Drawer
            size={size}
            placement={placement}
            show={show}
            onHide={this.close}
          >
            <Drawer.Header>
              <h4 style={{textAlign: 'center'}}>Explorar</h4>
            </Drawer.Header>
            <Drawer.Body>
                <CategoryDrawer />
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={this.close} appearance="subtle">
                Cerrar
              </Button>
            </Drawer.Footer>
          </Drawer>
        </div>
      );
    }
  }
  
export default ViewCategoryDrawer;