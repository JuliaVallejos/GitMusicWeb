import '../styles/Product.css'
import {connect} from 'react-redux'
import {useState,useEffect} from 'react'
import Product from './Product'
import productActions from '../Redux/actions/productActions'

const ProductsByCategory = (props) =>{
    const [arrayAll,setArrayAll] = useState([])
    const {allProducts} =props
    const category = props.match.params.category
    console.log(allProducts)
   const arrayCategory = allProducts.filter(product => product.category[0].label === category)
    console.log(arrayCategory)

    useEffect(()=>{
        props.getProducts()
        .then(setArrayAll(allProducts))
    },[])
    return(
        <div className='productsByCategory'>
            <h4 className='categoryTitle'>{category}</h4>
            <div className='productsList'>
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
        allProducts: state.product.allProducts
}
}
const mapDispatchToProps = {
    getProducts : productActions.getProducts
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsByCategory)