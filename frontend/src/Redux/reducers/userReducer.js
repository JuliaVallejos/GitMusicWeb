const initState = {
    loggedUser: null,
    userData:[
      {property:'address',newData:{
        calle:'',
        altura:'',
        encargadoDeRecibir:'',
        contactoReceptor:''
      }},
      {property:'billingAddress',newData:{
        nombre:'',
        cuitCuilDni:'',
        contacto:'',
        tipoFactura:''

      }},
      {property:'cardFields',newData:{

      }}]
  }
  
  const userReducer = (state = initState, action) =>{
      switch(action.type){
        case "USER_LOG":
          localStorage.setItem('token', action.payload.token)
          localStorage.setItem('firstName', action.payload.firstName)
          localStorage.setItem('pic', action.payload.pic)
          localStorage.setItem('userId', action.payload.userId)
          return{
            ...state,
            loggedUser: action.payload
          }
        case "SIGN_OUT":
          localStorage.removeItem('token')
          localStorage.removeItem('firstName')
          localStorage.removeItem('pic')
          localStorage.removeItem('userId')
          return{
            ...state,
            loggedUser: null
          }
          case "ADD_DATA":
           const newData = state.userData.filter(field => field.property!== action.payload.property)
           return{
             ...state,
            userData:[...newData,action.payload]
           } 

        default :
            return state
        }
  }
  export default userReducer