import '../styles/Product.css'
import {useState} from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import {connect} from 'react-redux'
import shoppingCartActions from '../Redux/actions/shoppingCartActions'

const Product = ({product,addProductShoppingCart}) =>{
 const [add,setAdd]= useState(false)
    
 const addProductCart = () =>{
  alert('Agregado al carrito')
  addProductShoppingCart({idProduct:product._id,quantity:1})
 }
  if(product) {
       return(
        <div className='productContainer'>
             {/* Product Image View */}
            <div className='productPic' style={{backgroundImage:`url(${product.arrayPic[0]})`}}>
            </div>
            {/* -- Price View */}
            <div className="cardBottom">
              <h4 className='productTitle'>{product.name}</h4>            
            <div className='productPrice'>
                <h6>{`$${product.price}`}</h6>
                <div onMouseOver={()=>setAdd(true)} onMouseOut={()=>setAdd(false)} onClick={()=> alert('Agregado al carrito')} className='iconCart'>
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