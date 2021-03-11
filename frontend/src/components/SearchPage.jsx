import '../styles/Product.css'
import {connect} from 'react-redux'
import {useState,useEffect} from 'react'
import Product from './Product'
import productActions from '../Redux/actions/productActions'
import { useHistory } from "react-router-dom";
import { SelectPicker } from 'rsuite'


const SearchPage = (props) =>{
    console.log(props)
    const search = props.match.params.search
    const {allProducts,shoppingCart} =props
    let history = useHistory();
    const [arrayAll,setArrayAll] = useState([])
    const [newOrder,setNewOrder]= useState([])
    const category = props.match.params.category
    const [arrayFilter,setArrayFilter] = useState([])
    useEffect(()=>{
        props.getProducts()
        .then(setArrayAll(allProducts))
        setArrayFilter(props.allProducts.filter(product=> product.name.toUpperCase().trim().indexOf(search.toUpperCase())!==-1))
        
    },[search])
   useEffect(() => {
       getProm()
   }, [arrayFilter])
   console.log(arrayFilter)
   console.log('hola')
   
    const getProm =() =>{
        if(arrayFilter.length!==0){
            let rating = 0
            arrayFilter.map((thisProduct,idx) =>{
                 const stars =thisProduct.arrayRating.reduce((a,b) =>{  
                          return {
                          value: (a.value+ b.value)
                          }
                      }, {value: 0})

                 rating = Math.round(thisProduct.arrayRating.length===0? 0 : stars.value/thisProduct.arrayRating.length)
                 thisProduct= {...thisProduct,rating:rating}
                 arrayFilter[idx]=thisProduct
                 return arrayFilter               
            })
    }}

   
    return(
        <div className='productsByCategory'>
            <div className='categoryHeader'>
                <h4 className='categoryTitle'>Resultados de su búsqueda</h4>
                {/* <SelectPicker  className='order' placeholder='Ordenar Por' searchable={false} data={options} onChange={(value) =>sortArray(value)} >

                </SelectPicker> */}
              
            </div>
            <div className='productsList'>
                {arrayFilter.length===0&& <div className='noResults'>
                    <p>No hay productos en esta categoría</p>
                    </div>}
        {
            arrayFilter.map((product, i) =>{
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

export default connect(mapStateToProps,mapDispatchToProps)(SearchPage)