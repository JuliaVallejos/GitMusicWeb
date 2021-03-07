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
   },
   getProduct: (idProduct) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.get(`https://gitmusicapp.herokuapp.com/api/products/${idProduct}`)
        if(response.data.success){  
        dispatch({type: "GET_PRODUCT",payload: response.data.response})
        return response.data.response
        }
      }catch(error){
        return({success: false, response: error})
      }
    }
  },
    addProduct: (fdNewProduct) =>{
      return async (dispatch, getState) =>{
    
      try{
          const response = await axios.post('http://localhost:4000/api/products', fdNewProduct,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          })
          console.log(response)
          if(response.data.success){  
            dispatch({type: "NEW_PRODUCT",payload: response.data.response})}
            return response.data
        }catch(error){
          return({success: false, response: error})
        }
      }
    }
  }
   
 export default productActions