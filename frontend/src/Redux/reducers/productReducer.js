const initState = {
    allProducts: [],
    productDetail:{}
}

const productReducer = (state=initState,action) =>{

    switch (action.type){

        case 'ALL_PRODUCTS':
            return{
                ...state,
                allProducts:action.payload
            }
        case 'GET_PRODUCT':
            return {
                ...state,
                productDetail:action.payload
            }
        default:
            return state
        
    }
}

export default productReducer