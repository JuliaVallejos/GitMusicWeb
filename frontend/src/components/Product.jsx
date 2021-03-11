import '../styles/Product.css'
import {useState} from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import shoppingCartActions from '../Redux/actions/shoppingCartActions'
import {Alert} from 'rsuite'
import { useHistory } from "react-router-dom";
import { BsFillStarFill } from 'react-icons/bs'

const Product = ({product,addProductShoppingCart,shoppingCart}) =>{

  let history = useHistory();
 const [add,setAdd]= useState(false)
    
 const addProductCart = async(product) =>{
    const filterProductCart = shoppingCart.filter(productF => productF.idProduct === product._id)
    if(filterProductCart.length!==0 && (filterProductCart[0].product.stock<(filterProductCart[0].quantity+1))){
      Alert.warning(`No podes exceder el stock(${filterProductCart[0].product.stock}) de este articulo.`,3000)
    }else{
      Alert.success('Agregado al carrito.',3500)
      const respuesta=await addProductShoppingCart({idProduct:product._id,quantity:1, product})
    }
  }
  if(product) {
       return(
      <div className='productContainer'>
        <Link to={'/product/'+ product._id} className='productPic' style={{backgroundImage:`url(${product.arrayPic[0]})`}}>
            {/* Product Image View */}
          <div class="overlay">
            <div class="lupa"></div>
          </div>
        </Link>
          {/* -- Price View */}
        <div className="cardBottom">
          <div className='productTitle'>
            <h5>{product.name}</h5>
          </div>
          <div className='productPrice'>
            <div className='priceContainer'>
                <h6>{`$${product.price}`}</h6>
                <div onMouseOver={()=>setAdd(true)} onMouseOut={()=>setAdd(false)} onClick={()=>addProductCart(product)} className='iconCart'>
                  <FaShoppingCart/>
                  {/* {add&&<div className='toolTip'><p className='add'>Agregar al carrito</p></div>} */}
              </div>
            </div>
            <div className='addContainer'>{add&&<p className='add'>Agregar al carrito</p>}</div>
           
          </div>
          <div >{[...Array(5)].map((m, i) => {
                            const ratingValue = i + 1
                          
                            return (    
                                    <BsFillStarFill  color={(ratingValue <= product.rating) ? '#ffc107' : '#8C8C8C'} />
                            )
              })}
          </div>
        </div>
      </div>
      
    );     
    }else{
        return(
            <h5>Loading...</h5>
        )
    }
}
const mapStateToProps = state =>{
  return{
      shoppingCart:state.shoppingR.shoppingCart
  }
}
const mapDispatchToProps={
  addProductShoppingCart:shoppingCartActions.addProductShoppingCart
}
export default connect(mapStateToProps,mapDispatchToProps)(Product)