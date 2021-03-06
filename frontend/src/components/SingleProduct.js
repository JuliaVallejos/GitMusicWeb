import React from 'react'
import { useState } from 'react'
import "../styles/SingleProduct.css"
import { AiOutlineHeart } from 'react-icons/ai'
import { Button, ButtonToolbar } from 'rsuite';

const SingleProduct = () => {
    const [products] = useState([
        {name: "Paquete de guitarra acústica Music Alley MA-34-PNK",
        warranty: 12, arrayPic: ["https://i.ibb.co/MSD89TS/guitarra1.jpg", "https://i.ibb.co/fQR6rcq/guitarra3.jpg", "https://i.ibb.co/b7wVGjt/guitarra2.jpg"], mark: "Music Alley", arrayDescription: ["soy una buena guitarra", "comprame vo"], price: 8300, stock: 6, arrayRating: [{value: 5}], arrayVisits:[{visits: 100}], arrayComments:["hola, me gustan las guitarras", "hola, me gustan las guitarras", "hola, me gustan las guitarras"]}
    ])

    return(
        <div className="mainSingleProduct">
            {products.map(product =>
            <div className="mainSingleContainer">
                <div className="leftSection">
                    {product.arrayPic.map(pic => {
                    return(
                            <img src={pic} className="lateralPic"></img> 
                        )}
                    )}
                </div>
                <div className="middleSection">
                    <img src={product.arrayPic[0]} className="mainPic" ></img>
                </div>
                <div className="rightSection">
                    <p className="singleProductName">{product.name}</p>
                    <AiOutlineHeart className="singleHeart" />
                    <p className="singleTextBlue">Marca: {product.mark}</p>
                    <p className="singleTextBlue">Hay {product.stock} unidades disponibles!</p>
                    <p>Valoración: {Array(product.arrayRating[0].value).fill(<i className="fa fa-star"></i>)}</p>
                    <p style={{}}>Garantía de {product.warranty} meses!</p>
                    <p style={{fontSize: '1.8vw', fontWeight: 'bolder'}}>$ {product.price}</p>
                    {product.arrayComments.length <= 1 ? <p className="singleSimpleText">Hay {product.arrayComments.length} comentario disponible</p>
                     : <p className="singleSimpleText">Hay {product.arrayComments.length} comentarios disponibles! </p>}
                    <h5>Sobre este producto.</h5>
                    <div className="descriptionContainer">
                        <div className="liDescription">
                            <p>{product.arrayDescription}</p>
                        </div>
                    </div>
                    <ButtonToolbar className="singleButtons">
                        <Button color="cyan" className="singleButton" block >Añadir al carrito</Button>
                        <Button color="blue" className="singleButton" block>Comprar</Button>
                    </ButtonToolbar>
                </div>
            </div> 
                )}
        </div>
    )
}

export default SingleProduct