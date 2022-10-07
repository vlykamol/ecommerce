import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { useReducer } from "react";
import { cartReducer } from "./CartReducer";


const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export const types = {
  SET_PRODUCTS : "setProducts",
  ADD_TO_CART : "addToCart",
  REMOVE_FROM_CART : "removeFromCart",
  INCREMENT_ITEM : "incrementItem",
  DECREMENT_ITEM : 'decrementItem',
  BY_PRICE : "byPrice",
  BY_CATEGORY: "byCategory",
  BY_RATING : "byRating",
  ASCENDING : "ascending",
  DESCENDING : "descending",
  SEARCH_QUERY : "searchQuery",
  CLEAR_FILTERS : "clearFilters"
}

export function CartProvider({children}) {
  
  const [loading, setLoading] = useState(false)
  const [products, setproducts] = useState([])
  const [category, setCategory] = useState([])
  const [amount, setAmount] = useState(0)

  const [state, dispatch] = useReducer(cartReducer, {
    products : products,
    cart:[]
  })

  useEffect(() => {
    setLoading(true)
    axios.get('https://fakestoreapi.com/products').then(res => setproducts(res.data)).catch(err => console.log(err))
    setLoading(false)
  },[])
  
  useEffect(() => {
    dispatch({
      type: types.SET_PRODUCTS,
      payload : products
    })
    let c = new Set()
    products.map(p => c.add(p.category))
    setCategory([...c])
  }, [products])

  useEffect(() => {
    let count = 0;
    state.cart.map(c => {
      count += c.qty * c.price
    })
    setAmount(count.toFixed(2))
  }, [state.cart])

  const value = {
    state,
    dispatch,
    amount,
    category
  }

  return (<CartContext.Provider value={value}>{!loading && children}</CartContext.Provider>)
}