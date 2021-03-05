import axios from 'axios'
import {Alert, Checkbox} from 'rsuite'
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
        return ({success:false,error:"error"})
      }
      return ({success:true,response:"success"})
    }
  },
  addProductShoppingCart:(product)=>{
    return(dispatch,getState)=>{
      try {
      dispatch({
        type: "ADD_PRODUCT_SHOPPING_CART",
        payload:product
      })
      return ({success:true,response:"ya pase la action de añadir"})
      } catch (error) {
        return ({success:false,error:error})
      }
      }
  },
  preservedShoppingCart:(shoppingCart)=>{
      return(dispatch,getState)=>{
        try {
          dispatch({
            type: "PRESERVED_SHOPPING_CART",
            payload:JSON.parse(shoppingCart)
          })
          return ({success:true,response:"success"})
        } catch (error) {
          return ({success:false,error:"error"})
        }
    }
  }
}
export default shoppingCartActions