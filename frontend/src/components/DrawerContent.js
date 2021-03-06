import '../styles/DrawerContent.css'
import { useEffect, useState } from 'react'
import { FaRegWindowClose, FaEdit, FaTrashAlt, FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import { connect } from 'react-redux'

const DrawerContent = ({ shoppingCart}) => {
    console.log(shoppingCart)
    const deleteProduct = id => {
        const filterProduct = shoppingCart.filter(product => product.product.id !== id)
    }

    return (
        <>
            {shoppingCart.length !== 0 ? shoppingCart.map(product => 
                <div className="drawerProductContainer" >
                    <div>
                        <p className="textProduct"><strong>Producto:</strong> {product.product.name}</p>
                        <p className="textProduct"><strong>Marca:</strong> {product.product.mark}</p>
                        <p className="textProduct"><strong>Precio:</strong> {product.product.price}</p>
                        <div className="manageProduct">
                            <div className="manageQuantityProduct">
                                <FaArrowLeft onClick={() =>{}} className="bottonManage"/>
                                <span>{product.quantity}</span>
                                <FaArrowRight onClick={() =>{}} className="bottonManage"/>
                            </div>
                            <FaEdit onClick={() =>{}} className="bottonManage"/>
                            <FaTrashAlt onClick={() =>{}} className="bottonManage"/>
                        </div>
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
        loggedUser: state.userR.loggedUser
    }
}
export default connect(mapStateToProps)(DrawerContent)