import '../styles/DrawerContent.css'
import { useEffect, useState } from 'react'
import { FaRegWindowClose } from 'react-icons/fa'
import { connect } from 'react-redux'

const DrawerContent = ({ shoppingCart}) => {
    console.log(shoppingCart)
    const deleteProduct = id => {
        console.log('Has borrado un producto')
        const filterProduct = shoppingCart.filter(product => product.product.id !== id)
        console.log(filterProduct)
    }

    return (
        <>
            {shoppingCart.length !== 0 ? shoppingCart.map(product => 
                <div className="drawerProductContainer" >
                    <div>
                        <p className="textProduct"><strong>Producto:</strong> {product.product.name}</p>
                        <p className="textProduct"><strong>Marca:</strong> {product.product.mark}</p>
                        <p className="textProduct"><strong>Precio:</strong> {product.product.price}</p>
                    </div>
                    <div className="drawerProductImg" style={{backgroundImage: `url(${product.product.arrayPic[0]})`}}>
                        <FaRegWindowClose onClick={() => deleteProduct(product.product._id)} className="removeDrawerProduct" />
                    </div>
                </div>
            ) :(
                <h4>Aún no tenés productos en el carrito</h4>
            )
            }
       </> 
    )
}
const mapStateToProps = state =>{
    return{
        shoppingCart:state.shoppingR.shoppingCart,
        allProducts: state.product.allProducts,
        loggedUSer: state.userR.loggedUSer

    }
}
export default connect(mapStateToProps)(DrawerContent)