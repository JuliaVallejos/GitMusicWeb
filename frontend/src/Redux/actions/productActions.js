import axios from 'axios'

const productActions = {
    allProducts: () =>{
     return async (dispatch, getState) =>{
       try{
         const response = await axios.get('http://localhost:4000/api/products')
         if(response.data.success){  
         dispatch({type: "ALL_PRODUCTS",payload: response.data.response})
         return response.data.response
         }
          
       }catch(err){
         return({success: false, response: errors})
       }
     }
   }
  }
   
 export default productActions