import '../styles/Product.css'
import {connect} from 'react-redux'
import {useState,useEffect} from 'react'
import Product from './Product'
import productActions from '../Redux/actions/productActions'
import { SelectPicker,Loader } from 'rsuite'


const ProductsByCategory = (props) =>{
    const {allProducts,getProducts} =props
    const [loader,setLoader] = useState(true)
    const [newOrder,setNewOrder]= useState([])
    const category = props.match.params.category
    const [arrayCategory,setArrayCategory] = useState([])
    
    
    useEffect(()=>{
        getData()
    },[category])

   useEffect(() => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
   }, [allProducts])

   const getData=async()=>{
        setLoader(false)
        const res=await getProducts()
        if(res){
            setArrayCategory(allProducts.filter(product => product.category === category))
        }
   }

    const sortArray = (value) =>{    
        let newOrder=[]
        const order=value
        if(!order){
            newOrder=[...arrayCategory.sort((a,b) => b.name- a.name)]
        }
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
            {loader?<Loader  vertical size='lg' speed='slow' content={<span style={{color:'white',fontWeight:'bold'}}>Cargando...</span>}/>:
                (allProducts.filter(product => product.category === category).length===0&&!loader)?<div className='noResults'>
                    <p>No hay productos en esta categoría</p>
                    </div>:
            
            (newOrder.length!==0?newOrder:allProducts.filter(product => product.category === category)).map((product, i) =>{
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