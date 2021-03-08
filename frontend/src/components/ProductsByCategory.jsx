import '../styles/Product.css'
import {connect} from 'react-redux'
import {useState,useEffect} from 'react'
import Product from './Product'
import productActions from '../Redux/actions/productActions'
import { useHistory } from "react-router-dom";
import { Button } from 'rsuite'

const ProductsByCategory = (props) =>{
    const {allProducts,shoppingCart} =props
    let history = useHistory();
    const [arrayAll,setArrayAll] = useState([])
    const category = props.match.params.category
    const arrayCategory = allProducts.filter(product => product.category === category)

    useEffect(()=>{
        props.getProducts()
        .then(setArrayAll(allProducts))
    },[])
    return(
        <div className='productsByCategory'>
            <Button onClick={() => history.goBack()}>Go Back</Button>
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