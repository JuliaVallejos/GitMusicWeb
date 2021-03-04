import axios from 'axios'

const productActions = {
    getProducts: () =>{
     return async (dispatch, getState) =>{
       try{
         const response = await axios.get('https://gitmusicapp.herokuapp.com/api/products')
         if(response.data.success){  
         dispatch({type: "ALL_PRODUCTS",payload: response.data.response})
         return response.data.response
         }
          
       }catch(error){
         return({success: false, response: error})
       }
     }
   }
  }
   
 export default productActions