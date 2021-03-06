import axios from 'axios'
import {Alert} from 'rsuite'

const userActions = {
    signUp: (fdNewUser) =>{
     return async (dispatch, getState) =>{
       try{
        const response = await axios.post('https://gitmusicapp.herokuapp.com/api/user/signup', fdNewUser,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
         if(response.data.success===false){  
           var errors=[]
           response.data.errores && response.data.errores.details.map(error=>{
             switch (error.path[0]) {
               case 'firstName':
                 errors.push({label:error.context.label,message:"El nombre debe tener minimo 2 caracteres."})
                 break;
               case 'lastName':
                 errors.push({label:error.context.label,message:"El apellido debe tener minimo 2 caracteres."})
                 break;
               case 'email':
                 errors.push({label:error.context.label,message:"El correo tiene que contener un arroba y un dominio como minimo."})
                 break;
               case 'password':
                 errors.push({label:error.context.label,message:"La contraseña debe tener al menos 6 a 8 caracteres y una mayuscula y una minuscula."})
                 break;
               case 'country':
                 errors.push({label:error.context.label,message:"Debes seleccionar algun país."})
                 break;
                default:
                return false
             }
             return false
           })
         }
         dispatch({
           type: "USER_LOG",
           payload: response.data.response
         })
         Alert.success('Tu cuenta fue creada con éxito')
       }catch(err){
         return({success: false, response: errors})
       }
     }
   },  
   googleSignUp: (newUser) =>{
     return async (dispatch, getState) =>{
       try{
         const response = await axios.post('https://gitmusicapp.herokuapp.com/api/user/signup', newUser)
         if(response.data.success===false){
           var errors=[]
           response.data.errores && response.data.errores.details.map(error=>{
             switch (error.path[0]) {
               case 'firtsName':
                 errors.push({label:error.context.label,message:"El nombre debe tener minimo 2 caracteres."})
                 break;
               case 'lastName':
                 errors.push({label:error.context.label,message:"El apellido debe tener minimo 2 caracteres."})
                 break;
               case 'email':
                 errors.push({label:error.context.label,message:"El correo tiene que contener un arroba y un dominio como minimo."})
                 break;
               case 'password':
                 errors.push({label:error.context.label,message:"La contraseña debe tener al menos 6 a 8 caracteres y una mayuscula y una minuscula."})
                 break;
               case 'country':
                 errors.push({label:error.context.label,message:"Debes seleccionar algun país."})
                 break;
              case 'useremailExist':
                  errors.push({label:error.context.label,message:"La derección de mail ya está registrada"})
                 break;
                default:
                return false
             }
             return false
           })
         }
         dispatch({
           type: "USER_LOG",
           payload: response.data.response
         })
         return ({success:true,response:["Tu cuenta fue creada con éxito!"]})
       }catch(err){
         Alert.error('Uy! Algo salió mal!')
       }
     }
   },    

   signOut: () =>{
     return async (dispatch, getState) =>{
       dispatch({
         type: "SIGN_OUT",
       })
       Alert.success('Nos vemos pronto!')
     }
   },
  preserveLog: (token) =>{
    const idUser=localStorage.getItem('idUser')
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('https://gitmusicapp.herokuapp.com/api/user/ls', {token,idUser}, {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
          dispatch({
            type: "USER_LOG",
            payload: response.data.response
          })
      }
      catch(error){
        // if(error.response.status === 401){
        //   localStorage.clear()
        //   return false
        // }
      }
    }
  },
  logIn: (user) => {
       return async (dispatch, getState) => {
           const respuesta = await axios.post('https://gitmusicapp.herokuapp.com/api/user/login',user)
           if (!respuesta.data.success) {
             
               return respuesta.data
           }
           dispatch({type:'USER_LOG', payload: respuesta.data.response})
           Alert.success("Hola " + respuesta.data.response.firstName + '!')
       }
   },


   modifyUser: (formData) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(`https://gitmusicapp.herokuapp.com/api/userDetails`, formData, {
            headers: { 
                'Content-Type': 'multipart/form-data' 
            }
        })
        dispatch({type: 'MODIFY_USER', payload: response.data.response})
        return({success:true})
      } catch (error) {
        return({success:false,response:error})
      }
    }
},
    completeUserData:(property,newData) =>{
     
      return async (dispatch, getState) => {
        
        dispatch({type: 'ADD_DATA', payload: {property,newData}})
        const data ={saved:true}
        return data
      }
    },
     requestResetPass:(email) => {   
         return async (dispatch, getState) => {
     try{
       const respuesta = await axios.post('https://gitmusicapp.herokuapp.com/api/user/requestresetpass',{email})
       if (!respuesta.data.success) {
           Alert.error(`${respuesta.data.response}`,5000)
           return respuesta
        }else{
         Alert.success(`${respuesta.data.response}`,5000)
         return respuesta
       }
    }catch(error){
      Alert.error('Ups! Algo pasó,intente nuevamente más tarde')
      return error
    }
     }      
       
   },
    validateResetPassword:(newPasswordData) => {
      return async (dispatch, getState) => {
        const respuesta = await axios.post('https://gitmusicapp.herokuapp.com/api/user/resetpassword', newPasswordData)
        if (!respuesta.data.success) {
          Alert.error(`${respuesta.data.response}`,5000)
        }else{
          Alert.success(`${respuesta.data.response}`,5000)
          return true
        }
       
      }
    },
    validateResetUser:(token) => {
      return async (dispatch, getState) => {
        const respuesta = await axios.post('https://gitmusicapp.herokuapp.com/api/user/requestresetuser', {token})
       
        if (respuesta.data.success===false){
          return respuesta.data
        }else{
         return respuesta.data
       }      
      }
   },
 }
 
 export default userActions