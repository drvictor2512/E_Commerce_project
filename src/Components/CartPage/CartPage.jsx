import React, { memo, useContext, useMemo } from 'react'
import './CartPage.css'
import {  toast } from 'react-toastify'
import Table from '../Common/Table'
import config from '../../Config.json'
import remove from '../../assets/remove.png'
import QuantityInput from './../SingleProduct/QuantityInput';
import UserContext from '../../contexts/UserContext'
import CartContext from '../../contexts/CartContext';
import { checkoutAPI } from './../../services/orderServices';
import 'react-toastify/dist/ReactToastify.css'
const CartPage = () => {
    const {cart, removeFromCart, updateCart, setCart}= useContext(CartContext);
    const subtotal = useMemo(() => {
        let total = 0;
        cart.forEach(item => {
            total += item.product.price * item.quantity;
        })
        return total;
    }, [cart])
    const user = useContext(UserContext);
    const checkout = () => {
        const oldCart = [...cart];
        checkoutAPI().then(() => {
            toast.success("Order placed successfully!");
            setCart([]);
        }).catch(() => {
            setCart(oldCart);
            toast.error("Failed to place order");
        })
    }
  return (
    <section className="align_center cart_page">
        <div className="align_center user_info">
            <img src={`${config.backendURL}/profile/${user?.profilePic}`}/>
            <div>
                <p className="user_name">Name: {user?.name}</p>
                <p className="user_email">Email: {user?.email}</p>
            </div>
        </div>
        <Table headings={["Items", "Price", "Quantity", "Total", "Remove"]}>
            <tbody>
                {
                    cart.map(({product, quantity}) => 
                    <tr key={product._id}>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td className='align_center table_quantity_input'><QuantityInput quantity={quantity} stock={product.stock} setQuantity={updateCart} cartPage={true} productId={product._id}/></td>
                        <td>${quantity * product.price}</td>
                        <td><img src={remove} className='remove_icon' onClick={() => removeFromCart(product._id)}/></td>
                    </tr>)
                }
                
            </tbody>
        </Table>
        <table className="cart_bill">
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td>${subtotal}</td>
                </tr>
                <tr>
                    <td>Shipping fee</td>
                    <td>4$</td>
                </tr>
                <tr className='cart_bill_final'>
                    <td>Total</td>
                    <td>${subtotal + 4}</td>
                </tr>
            </tbody>
        </table>
        <buttton className="search_button checkout_btn" onClick={checkout}>Checkout</buttton>
    </section>
  )
}

export default memo(CartPage)