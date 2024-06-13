import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import './App.css'
import UserContext from './contexts/UserContext'
import Navbar from './Components/Navbar/Navbar'
import Routing from './Components/Routing/Routing'
import { useEffect } from 'react'
import setAuthToken from './API/setAuthToken'
import { addtoCartAPI, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from './services/cartServices'
import 'react-toastify/dist/ReactToastify.css'
import CartContext from './contexts/CartContext'
import { getJwt, getUser } from './services/userServices'
setAuthToken(getJwt());
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([])
  useEffect(() => {
    try {
      const jwtUser = getUser();
      if(Date.now() >= jwtUser.exp * 1000){
        localStorage.removeItem('token');
        location.reload();
      }else{
        setUser(jwtUser);
      }
    } catch (error) {
      
    }
  }, [])
  const addtoCart = (product, quantity) => {
      const updateCard = [...cart];
      const productIndex = updateCard.findIndex((item) => item._id === product._id);
      if(productIndex === -1){
        updateCard.push({product, quantity});
      } else{
        updateCard[productIndex].quantity += quantity;
      }
      setCart(updateCard);
      addtoCartAPI(product._id, quantity).then((res) => {
          toast.success("Products added sucessfully")
      }).catch((err) => {
        toast.error("Failed to add products!")
        setCart(cart)
      })
    }
    const removeFromCart = id => {
      const oldcart = [...cart];
      const newCart = oldcart.filter((item) => item.product._id !== id);
      setCart(newCart);
      removeFromCartAPI(id).catch(err => {
        toast.error("Failed to remove product!")
        setCart(oldcart)
      })
    }
    const updateCart = (type, id) => {
      const oldcart = [...cart];
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex((item) => item.product._id === id);
      if(type === "increase"){
        updatedCart[productIndex].quantity += 1;
        setCart(updatedCart);
        increaseProductAPI(id).catch(err => {
          toast.error("Something went wrong!")
          setCart(oldcart)
        })
      }
      if(type === "decrease"){
        updatedCart[productIndex].quantity -= 1;
        setCart(updatedCart);
        decreaseProductAPI(id).catch(err => {
          toast.error("Something went wrong!")
          setCart(oldcart)
        })
      }
    }
    const getCart = () => {
      getCartAPI().then((res) => {setCart(res.data)}).catch(err => {
        toast.error("Something went wrong!")
      })
    }
    useEffect(() => {
      if(user){
        getCart();
      }
    }, [user])
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider value={{cart, addtoCart, removeFromCart, updateCart, setCart}}>
        <div className='app'>
            <Navbar cartCount={cart.length}/>
            <main>
              <ToastContainer />
              <Routing/>
            </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App