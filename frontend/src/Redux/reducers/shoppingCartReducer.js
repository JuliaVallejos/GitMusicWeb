const initState = {
  shoppingCart:[]
}

const shoppingCartReducer= (state = initState, action) =>{
    switch(action.type){
      case "SAVE_PRODUCT_CART":
        //localStorage.setItem('shoppingCart', action.payload.shoppingCart)
        return{
          ...state,
          shoppingCart: [
            ...state.shoppingCart,
            action.payload]
        }
      case "ADD_PRODUCT_SHOPPING_CART":
          const {idProduct,quantity}=action.payload
          if(state.shoppingCart.length!==0){
            state.shoppingCart.map(productCart=>{
              if(productCart.idProduct===idProduct){
                productCart.quantity=productCart.quantity+quantity
                localStorage.setItem('shoppingCart', state.shoppingCart)
                return {
                  ...state,
                  shoppingCart:[
                  ...state.shoppingCart,
                  productCart
                ]}
              }
            })
          }else{
            localStorage.setItem('shoppingCart', state.shoppingCart)
            return {
              ...state,
              shoppingCart:[
              ...state.shoppingCart,
              {idProduct,quantity}
            ]}
          }
      default :
          return state
      }
}
export default shoppingCartReducer