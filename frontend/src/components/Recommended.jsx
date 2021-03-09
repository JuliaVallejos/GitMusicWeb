import React, { useState } from 'react'
import Card from './Card'
import {connect} from 'react-redux'
import '../styles/Card.css'

const Recommended = ({allProducts}) => {

  return (
    <div className='productSection'>
      <h2>Productos en Oferta!</h2>
      <h4>Aprovecha nuestros productos recomendados!</h4>
      <div className='cardContainer'>
        {allProducts.map((product, i) => {
          
          return (
            product.outstanding === true && 
              <Card key={i} product={product} />
                )
            })}
            </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    allProducts: state.product.allProducts,
  }
}

export default connect(mapStateToProps, null)(Recommended)

