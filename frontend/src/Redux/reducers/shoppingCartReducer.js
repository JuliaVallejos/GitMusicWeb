const initState = {
  shoppingCart:[],
  save:null
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
        console.log("El nuevo valor",action.payload)
        console.log("state actual",state)
          const {idProduct,quantity}=action.payload
          if(state.shoppingCart.length!==0){
            state.shoppingCart.map((productCart,i)=>{
              if(productCart.idProduct===idProduct){
                console.log("1")
                console.log(state)
                const newQuantity={...productCart,quantity:productCart.quantity+quantity}
                //state.shoppingCart[i]=productCart
                console.log(newQuantity)
                console.log(state.shoppingCart)
                return {
                  ...state,
                  shoppingCart:[action.payload],
                  save:[state]
                };
              }else if(i===(state.shoppingCart.length-1)){
                const arrayNew=[]
                console.log("2")
                //estoy guardando mal en el car
                state.shoppingCart.map(product=>{
                  arrayNew.push(product)
                })
                arrayNew.push({idProduct,quantity})
                console.log("arrayNew",arrayNew)
                console.log(state)
                return {...state,shoppingCart:[{"laber":"sankjsankjsa"}]}
              }
            })
          }else{
            console.log("3")
            return {
              ...state,
              shoppingCart:[action.payload],
              save:[state]}
          }
      }
      case "PRESERVED_SHOPPING_CART":{
        return{
          ...state,
          shoppingCart:action.payload
        }}
      default :{
        console.log("pase")
          return state}
      }
}
export default shoppingCartReducer