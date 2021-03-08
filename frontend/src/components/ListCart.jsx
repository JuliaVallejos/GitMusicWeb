import { connect } from 'react-redux';
import React from 'react'
import {  useState } from 'react'
import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'
import {Alert,Input} from 'rsuite'
import shoppingCartActions from '../Redux/actions/shoppingCartActions'
import '../styles/ListCard.css'



const ListCart = ({currentPost,editProductCart,deleteProductCart})=> {

    console.log(currentPost)
    const [price, setPrice] = useState()

    // useEffect(() => {
    //         const filterProductPrice = currentPost.filter(productPrice => productPrice.product.price)
    //         setPrice(filterProductPrice[0].product.price)
    //   }, [])

    const manageQuantityForStock=(operation,product)=>{
        const inputProduct=document.querySelector(`#input${product.idProduct}`)
        if(operation==='subtract'){
            if((parseInt(inputProduct.value)-1)<1){
                Alert.warning("Debes tener almenos 1.",3000)
            }else{
                inputProduct.value=parseInt(inputProduct.value)-1
                editProductCart(parseInt(inputProduct.value),product)
                const priceProduct = product.product.price * parseInt(inputProduct.value);
                setPrice(priceProduct)
            }
        }else if(operation==='add'){
            if((parseInt(inputProduct.value)+1)>product.product.stock){
            Alert.warning(`No podes exceder el stock(${product.product.stock}) del articulo.`,3000)
            }else{
                inputProduct.value=parseInt(inputProduct.value)+1
                editProductCart(parseInt(inputProduct.value),product)
                const priceProduct = product.product.price * parseInt(inputProduct.value);
                setPrice(priceProduct)
            }
        }
    }
    const inputModifyQuantity=(value,e,product)=>{
        if(value>product.product.stock){
            Alert.warning(`No podes exceder el stock(${product.product.stock}) del articulo.`,3000)
            e.target.value=product.quantity
        }else if(value<1){
            Alert.warning("Selecciona un numero distinto a 0 ó numeros negativos.",3000)
            e.target.value=product.quantity
        }else{
            editProductCart(parseInt(value),product)
        }
    }

    return (
        <div className="containerCart">
            <div className="containerImgInfo">
                {currentPost.map(product =>{
                    return (
                            <div className="containerProduct">
                                <div className="productImg" style={{backgroundImage: `url(${product.product.arrayPic[0]})`}}></div>
                                    <div className="containerInfo">
                                        <h6>{product.product.name}</h6>
                                        <div className="containerPriceButton">
                                        <FaArrowLeft onClick={(e) =>manageQuantityForStock("subtract",product)} className="bottonManage arrow"/>
                                        <span><Input id={`input${product.idProduct}`} class="quantityValue" onChange={(value,e)=>inputModifyQuantity(value,e,product)} defaultValue={product.quantity}/></span>
                                        <FaArrowRight onClick={(e) =>manageQuantityForStock("add",product)} className="bottonManage arrow"/>
                                        <h6>x</h6>
                                        <h6>${product.product.price}</h6>
                                        <h6>=</h6>
                                        <h6>${price}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
        </div>
        </div>
    )
}


const mapDispatchToProps={
    editProductCart:shoppingCartActions.editProductCart,
    deleteProductCart:shoppingCartActions.deleteProductCart
}

export default connect(null,mapDispatchToProps)(ListCart)
