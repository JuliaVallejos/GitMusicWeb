import '../styles/DrawerContent.css'
import { useState } from 'react'
import { FaRegWindowClose, FaMusic } from 'react-icons/fa'

const DrawerContent = ({closeDrawer}) => {
    const [products, setProducts] = useState([
        {
        producto: 'guitarra',
        marca: 'yamaha',
        precio: '6000',
        pic: '../assets/guitarratest.jpg',
        id: 1
    },
    {
        producto: 'guitarra',
        marca: 'yamaha',
        precio: '6000',
        pic: '../assets/guitarratest.jpg',
        id: 2
    },
    {
        producto: 'guitarra',
        marca: 'yamaha',
        precio: '6000',
        pic: '../assets/guitarratest.jpg',
        id: 3
    },
    {
        producto: 'guitarra',
        marca: 'yamaha',
        precio: '6000',
        pic: '../assets/guitarratest.jpg',
        id: 4
    }
])

    const deleteProduct = id => {
        console.log('Has borrado un producto')
        const filterProduct = products.filter(product => product.id !== id)
        setProducts(filterProduct)
    }
    console.log(products)

    return (
        <>
            {products.map(product => 
                <div className="drawerProductContainer" >
                    <div>
                        <p className="textProduct"><strong>Producto:</strong> {product.producto}</p>
                        <p className="textProduct"><strong>Marca:</strong> {product.marca}</p>
                        <p className="textProduct"><strong>Precio:</strong> {product.precio}</p>
                        <p>{product.id}</p>
                    </div>
                    <div className="drawerProductImg" style={{backgroundImage: `url(${product.pic})`}}>
                        <FaRegWindowClose onClick={() => deleteProduct(product.id)} className="removeDrawerProduct" />
                    </div>
                </div>
            )
            }
       </> 
    )
}

export default DrawerContent