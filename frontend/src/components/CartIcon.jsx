import React from 'react'
import '../styles/CartIcon.css'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const CartIcon = () => {
  return (
    <Link >
      <div className="cartLink">
        <div className='cartContainer'>
          <FaShoppingCart className='cartIcon' />
        </div>
        <small className="quantity">0</small>
      </div>
    </Link>
  )
}

export default CartIcon
