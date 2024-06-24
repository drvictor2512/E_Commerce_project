import React, { useCallback, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import './App.css'
import UserContext from './contexts/UserContext'
import Navbar from './Components/Navbar/Navbar'
import Routing from './Components/Routing/Routing'
import { useEffect } from 'react'
import setAuthToken from './API/setAuthToken'
import 'react-toastify/dist/ReactToastify.css'
import CartContext from './contexts/CartContext'
import { getJwt, getUser } from './services/userServices'
import useData from './hooks/useData'
import useAddToCart from './hooks/Cart/useAddToCart'
import useRemoveCart from './hooks/Cart/useRemoveCart'
import useUpdateCartProduct from './hooks/Cart/useUpdateProduct';
setAuthToken(getJwt());
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([])
  const {data : cartData, refetch} = useData("/cart", null, ["cart"]);
  const addToCartmutation = useAddToCart();
  const removeCartMutation = useRemoveCart();
  const updateCartMutation = useUpdateCartProduct();
  useEffect(() => {
      if(cartData){
        setCart(cartData)
      }
  }, [cartData])
  useEffect(() => {
    if(user){
      refetch();
    }
  }, [user])
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
  const addtoCart = useCallback((product, quantity) => {
      setCart(cart);
      const oldcart = [...cart];
      addToCartmutation.mutate({id : product._id, quantity : quantity }, {
        onError : () => {
          setCart(oldcart)
        }
      })
      // const updateCard = [...cart];
      // const productIndex = updateCard.findIndex((item) => item._id === product._id);
      // if(productIndex === -1){
      //   updateCard.push({product, quantity});
      // } else{
      //   updateCard[productIndex].quantity += quantity;
      // }
      // setCart(updateCard);
      // addtoCartAPI(product._id, quantity).then((res) => {
      //     toast.success("Products added sucessfully")
      // }).catch((err) => {
      //   toast.error("Failed to add products!")
      //   setCart(cart)
      // })
    }, [cart])
    const removeFromCart = useCallback(id => {
      const oldcart = [...cart];
      const newCart = oldcart.filter((item) => item.product._id !== id);
      setCart(newCart);
      removeCartMutation.mutate({id}, {
        onError : () => {
          toast.error("Failed to remove product!");
          setCart(oldcart);
        }
      })
      })
    const updateCart = useCallback((type, id) => {
      const oldcart = [...cart];
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex((item) => item.product._id === id);
      if(type === "increase"){
        updatedCart[productIndex].quantity += 1;
        setCart(updatedCart);
      }
      if(type === "decrease"){
        updatedCart[productIndex].quantity -= 1;
      }
      updateCartMutation.mutate({id, type}, {
        onError : () => {
          toast.error("Something went wrong!")
          setCart(oldcart)
        }
      })
    }, [cart])
    
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