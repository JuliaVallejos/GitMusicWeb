import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Dropzone from "react-dropzone";
import { Alert, Message } from 'rsuite';
import DropFiles from './DropFiles'
import userActions from '../Redux/actions/userActions'
import '../styles/addProducts.css'
import Product from './Product';
import ItemDescription from './ItemDescription'


const AddProducts = (props) => {

    const { history, signIn, loggedUser,categories } = props
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
        category:{},
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
        const property=e.target.name
        /* setNewItem({
            [property]:value}) */
            setNewItem(value)
    }
  
    const addLine = () =>{
        setLines(lines+1)
       setItemsDescription([...itemsDescription,newItem])
        
    }
    const removeLine = e => {
        setLines(lines-1)
        console.log(e.target.name)
        setItemsDescription(itemsDescription.filter(item => item!==e.target.name))
   

    }

    const Validate = async e => {
        console.log(newItem)
     
        
        const arrayFinal= [...itemsDescription,newItem]
     
        console.log(arrayFinal)

        const fdNewProduct = new FormData()
        fdNewProduct.append('name', product.name)
        fdNewProduct.append('mark', product.mark)
        fdNewProduct.append('price', product.price)
        fdNewProduct.append('warranty', product.warranty)
        fdNewProduct.append('stock', product.stock)
        fdNewProduct.append('category', product.category)
          /*   const response = await signIn(user)
            if (response && !response.success) {
                setErrores(response.message)
        }
 */
        
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
                   <DropFiles product={product} setProduct={setProduct}/>
          
                <div className="inputDiv">
              
                         {[...Array(lines)].map((item, idx) =>{
                        return (
                            <ItemDescription addItemDescription={addItemDescription} newItem={newItem} removeLine={removeLine} lines={lines}/>
                           /*  <div className='addDescription'>
                                ``
                            <input key={idx+"i"}type="text" name={`description`} placeholder="Descripción(una oración por línea)" onChange={addItemDescription}/>
                            {lines >= 2 && <button name={newItem} onClick={removeLine} className="removeLine">Borrar</button>}
                            </div> */
                )
            })
            } </div>  
             <button onClick={addLine} className='enviar'>Agregar otra descripción</button>
            
                <button className="enviar" onClick={Validate}>Aceptar</button>
                
                

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedUser: state.userR.loggedUser,
        categories:state.product.categories
    }
}
const mapDispatchToProps = {
    signIn: userActions.logIn
}
export default connect(mapStateToProps,mapDispatchToProps)(AddProducts)

