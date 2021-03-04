const initState = {
    allProducts: [],
    categories:[
        {category: 'Accesorios', pic: '../assets/puasdrawer.jpg'}, {category: 'Amplificadores', pic: '../assets/amplificadordrawer.jpg'}, {category: 'Bajos', pic: '../assets/bajodrawer.jpg'}, {category: 'Guitarras', pic: '../assets/guitarratest.jpg'}, {category: 'Pedales', pic: '../assets/pedaldrawer.jpg'}, {category: 'Percusión', pic: '../assets/bateriadrower.jpg' }, {category: 'Teclados',pic: '../assets/tecladodrower.jpg'}, {category: 'Sonidos', pic: '../assets/sonidodrawer.jpg'}, {category: 'Cuerdas', pic: '../assets/cuerdafrotadadrawer.jpg'}, {category: 'Vientos', pic: '../assets/saxodrawer.jpg'}
    ]
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