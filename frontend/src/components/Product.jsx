import '../styles/Product.css'
import {useState} from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import {connect} from 'react-redux'
import shoppingCartActions from '../Redux/actions/shoppingCartActions'
import { Link } from 'react-router-dom'

const Product = ({product,addProductShoppingCart}) =>{
 const [add,setAdd]= useState(false)
    
 const addProductCart = async() =>{
  alert('Agregado al carrito')
  const respuesta=await addProductShoppingCart({idProduct:product._id,quantity:1, product})
  console.log(respuesta.response)
 }
  if(product) {
       return(
        <div className='productContainer'>
          <Link to={'/product/'+ product._id} className='productPic' style={{backgroundImage:`url(${product.arrayPic[0]})`}}>
             {/* Product Image View */}
            </Link>
            {/* -- Price View */}
            <div className="cardBottom">
              <h4 className='productTitle'>{product.name}</h4>            
            <div className='productPrice'>
                <h6>{`$${product.price}`}</h6>
                <div onMouseOver={()=>setAdd(true)} onMouseOut={()=>setAdd(false)} onClick={addProductCart} className='iconCart'>
                  <FaShoppingCart/>
                  {/* {add&&<div className='toolTip'><p className='add'>Agregar al carrito</p></div>} */}
              </div>
              <div>{add&&<p className='add'>Agregar al carrito</p>}</div>
              
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
const mapDispatchToProps={
  addProductShoppingCart:shoppingCartActions.addProductShoppingCart
}
export default connect(null,mapDispatchToProps)(Product)