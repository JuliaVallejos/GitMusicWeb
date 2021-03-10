import React, { useEffect, useState } from 'react'
import '../styles/CartIcon.css'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const CartIcon = ({shoppingCart}) => {
const [items, setItems] = useState(0)
  useEffect(()=>{
    setItems(shoppingCart.length)
  },[shoppingCart])
  
  return (
    <Link to='#'>
      <div className="cartLink">
        <div className='cartContainer'>
          <FaShoppingCart className='cartIcon' />
        </div>
        <small className="quantity">{items}</small>
      </div>
    </Link>
  )
}
const mapStateToProps = state =>{
  return{
      shoppingCart:state.shoppingR.shoppingCart,
      allProducts: state.product.allProducts,
      loggedUSer: state.userR.loggedUSer

  }
}
export default connect(mapStateToProps)(CartIcon)
