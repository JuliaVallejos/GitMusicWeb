import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../styles/ListCard.css'
import shoppingCartActions from '../Redux/actions/shoppingCartActions'

const ListCart = ({shoppingCart,editProductCart,deleteProductCart})=> {
    return (
        <div className="containerCart">
            <div className="containerImgInfo">
                {shoppingCart.map(productoCart =>{
                    const totalPrice=productoCart.product.price*productoCart.quantity
                    return (
                        <div className="containerProduct">
                            <div className="productImg" style={{backgroundImage: `url(${productoCart.product.arrayPic[0]})`}}></div>
                            <div className="containerInfo">
                                <h6>{productoCart.product.name}</h6>
                                <div className="containerPriceButton">
                                    <button><h6>-</h6></button>
                                    <h6>{productoCart.quantity}</h6>
                                    <button><h6>+</h6></button>
                                    <h6><h6>x</h6></h6>
                                    <h6>{productoCart.product.price}</h6>
                                    <h6>=</h6>
                                    <h6 style={{color:'rgb(65, 235, 22)'}}>${totalPrice}</h6>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="buttonNav">
                <button className="enviar"><NavLink className="navLink" exact to='/' >Salir</NavLink></button>
                <button className="enviar"><NavLink className="navLink" exact to='/shippingAddress' >Confirmar compra</NavLink></button>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        shoppingCart:state.shoppingR.shoppingCart
    }
}
const mapDispatchToProps={
    editProductCart:shoppingCartActions.editProductCart,
    deleteProductCart:shoppingCartActions.deleteProductCart
}
export default connect (mapStateToProps,mapDispatchToProps) (ListCart)