import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react'
import '../styles/ListCard.css'


const ListCart = ({shoppingCart})=> {
console.log(shoppingCart)
    return (
        <div className="containerCart">
        {shoppingCart.map(productoCart =>{
            return (
                <div className="containerImgInfo">
                    <div className="productImg" style={{backgroundImage: `url(${productoCart.product.arrayPic[0]})`}}></div>
                    <div>
                        <h4>{productoCart.product.name}</h4>
                        <div className="containerInfo">
                            <button>-</button>
                            <h4>{productoCart.quantity}</h4>
                            <button>+</button>
                            <h4>x</h4>
                            <h4>{productoCart.product.price}</h4>
                            <h4>=</h4>
                            <h4>{productoCart.product.price}</h4>
                        </div>
                    </div>
                </div>
                
            )
            
        })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        shoppingCart:state.shoppingR.shoppingCart
    }
}

export default connect (mapStateToProps,null) (ListCart)