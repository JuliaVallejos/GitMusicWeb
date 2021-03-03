const initState = {
    allProducts: []
}

const productReducer = (state=initState,action) =>{

    switch (action.type){

        case 'ALL_PRODUCTS':
            return{
                ...state,
                allProducts:action.payload
            }
        default:
            return state
        
    }
}

export default productReducer