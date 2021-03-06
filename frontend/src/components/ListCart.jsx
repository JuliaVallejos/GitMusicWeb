import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { FaTrashAlt, FaShoppingCart,FaArrowCircleDown,FaArrowCircleUp} from 'react-icons/fa'
import '../styles/ListCard.css'
import Pagination from "./Pagination"
import shoppingCartActions from '../Redux/actions/shoppingCartActions'
import {Alert, Button} from 'rsuite'

const ListCart = ({setNext,shoppingCart,editProductCart,deleteProductCart,clearCart})=> {

    useEffect(() => {
       setNext(true)
    }, [])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(3)
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = shoppingCart.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber)
    var total=0
    const deleteProduct = id => {
        const filterProduct = shoppingCart.filter(product => product.idProduct !== id)
        deleteProductCart(id)
    }
    const manageQuantityForStock=(operation,product)=>{
        const inputProduct=document.querySelector(`#act${product.idProduct}`)
        if(operation==='subtract'){
            if((parseInt(inputProduct.innerHTML)-1)<1){
                Alert.warning("Debes tener al menos 1.",3000)
            }else{
                inputProduct.innerHTML=parseInt(inputProduct.innerHTML)-1
                editProductCart(parseInt(inputProduct.innerHTML),product)
            }
        }else if(operation==='add'){
            if((parseInt(inputProduct.innerHTML)+1)>product.product.stock){
            Alert.warning(`No podes exceder el stock(${product.product.stock}) del articulo.`,3000)
            }else{
                inputProduct.innerHTML=parseInt(inputProduct.innerHTML)+1
                editProductCart(parseInt(inputProduct.innerHTML),product)
            }
        }
    }
    return (
        <div className='sectionBody'>
        {shoppingCart.length !== 0 ? 
        <div className="CartAndPagination">
            <div className="containerCart ">
                <div className="containerImgInfo">
                    {currentPost.map(productCart =>{
                      
                        total+=(productCart.quantity*productCart.product.price)
                        const totalPrice=productCart.product.price*productCart.quantity
                        return (
                            <div  key={productCart.idProduct} className="containerProduct">
                                <div className="productImg" style={{backgroundImage: `url(${productCart.product.arrayPic[0]})`}}></div>
                                <div className="containerInfo">
                                    <h6>{productCart.product.name}</h6>
                                    <div className="containerPriceButton">
                                        <FaArrowCircleDown className="arrow less" onClick={(e) =>manageQuantityForStock("subtract",productCart)}/>
                                        <h6 id={`act${productCart.product._id}`}>{productCart.quantity}</h6>
                                        <FaArrowCircleUp className="arrow more" onClick={(e) =>manageQuantityForStock("add",productCart)}/>
                                        <h6>x</h6>
                                        <h6>${productCart.product.price}</h6>
                                        <h6>=</h6>
                                        <h6 style={{color:'rgb(255, 143, 38)'}}>${totalPrice}</h6>
                                    </div>
                                    <div style={{width:'100%',textAlign:'right'}}>
                                    <FaTrashAlt onClick={() => deleteProduct(productCart.idProduct)} className="bottonManage cartTrash"/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div style={{display:'flex',justifyContent:'space-between',width:'70%', alignItems:'center'}}>
                        <Button onClick={clearCart} className="button clearCart" appearance="subtle">
                            Vaciar <FaShoppingCart style={{paddingLeft:'.5vw',fontSize:'30px'}} />
                        </Button>
                        <div style={{fontSize:'16px',fontWeight:'bold',color:'white', backgroundColor:'black', padding:'1vh',borderRadius:'10px'}}>Total: <span style={{color:'rgb(255, 143, 38)',fontWeight:'bold'}}>${total}</span></div>
                    </div>
                </div>
            </div>
            <div className="buttonNav" style={{marginTop:'4vh'}}>
                <Pagination postPerPage={postPerPage} totalPost={shoppingCart.length} paginate={paginate}/>
            </div>
        </div>
        : (
            <div>
                <div className="ProductNone"></div>
            </div>
        )}
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
    deleteProductCart:shoppingCartActions.deleteProductCart,
    clearCart:shoppingCartActions.clearCart
}
export default connect(mapStateToProps,mapDispatchToProps)(ListCart)