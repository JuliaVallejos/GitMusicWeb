const initState = {
    allProducts: [],
    productDetail:{},
    categories:[
        {category: 'Accesorios', pic: 'https://i.ibb.co/rmdBx25/cat-accesorios.png'}, {category: 'Amplificadores', pic: 'https://i.ibb.co/N3jwfct/cat-amplificadores.webp'}, {category: 'Bajos', pic: 'https://i.ibb.co/Vm4nCW6/cat-bajos.jpg'}, {category: 'Guitarras', pic: 'https://i.ibb.co/7y9hf7S/cat-guitarras.jpg'}, {category: 'Pedales', pic: 'https://i.ibb.co/4p8dGwt/cat-pedales.jpg'}, {category: 'Percusión', pic: 'https://i.ibb.co/z7ybMhp/cat-percusion.jpg' }, {category: 'Teclados',pic: 'https://i.ibb.co/JjLvQpH/cat-teclados.jpg'}, {category: 'Sonido', pic: 'https://i.ibb.co/QbLsWjn/cat-sonido.jpg'}, {category: 'Cuerdas', pic: 'https://i.ibb.co/f2VtzxR/cat-cuerdas.jpg'}, {category: 'Vientos', pic: 'https://i.ibb.co/m6n8X2h/cat-vientos.jpg'}
    ]
}

function getProm(product){
    let prom = 3
        product.arrayRating.map(() =>{      
           const sum =product.arrayRating.reduce((a,b) =>{  
                    return {
                    value: (a.value+ b.value)
                    }
                }, {value: 0})                     
               prom = product.arrayRating.length===0? 3 : sum.value/product.arrayRating.length                      
                }) 
         product= {...product,rating:Math.round(prom)}        
         return product                    
  }

const productReducer = (state=initState,action) =>{

    switch (action.type){
        case 'ALL_PRODUCTS':
            const newArray=[]
            action.payload.map(product=>{
                newArray.push(getProm(product))
            })
            return{
                ...state,
                allProducts:newArray
            }
        case 'GET_PRODUCT':
            const newProduct=getProm(action.payload)
            return {
                ...state,
                productDetail:newProduct
            }
        case 'NEW_PRODUCT':
            const newProduct2=getProm(action.payload)
            return{
                ...state,
                allProducts:[...state.allProducts,newProduct2]
            }
        case 'COMMENT_OPTIONS':
            const newProduct3=getProm(action.payload)
            return {
                ...state, 
                allProducts: state.allProducts.map(product => product._id === action.payload._id ? newProduct3 : product)
            }
        default:
            return state
        
    }
}

export default productReducer