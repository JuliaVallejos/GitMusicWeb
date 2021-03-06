import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {  Message } from 'rsuite';
import DropFiles from './DropFiles'
import '../styles/addProducts.css'

import ItemDescription from './ItemDescription'
import productActions from '../Redux/actions/productActions';


const AddProducts = (props) => {

const {addProduct,categories } = props
const [itemsDescription,setItemsDescription] = useState([])
const [newItem,setNewItem] = useState()
    const[lines,setLines]= useState(1)
    const [arrayDescription,setArrayDescription] = useState([])
   
    const [product, setProduct] = useState({
        name:'',
        mark:'',
        price:'',
        warranty:'',
        stock:'',
        category:'',
        outstanding:false,
        arrayPic:[],
        arrayDescription:[]

    })
    const [errores, setErrores] = useState('')
    const [fileNames, setFileNames] = useState([]);
    

    useEffect(() => {
        
      
    }, [])
    
    const readInput = e => {
        const value = e.target.value
        const property = e.target.name
        setProduct({
            ...product,
            [property]: value
        })
    }

    const addItemDescription = (e) =>{
        const value=e.target.value
            setNewItem(value)
    }
  
    const addLine = () =>{
        setLines(lines+1)
        setItemsDescription([...itemsDescription,newItem])
      
        
    }
    const removeLine = e => {
   
        const nameItem=e.target.name
        setItemsDescription(itemsDescription.filter(item => item!==nameItem))
        console.log(itemsDescription)
        setLines(lines-1)
    
    }

    const Validate = async e => {
        
        const {name,mark,price,warranty,urlReview,stock,category,arrayPic} = product
       /*  if(name===''||mark===''||price===''||warranty===''||stock===''||category===''||arrayPic.length===0){
            setErrores(['Debe completar todos los campos'])
            return false
        } */
        var arrayFinal=[...itemsDescription]
        if(newItem!==''&&itemsDescription.indexOf(newItem)===-1){
           arrayFinal= [...itemsDescription,newItem]
        }
    
        const fdNewProduct = new FormData()
        fdNewProduct.append('name', name)
        fdNewProduct.append('mark', mark)
        fdNewProduct.append('price', price)
        fdNewProduct.append('warranty', warranty)
        fdNewProduct.append('urlReview',urlReview)
        fdNewProduct.append('stock', stock)
        fdNewProduct.append('category', category)
        arrayPic.map((pic,i) =>{
            fdNewProduct.append('arrayPic',arrayPic[i])
        })
        arrayFinal.map((item,i)=>{
            fdNewProduct.append('arrayDescription',arrayFinal[i])
        })
        
        const response = await addProduct(fdNewProduct)
         console.log(response)
        if (response && !response.success) {
                setErrores(response.message)
        }else{
            
            alert('Producto grabado')
            e.preventDefault()
        }
 
        
    }
 

    return (
        <div className="containerAddProducts">
            <div className="formulario">
                <h2>Cargue sus productos</h2>

                {errores !== '' && <Message type='info' description={errores} style={{ marginBottom: '2vh' }} />}
                <div className="inputDiv addProductInput">
                    <input type="text" name="name" placeholder="Nombre del producto" onChange={readInput} />
                </div>
                <div className="inputDiv addProductInput">
                    <input type="text" name="mark" placeholder="Marca" onChange={readInput} />
                </div>
                <div className="inputDiv addProductInput">
                    <input type="number" name="price" placeholder="Precio" onChange={readInput} />
                </div>
                <div className="inputDiv addProductInput">
                    <input type="number" name="warranty" placeholder="Garantía(cantidad de meses)" onChange={readInput} />
                </div>
                <div className="inputDiv addProductInput">
                    <input type="number" name="stock" placeholder="Cantidad en stock" onChange={readInput} />
                </div>
               <select  onChange={readInput} label='category' name='category'>
                <option value='' name='category' selected disabled='true'>Selecciona categoría</option>
                   {categories.length !== 0 && categories.map(category =>{
                     
                       return( 
                           
                           <option value={category.category} name='category'>{category.category}</option>
                       )
                   })}
               </select>
               <label className='outstanding' onChange={readInput} name='outstanding'>¿Es producto destacado?
                   <div className='radios'>
                       <div className="inputRadio"><input name='outstanding' type='radio' value={true}/>Si</div>
                        <div className="inputRadio"><input name='outstanding' type='radio' value={false}/>No</div>
                   </div>
                
                </label>
                <div className="inputDiv addProductInput">
                    <input type="uri" name="urlReview" placeholder="Ingrese un link de alguna reseña o video relacionado(opcional)" onChange={readInput} />
                </div>
                   <DropFiles product={product} setProduct={setProduct}/>
                
                <div className="inputDiv">
                    <h3 style={{color:'white'}}>Descripción</h3>
                       {[...Array(lines)].map((item, idx) =>{
                        return (
                            <ItemDescription id={idx}  addItemDescription={addItemDescription} newItem={newItem} removeLine={removeLine} lines={lines}/>
                        
                ) 
            })
            }  </div>  
             <button onClick={addLine} style={{alignSelf:'flex-start'}}className='enviar'>Agregar otra descripción</button>
            
                <button className="enviar" onClick={Validate}>Confirmar producto</button>
                {errores&& errores.map(error =>{
                    <p>{error}</p>
                })}
                

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        categories:state.product.categories
    }
}
const mapDispatchToProps = {
    addProduct:productActions.addProduct
}
export default connect(mapStateToProps,mapDispatchToProps)(AddProducts)

