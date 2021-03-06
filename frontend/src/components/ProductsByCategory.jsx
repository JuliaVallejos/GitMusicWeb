import '../styles/Product.css'
import {connect} from 'react-redux'
import {useState,useEffect} from 'react'
import Product from './Product'
import productActions from '../Redux/actions/productActions'

const ProductsByCategory = (props) =>{
    const {allProducts,shoppingCart} =props

    const [arrayAll,setArrayAll] = useState([])
    console.log(allProducts)
    const category = props.match.params.category
    const arrayCategory = allProducts.filter(product => product.category === category)

    useEffect(()=>{
        props.getProducts()
        .then(setArrayAll(allProducts))
    },[])

    useEffect(()=>{
    console.log(shoppingCart)
    },[shoppingCart])

    return(
        <div className='productsByCategory'>
            <h4 className='categoryTitle'>{category}</h4>
            <div className='productsList'>
                {arrayCategory.length===0&& <div className='noResults'><h6>No hay productos en esta categoría</h6></div>}
        {
            arrayCategory.map(product =>{
                return (
                    <Product product={product}/>
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