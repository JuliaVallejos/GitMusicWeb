import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Alert, Message } from 'rsuite';
import userActions from '../Redux/actions/userActions'
import '../styles/addProducts.css'


const AddProducts = (props) => {

    const { history, signIn, loggedUser,categories } = props
    console.log(props)
    const[lines,setLines]= useState(1)
    const [arrayDescription,setArrayDescription] = useState(['one'])
    const [product, setProduct] = useState({
        name:'',
        mark:'',
        price:'',
        warranty:'',
        stock:'',
        category:'',
        outstanding:'',
        arrayDescription:[]

    })
    const [errores, setErrores] = useState('')

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
   
    const addLine = () =>{
        setLines(lines+1)
    }

    const Validate = async e => {
        alert('Mandar')
       /*  setErrores('')
        if (!user.email || !user.password) {
            setErrores('Todos los campos son requeridos')
        } else {
            const response = await signIn(user)
            if (response && !response.success) {
                setErrores(response.message)
        }

        } */
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
               <select label='category' name='category'>
                <option value='' name='category' selected disabled='true'>Selecciona categoría</option>
                   {categories.length !== 0 && categories.map(category =>{
                      
                       return( 
                           <option value={category.category} name='category'>{category.category}</option>
                       )
                   })}
               </select>
               <label className='outstanding' name='outstanding'>¿Es producto destacado?
                   <div className='radios'>
                       <div className="inputRadio"><input name='outstanding' type='radio' value={true}/>Si</div>
                        <div className="inputRadio"><input name='outstanding' type='radio' value={false}/>No</div>
                   </div>
                
                    
                </label>
                <div className="inputDiv">
                {[...Array(lines)].map((item, idx) =>{
                return (
                    <div className='addDescription'>
                    <input key={idx+"i"}type="text" name="description" placeholder="Descripción(una oración por línea)" onChange={readInput} />
                    {lines >= 2 && <button onClick={()=>setLines(lines-1)} className="removeLine">Borrar</button>}
                    </div>
                )
            })
            }       
                    <button onClick={addLine} className='enviar'>Agregar otra descripción</button>
                </div>
            
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

