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
      console.log("action")
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
    },
    commentProduct: newComment =>{
      const {comment, idProduct, idUser} = newComment
      return async(dispatch, getState) =>{
        try{
        const response = await axios.put(`https://gitmusicapp.herokuapp.com/api/products/newcomment`, {comment, idUser, idProduct})

        dispatch({type: 'COMMENT_OPTIONS', payload: response.data.response })
        }catch(error){
          return({success:false, response: error})
        }
      }
    },
    delComment: del => {
      const {idProduct, idComment} = del
      return async (dispatch,getState) => {
        try{
        const response = await axios.put(`https://gitmusicapp.herokuapp.com/api/products/delcomment`,
        {idProduct, idComment})
        dispatch({type: 'COMMENT_OPTIONS', payload: response.data.response})
      } catch(error){
        return({success: false, response: error})
      }
      }
    },
    updateComment: update => {
      console.log(update)
      const {idComment, comment} = update
      return async (dispatch, getState) => {
        try{
          const response = await axios.put(`https://gitmusicapp.herokuapp.com/api/products/editcomment`,
          {idComment, comment})
    
          dispatch({type: 'COMMENT_OPTIONS', payload: response.data.response})
        }catch(error){
        
          return({success: false, response: error})
        }
      }
    },
    ratingProduct : (ratingObject) => {
      return async (dispatch,getstate) =>{
        try{
          const respuesta = await axios.put(`https://gitmusicapp.herokuapp.com/api/products/newrating`,{ratingObject})
          dispatch({
            type:"RATING",
            payload: respuesta.data
          })
        }catch (error){
          return({succes:false, response:error})
        }
      }
    }
  }
   
 export default productActions