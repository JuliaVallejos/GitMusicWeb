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
        {Array(5)
            .fill(1)
            .map((el) =>
            arrayCategory.map(product =>{
                return (
                    <Product product={product}/>
                )
            })
              
            )}
            
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