const initState = {
  shoppingCart:[]
}

const shoppingCartReducer= (state = initState, action) =>{
    switch(action.type){
      case "SAVE_PRODUCT_CART":{
        //localStorage.setItem('shoppingCart', action.payload.shoppingCart)
        return{
          ...state,
          shoppingCart: [
            ...state.shoppingCart,
            action.payload]
        }}
      case "ADD_PRODUCT_SHOPPING_CART":{
        var cartCopy = []
        const {idProduct} = action.payload
        const existingProd = state.shoppingCart.find(item => item.idProduct === idProduct)
        if(existingProd){
          cartCopy=[...state.shoppingCart]
          const cartFiltered=cartCopy.filter(product=>product.idProduct!==existingProd.idProduct)
          existingProd.quantity += action.payload.quantity
          cartFiltered.push(existingProd)
          return{
            ...state,
            shoppingCart: cartFiltered
          }
        }else{
          return {
            ...state,
            shoppingCart:[...state.shoppingCart,action.payload]
          }
        }
      }
      case "PRESERVED_SHOPPING_CART":{
        return{
          ...state,
          shoppingCart:action.payload
        }}
      case "CLEAR_CART":{
        localStorage.removeItem('shoppingCart')
        return{
          ...state,
          shoppingCart:[]
        };}
      default :{
          return state}
      }
}
export default shoppingCartReducer