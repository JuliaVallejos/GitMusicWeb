import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'

const CartList = (props)=> {
    console.log(props)

    return (
        <p>hola</p>
    )

}

const mapStateToProps = state =>{
    return{
        shoppingCart:state.shoppingR.shoppingCart
    }
}

export default connect (mapStateToProps) (CartList)