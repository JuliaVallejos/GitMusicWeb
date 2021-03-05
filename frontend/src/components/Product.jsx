import '../styles/Product.css'
import {useState} from 'react'
import { FaShoppingCart } from 'react-icons/fa'
const Product = ({product}) =>{
 const [add,setAdd]= useState(false)
    
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

export default Product