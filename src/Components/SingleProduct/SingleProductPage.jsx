import React, {useContext, useState} from 'react'
import './SingleProductPage.css'
import QuantityInput from './QuantityInput';
import config from '../../Config.json';
import { useParams } from 'react-router-dom';
import useData from './../../hooks/useData';
import Loading from './../Common/Loading';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContext';
const SingleProductPage = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const {id} = useParams();
    const {data : product, errors, isLoading} = useData(`/products/${id}`);
    const [quantity, setQuantity] = useState(1);
    const {addtoCart} = useContext(CartContext);
    const user = useContext(UserContext)
  return (
    <section className="align_center single_product">
        {errors && <em className='form_error'>{errors}</em>}
        {isLoading && <Loading />}
        {product && <><div className="align_center">
            <div className="single_product_thumbnails">
                {
                    product.images.map((image, index) => <img src={`${config.backendURL}/products/${image}`} alt={product.title} className={selectedImage === index ? 'selected_image' : ''} onClick={() => setSelectedImage(index)} />)
                }
            </div>
            <img src={`${config.backendURL}/products/${product.images[selectedImage]}`} alt={product.title} className='single_product_display'/>
        </div>
        <div className="single_product_detail">
            <h1 className="single_product_title">{product.title}</h1>
            <p className='single_product_description'>{product.description}</p>
            <p className="single_product_price">{product.price.toFixed(2)}</p>
            {user && <><h2 className="quantity_title">Quantity:</h2>
            <div className="align_center quantity_input">
                <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={product.stock}/>
                <button className="search_button add_cart" onClick={() => addtoCart(product, quantity)}>Add to cart</button>
            </div> </>}
        </div></>}
    </section>  
  )
}

export default SingleProductPage