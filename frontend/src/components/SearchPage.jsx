import '../styles/Product.css'
import {connect} from 'react-redux'
import {useState,useEffect} from 'react'
import Product from './Product'
import productActions from '../Redux/actions/productActions'
import { useHistory } from "react-router-dom";
import {Loader,SelectPicker} from 'rsuite'


const SearchPage = (props) =>{
     const [loader,setLoader] = useState(true)
    const search = props.match.params.search
    const {allProducts,getProducts} =props
    let history = useHistory();
    const [arrayAll,setArrayAll] = useState([])
    const [newOrder,setNewOrder]= useState([])
    const category = props.match.params.category
    const [arrayFilter,setArrayFilter] = useState([])

    useEffect(()=>{
        getData()
    },[search])

   const getData=async()=>{
       if(allProducts.length!==0){
        setArrayFilter(allProducts.filter(product=> product.name.toUpperCase().trim().indexOf(search.toUpperCase())!==-1))
       }else{
    setArrayFilter((await getProducts()).filter(product=> product.name.toUpperCase().trim().indexOf(search.toUpperCase())!==-1))
       }setLoader(false)
   }

   useEffect(() => {
       getProm()
   }, [arrayFilter,allProducts])

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
    const sortArray = (value) =>{    
        let newOrder=[]
        const order=value
        console.log(order)
        switch(order){
            case 'most_rating':
                newOrder = [...arrayFilter.sort((a,b) => b.rating - a.rating)]
                break
            case 'less_rating':
                 newOrder=[...arrayFilter.sort((a,b) => a.rating - b.rating)]
                 break
            case 'most_price':
                newOrder = [...arrayFilter.sort((a,b) => b.price - a.price)]
                break
            case 'less_price':
                newOrder=[...arrayFilter.sort((a,b) => a.price - b.price)]
                break

            default:  
                newOrder=allProducts.filter(product=> product.name.toUpperCase().trim().indexOf(search.toUpperCase())!==-1)
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
                <h4 className='categoryTitle'>Resultados de su búsqueda</h4>
                 <SelectPicker  className='order' placeholder='Ordenar Por' searchable={false} data={options} onChange={(value) =>sortArray(value)} >

                </SelectPicker> 
              
            </div>
            <div className='productsList'>
            {loader?<Loader  vertical size='lg' speed='slow' content={<span style={{color:'white',fontWeight:'bold'}}>Cargando...</span>}/>:
                arrayFilter.length===0? <div className='noResults'>
                    <p>No hay productos en esta categoría</p>
                    </div>:
        
        (newOrder.length!==0?newOrder:arrayFilter).map((product, i) =>{
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