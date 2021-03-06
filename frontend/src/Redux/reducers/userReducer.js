const initState = {
    loggedUser: null,
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
        default :
            return state
        }
  }
  export default userReducer