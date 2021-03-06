import React from 'react'
import { useState } from 'react'
import "../styles/SingleProduct.css"

const SingleProduct = () => {
    const [products] = useState([
        {name: "Paquete de guitarra acústica Music Alley MA-34-PNK",
        warranty: 12, arrayPic: ["https://i.ibb.co/MSD89TS/guitarra1.jpg", "https://i.ibb.co/fQR6rcq/guitarra3.jpg", "https://i.ibb.co/b7wVGjt/guitarra2.jpg"], mark: "Music Alley", arrayDescription: ["soy una buena guitarra", "comprame vo"], price: 8300, stock: 6, arrayRating: [{value: 5}], arrayVisits:[{visits: 100}], arrayComments:["hola, me gustan las guitarras"]}
    ])
    return(
        <div className="mainSingleProduct">
            <div className="lateralSection">
                {products.map(product => 
                    product.arrayPic.map(pic => {
                        return(
                            <div className="lateralColumn">
                                <img src={pic} className="lateralPic" alt=""></img>
                            </div>
                        )
                    })
                )}
            </div>
            <div className="middleSection">
                {products.map(product => {
                    return(
                            <div style={{backgroundImage:`url(${product.arrayPic[0]})`}} className="mainPic">
                            </div>
                    )
                })}
            </div>
            <div className="rightSection">
                {products.map(product => {
                    return(
                            <div className="infoProductContainer">
                                <p>{product.name}</p>
                                <p>{product.mark}</p>
                                <p>{product.stock}</p> 
                            </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SingleProduct