import React from 'react'
import '../styles/Card.css'
import { BsFillStarFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";

const Card = ({ product }) => {

  const addToCart = () => {
    alert('Agregaste al carrito un ' + product.name)
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
        <div className="control" onClick={addToCart}>
          <button className="btnCard">
            <span className="price">${product.price}</span>
            <span className="shopping-cart"><FaCartPlus /></span>
            <span className="buy">Agregar al carrito!</span>
          </button>
        </div>
      </div>
      <div className="product-image">
        <img src={product.pic} alt="" />
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

export default Card
