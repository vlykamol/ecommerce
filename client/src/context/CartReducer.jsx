import { types } from "./CartContext";
import axios from "axios";

export function cartReducer (state, action) {
  switch (action.type) {
    case types.SET_PRODUCTS:
      return { ...state, products : action.payload, filterdProducts: action.payload}

    case types.SET_CART:
      return {...state, cart : [  ...action.payload]}

    case types.ADD_TO_CART: {
      return { ...state, cart : [...state.cart, {...action.payload, quantity: 1}]}
    }

    case types.REMOVE_FROM_CART: {
      return { ...state, cart : [...state.cart.filter(c => c._id !== action.payload)]}
    }

    case types.INCREMENT_ITEM: {
      return { ...state, cart : [ ...state.cart.map(c => {
        if(c._id === action.payload)
          return {...c, quantity : c.quantity + 1}
        return c
      }) ]}
    }

    case types.DECREMENT_ITEM : {
      return { ...state, cart : [ ...state.cart.map(c => {
        if(c._id === action.payload)
          return {...c, quantity : c.quantity - 1}
        return c
      }) ]}
    }

    case types.UPDATE_CART : {
        if (action.payload.accessToken) {
          axios
            .post(
              "http://localhost:8080/user/cart",
              {
                cart: state.cart,
              },
              {
                headers: {
                  authorization: `Bearer ${action.payload.accessToken}`,
                },
              }
            )
            .then((res) => {
              return {...state, cart: [...res.data.products.map(p => {
                return {...p._id, quantity: p.quantity}
              })]}
            })
            .catch((err) => console.log(err));
        }
      return state
    }

    case types.BY_PRICE : {
      return { ...state, filterdProducts : [...state.filterdProducts.sort((a, b) => a.price > b.price)]}
    }

    case types.BY_RATING :  {
      return { ...state, filterdProducts : [...state.filterdProducts.sort((a, b) => a.ratings.rate > b.ratings.rate)]}
    }

    case types.BY_CATEGORY : {
      return { ...state, filterdProducts : [...state.products.filter(c => c.category === action.payload)]}
    }

    case types.ASCENDING : {
      return {...state, filterdProducts : [...state.filterdProducts.reverse()]}
    }

    case types.DESCENDING : {
      return {...state, filterdProducts : [...state.filterdProducts.reverse()]}
    }

    case types.SEARCH_QUERY : {
      return { ...state, filterdProducts : [...state.products.filter(c => c.title.toLowerCase().includes(action.payload))]}
    }

    case types.CLEAR_FILTERS : {
      return {...state, filterdProducts : [...state.products]}
    }
    default:
      return state;
  }
}