const initState = {
    allProducts: [],
    productDetail:{},
    categories:[
        {category: 'Accesorios', pic: 'https://i.ibb.co/rmdBx25/cat-accesorios.png'}, {category: 'Amplificadores', pic: 'https://i.ibb.co/N3jwfct/cat-amplificadores.webp'}, {category: 'Bajos', pic: 'https://i.ibb.co/Vm4nCW6/cat-bajos.jpg'}, {category: 'Guitarras', pic: 'https://i.ibb.co/7y9hf7S/cat-guitarras.jpg'}, {category: 'Pedales', pic: 'https://i.ibb.co/4p8dGwt/cat-pedales.jpg'}, {category: 'Percusión', pic: 'https://i.ibb.co/z7ybMhp/cat-percusion.jpg' }, {category: 'Teclados',pic: 'https://i.ibb.co/JjLvQpH/cat-teclados.jpg'}, {category: 'Sonido', pic: 'https://i.ibb.co/QbLsWjn/cat-sonido.jpg'}, {category: 'Cuerdas', pic: 'https://i.ibb.co/f2VtzxR/cat-cuerdas.jpg'}, {category: 'Vientos', pic: 'https://i.ibb.co/m6n8X2h/cat-vientos.jpg'}
    ]
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