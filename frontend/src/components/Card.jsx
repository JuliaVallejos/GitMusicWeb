import React from 'react'
import '../styles/Card.css'
import { BsFillStarFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import shoppingCartActions from '../Redux/actions/shoppingCartActions'
import {Alert} from 'rsuite'
import {connect} from 'react-redux'

const Card = ({ product,addProductShoppingCart,shoppingCart }) => {
  const addToCart = async (product) => {
    alert('Agregaste al carrito un ' + product.name)
    const filterProductCart = shoppingCart.filter(productF => productF.idProduct === product._id)
    if(filterProductCart.length!==0 && (filterProductCart[0].product.stock<(filterProductCart[0].quantity+1))){
      Alert.warning(`No podes exceder el stock(${filterProductCart[0].product.stock}) de este articulo.`,3000)
    }else{
      Alert.success('Agregado al carrito.',3500)
      const respuesta=await addProductShoppingCart({idProduct:product._id,quantity:1, product})
    }  
  }

  return (
    <div className="containerCard">
      <div className="product-details">
        <h1>{product.name}</h1>
        <span className="hint-star star">
          <BsFillStarFill className='startIcon'/>
          <BsFillStarFill />
          <BsFillStarFill />
        </span>
        <p className="information">Perfecto para tu home-studio!</p>
        <div className="control"  onClick={()=>addToCart(product)}>
          <button className="btnCard">
            <span className="price">${product.price}</span>
            <span className="shopping-cart"><FaCartPlus /></span>
            <span className="buy">Agregar al carrito!</span>
          </button>
        </div>
      </div>
      <div className="product-image">
        <img src={product.arrayPic[0]} alt="" />
        {/* <div className="info">
          <h2>Descripción</h2>
          <ul>
            <li>69 teclas</li>
            <li>USB y pedal de sustain</li>
            <li>Compatible contodos los DAW</li>
            <li>Software Arturia incluido</li>
          </ul>
        </div> */}
      </div>
    </div>
  )
}
const mapStateToProps = state =>{
  return{
      shoppingCart:state.shoppingR.shoppingCart
  }
}
const mapDispatchToProps={
  addProductShoppingCart:shoppingCartActions.addProductShoppingCart
}
export default connect(mapStateToProps,mapDispatchToProps)(Card)

