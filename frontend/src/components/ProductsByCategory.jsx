import '../styles/Product.css'
import {connect} from 'react-redux'
import {useState,useEffect} from 'react'
import Product from './Product'
import productActions from '../Redux/actions/productActions'

const ProductsByCategory = (props) =>{

    const [arrayAll,setArrayAll] = useState([])
    const {allProducts,shoppingCart} =props
    const category = props.match.params.category
    const arrayCategory = allProducts.filter(product => product.category.label === category)

    useEffect(()=>{
        props.getProducts()
        .then(setArrayAll(allProducts))
    },[])
    console.log(shoppingCart)
    return(
        <div className='productsByCategory'>
            <h4 className='categoryTitle'>{category}</h4>
            <div className='productsList'>
                {arrayCategory.length===0&& <div className='noResults'><h6>No hay productos en esta categoría</h6></div>}
        {Array(7).fill(1).map(() =>
            arrayCategory.map(product =>{
                return (
                    <Product product={product}/>
                )
            })
        )}
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