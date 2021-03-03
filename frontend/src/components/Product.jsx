import '../styles/Product.css'

const Product = ({product}) =>{

    
  if(product) {
       return(
        <div className='productContainer'>
            <div>
              <h4 className='productTitle'>{product.name}</h4>
            </div>
             {/* Product Image View */}
            <div className='productPic' style={{backgroundImage:`url(${product.arrayPic[0]})`}}>
            </div>
            {/* -- Price View */}
            <div>
              <h4>{`$${product.price}`}</h4>
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