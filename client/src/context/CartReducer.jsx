import { types } from "./CartContext";

export function cartReducer (state, action) {
  switch (action.type) {
    case types.SET_PRODUCTS:
      return { ...state, products : action.payload}

    case types.ADD_TO_CART: {
      return { ...state, cart : [...state.cart, {...action.payload, qty: 1}]}
    }

    case types.REMOVE_FROM_CART: {
      return { ...state, cart : [...state.cart.filter(c => c.id !== action.payload)]}
    }

    case types.INCREMENT_ITEM: {
      return { ...state, cart : [ ...state.cart.map(c => {
        if(c.id === action.payload)
          return {...c, qty : c.qty + 1}
        return c
      }) ]}
    }

    case types.DECREMENT_ITEM : {
      return { ...state, cart : [ ...state.cart.map(c => {
        if(c.id === action.payload)
          return {...c, qty : c.qty - 1}
        return c
      }) ]}
    }
    default:
      return state;
  }
}