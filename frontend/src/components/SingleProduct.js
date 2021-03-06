import React, { useEffect } from 'react'
import { useState } from 'react'
import "../styles/SingleProduct.css"
import { Button, ButtonToolbar } from 'rsuite';
import { connect } from 'react-redux';
import Comment from './Comment';
import { MdSend } from "react-icons/md";
import shoppingCartActions from '../Redux/actions/shoppingCartActions';

const SingleProduct = (props) => {
    const { allProducts, addProductShoppingCart } = props
    const id = props.match.params.id
    
    const [thisProduct, setThisProduct] = useState({})
    const [visible, setVisible] = useState(false)
    const [newComment, setComment] = useState('')
    const [index, setIndex] = useState(0)

    useEffect(()=>{
        console.log(allProducts)
        const product = allProducts.filter(product => product._id === id)
        setThisProduct(product[0])
        console.log(thisProduct)
    },[allProducts, thisProduct])




    if(!thisProduct._id){
        return <h1>Vas a tener q ir a donde hace el fetch</h1>
    }


    const handleComments = (e) => {
        setComment(e.target.value)
      }

      const sendComment = () =>{
          //mando comment
      }
      const enterKey = (e) => {
        if (e.key === 'Enter') {
            //action de mandar nuevo comment
        }
      }

    const addToCart = async ()=>{
        const res = await addProductShoppingCart({idProduct: id,quantity:1, thisProduct})
    }

    return(
        <div className="mainSingleProduct">
     
            <div className="mainSingleContainer">
                <div className="leftSection">
                    {thisProduct.arrayPic.map((pic, i) => {
                    return(
                            <img src={pic} className="lateralPic" alt='' onClick={()=>setIndex(i)}></img> 
                        )}
                    )}
                </div>
                <div className="middleSection">
                    <img src={thisProduct.arrayPic[index]} className="mainPic" alt=""/>
                    <div className="descriptionContainer">
                    <h5>Sobre este producto.</h5>
                        <div className="liDescription">
                            {thisProduct.arrayDescription.map(desc =>{
                                return <p>{desc}</p>
                            })}
                        </div>
                    </div>
                </div>
                <div className="rightSection">
                    <p className="singleProductName">{thisProduct.name}</p>
                    <p className="singleTextBlue">Marca: {thisProduct.mark}</p>
                    <p className="singleTextBlue">Hay {thisProduct.stock} unidades disponibles!</p>
                    <p>Valoración: {Array(3).fill(<i className="fa fa-star"></i>)}</p>
                    <p style={{}}>Garantía de {thisProduct.warranty} meses!</p>
                    <p style={{fontSize: '1.8vw', fontWeight: 'bolder'}}>$ {thisProduct.price}</p>
                    {thisProduct.arrayComments.length !== 0 ? <p className="singleSimpleText cursor" onClick={()=>setVisible(!visible)}>{visible ? 'Ocultar comentarios': 'Ver comentarios'} ({thisProduct.arrayComments.length})</p> : <p className="singleSimpleText">Aún no hay comentarios</p>}
                    {visible &&(
                        <div>
                        <div className="comments">
                            {thisProduct.arrayComments.map(comment => <Comment comment={comment}/>)}
                        </div>
                            <div className="inputDiv">
                                <input type="text" name="content" onKeyDown={enterKey} placeholder={'condicionar el placeholder u ocultar el input'} className="commentInput" onChange={handleComments} value={newComment}  autoComplete="off" />
                                <MdSend className="commentIcon" onClick={sendComment}  />
                            </div>
                        </div>
                    )}
                    <ButtonToolbar className="singleButtons">
                        <Button color="cyan" className="singleButton" block onClick={addToCart}>Añadir al carrito</Button>
                    </ButtonToolbar>
                </div>
            </div> 
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        allProducts: state.product.allProducts,
    }
}
const mapDispatchToProps={
    addProductShoppingCart:shoppingCartActions.addProductShoppingCart
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)