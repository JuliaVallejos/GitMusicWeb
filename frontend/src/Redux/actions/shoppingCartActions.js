import axios from 'axios'
import {Alert} from 'rsuite'
import Product from '../../components/Product'

const shoppingCartActions={
  addShoppingCart:(shoppingCart)=>{
    return async (dispatch, getState)=>{
      try {
        const response= await axios.post('http://localhost:4000/api/products/shoppingcart',shoppingCart)
        if(response){
          console.log("Se guardo correctamente")
        }else{
          console.log("error al guardar")
        }
        dispatch({
          type: "SHOPPING_SAVE",
          payload: response.data.response
        })
      } catch (error) {
        
      }
    }
  },
  addProductShoppingCart:(product)=>{
    return (dispatch,getState)=>{
      dispatch({
        type: "ADD_PRODUCT_SHOPPING_CART",
        payload:product
      })
    }
  }
}
export default shoppingCartActions