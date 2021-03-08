import React, { useEffect } from 'react'
import { useState } from 'react'
import "../styles/SingleProduct.css"
import { Alert, Button, ButtonToolbar } from 'rsuite';
import { connect } from 'react-redux';
import Comment from './Comment';
import { MdSend } from "react-icons/md";
import shoppingCartActions from '../Redux/actions/shoppingCartActions';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillStarFill } from 'react-icons/bs'

const SingleProduct = (props) => {
    const { allProducts, addProductShoppingCart, shoppingCart } = props
    const id = props.match.params.id
    const [thisProduct, setThisProduct] = useState([])
    const [visible, setVisible] = useState(false)
    const [newComment, setComment] = useState('')
    const [index, setIndex] = useState(0)
    const [quantity, setquantity] = useState(1)
    const [rating, setRating] = useState(0)

    useEffect(()=>{
        const product = allProducts.filter(product => product._id === id)
        setThisProduct(product[0])
        if(thisProduct._id && thisProduct.arrayRating.length !== 0){
            const stars = Math.round(thisProduct.arrayRating.reduce((a, b) => (a.value + b.value)) / thisProduct.arrayRating.length)
            setRating(stars)
        } 
    },[allProducts, thisProduct, id])  

    const setNumber = (e) =>{
        const number = parseInt(e.target.value)
        setquantity(number)
        if(e.target.value > thisProduct.stock){
            setquantity(thisProduct.stock)
            Alert.error('El número de unidades no puede superar al stock')
        }
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
        const filterProductCart = shoppingCart.filter(product => product.idProduct === thisProduct._id)
        if(filterProductCart.length!==0 && (filterProductCart[0].product.stock<filterProductCart[0].quantity+1)){
          Alert.warning(`No podes exceder el stock(${thisProduct.stock}) de este articulo.`,3000)
        }else{
          Alert.success('Agregado al carrito.',3500)
          addProductShoppingCart({idProduct: id,quantity, product:thisProduct})
        }
    }
    const rankProduct = (e) => {
        setRating(e.target.value)
        Alert.success('Calificaste con ' + e.target.value + ' estrellas!', 4000)
    }
    if(!thisProduct){
        return <h1>Vas a tener q ir a donde hace el fetch</h1>
    }

    if(thisProduct.length!==0){
    return(
        <div className="mainSingleProduct">
     
            <div className="mainSingleContainer">
                <div className="leftSection">
                    {thisProduct.arrayPic.map((pic, i) => {
                    return(
                            <div className="lateralPic" onClick={()=>setIndex(i)} style={{width: '12vh', height: '12vh',backgroundImage: `url(${pic})`, backgroundPosition:'center', backgroundSize:'cover', borderRadius: '8px' }}>
                                {/* <img src={pic} className="lateralPic" alt='' onClick={()=>setIndex(i)}></img>  */}
                                 </div>
                        )}
                    )}
                </div>
                <div className="middleSection">
                    <div style={{width: '100%', height: '50vh',backgroundImage: `url(${thisProduct.arrayPic[index]})`, backgroundPosition:'center', backgroundSize:'cover', borderRadius: '8px' }}></div>
                    <div className="descriptionContainer">
                    <h5>Sobre este producto:</h5>
                        <div className="liDescription">
                            {thisProduct.arrayDescription.map(desc =>{
                                return <p className='description'><AiOutlineCheckCircle className='descriptionItem'/>AiOutlineCheckCircle{desc}</p>
                            })}
                        </div>
                    </div>
                    {thisProduct.urlReview &&
                    <div className="video-responsive">
                            <iframe
                            width="853"
                            height="480"
                            src={thisProduct.urlReview}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                            />
                        </div>
                    }
                </div>
                <div className="rightSection">
                    <p className="singleProductName">{thisProduct.name}</p>
                    <p className="singleTextBlue">Marca: {thisProduct.mark}</p>
                    <p className="singleTextBlue">Hay {thisProduct.stock} unidades disponibles!</p>
                    <p>Valoración:</p>
                    <div>{[...Array(5)].map((m, i) => {
                                const ratingValue = i + 1
                                return (
                                    <label key={i}>
                                        <input
                                            className="starInput"
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={rankProduct}
                                        />
                                        <BsFillStarFill className="star" color={(ratingValue <= rating) ? '#ffc107' : '#8C8C8C'} />
                                    </label>
                                )
                            })}</div>
                    <p style={{}}>Garantía de {thisProduct.warranty} meses!</p>
                    <p style={{fontSize: '2vw', fontWeight: 'bolder' , color:'rgb(20 170 52)'}}>$ {thisProduct.price}</p>
                    <div className='numberInput'>
                        <input type='number'className='number' min='1' onChange={setNumber} value={quantity}/>
                    </div>
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
    )}else{
        return(<h1>loading</h1>)
    }
}
const mapStateToProps = state =>{
    return{
        allProducts: state.product.allProducts,
        shoppingCart:state.shoppingR.shoppingCart
    }
}
const mapDispatchToProps={
    addProductShoppingCart:shoppingCartActions.addProductShoppingCart
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)