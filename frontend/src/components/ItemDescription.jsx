import '../styles/addProducts.css'


const ItemDescription = ({addItemDescription,newItem,removeLine,id,lines}) => {
   
 

    return (
        <div id={id} className='addDescription'>
        <input type="text" value={newItem} name='description' placeholder="Descripción(una oración por línea)" onChange={addItemDescription}/>
     
        {lines.length >= 2 && <button id={id} name={newItem} onClick={removeLine} className="removeLine">Borrar</button>}
        </div>
    )
}


export default ItemDescription

