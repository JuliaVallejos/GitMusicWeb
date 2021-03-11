import '../styles/Product.css'
import {connect} from 'react-redux'
import {useState,useEffect} from 'react'
import Product from './Product'
import productActions from '../Redux/actions/productActions'
import { useHistory } from "react-router-dom";
import { SelectPicker } from 'rsuite'


const ProductsByCategory = (props) =>{
    const {allProducts,shoppingCart} =props
    let history = useHistory();
    const [arrayAll,setArrayAll] = useState([])
    const [newOrder,setNewOrder]= useState([])
    const category = props.match.params.category
    const [arrayCategory,setArrayCategory] = useState([])
    console.log(arrayCategory)
    useEffect(()=>{
        props.getProducts()
        .then(setArrayAll(allProducts))
        setArrayCategory(allProducts.filter(product => product.category === category))
        
    },[category])
   useEffect(() => {
       getProm()
   }, [arrayCategory])
   
    const getProm =() =>{
        if(arrayCategory.length!==0){
            let rating = 0
            arrayCategory.map((thisProduct,idx) =>{
                 const stars =thisProduct.arrayRating.reduce((a,b) =>{  
                          return {
                          value: (a.value+ b.value)
                          }
                      }, {value: 0})

                 rating = Math.round(thisProduct.arrayRating.length===0? 0 : stars.value/thisProduct.arrayRating.length)
                 thisProduct= {...thisProduct,rating:rating}
                 arrayCategory[idx]=thisProduct
                 return arrayCategory               
            })
    }}

    const sortArray = (value) =>{    
        let newOrder=[]
        const order=value
        switch(order){
            case 'most_rating':
                newOrder = [...arrayCategory.sort((a,b) => b.rating - a.rating)]
                break
            case 'less_rating':
                 newOrder=[...arrayCategory.sort((a,b) => a.rating - b.rating)]
                 break
            case 'most_price':
                newOrder = [...arrayCategory.sort((a,b) => b.price - a.price)]
                break
            case 'less_price':
                newOrder=[...arrayCategory.sort((a,b) => a.price - b.price)]
                break
            default:  
                newOrder=[...arrayCategory]
            }
    setNewOrder(newOrder)
    }
    const options =[
        {value:'', label:'Más recientes'},
        { value:'most_rating', label:'Mayor valoración'},
        { value:'less_rating', label:'Menor valoración'},
        { value:'most_price', label:'Mayor precio'},
        { value:'less_price', label:'Menor precio'}
    ]

   
    return(
        <div className='productsByCategory'>
            <div className='categoryHeader'>
                <h4 className='categoryTitle'>{category.toUpperCase()}</h4>
                <SelectPicker  className='order' placeholder='Ordenar Por' searchable={false} data={options} onChange={(value) =>sortArray(value)} >

                </SelectPicker>
              
            </div>
            <div className='productsList'>
                {arrayCategory.length===0&& <div className='noResults'>
                    <p>No hay productos en esta categoría</p>
                    </div>}
        {
            (newOrder.length!==0?newOrder:arrayCategory).map((product, i) =>{
                return (
                    <Product key={i}product={product}/>
                )
            })
        }
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        allProducts: state.product.allProducts,
        shoppingCart:state.shoppingR.shoppingCart
    }
}
const mapDispatchToProps = {
    getProducts : productActions.getProducts
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsByCategory)