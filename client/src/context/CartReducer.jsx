import { types } from "./CartContext";

export function cartReducer (state, action) {
  switch (action.type) {
    case types.SET_PRODUCTS:
      return { ...state, products : action.payload, filterdProducts: action.payload}

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

    case types.BY_PRICE : {
      return { ...state, filterdProducts : [...state.filterdProducts.sort((a, b) => a.price > b.price)]}
    }

    case types.BY_RATING :  {
      return { ...state, filterdProducts : [...state.filterdProducts.sort((a, b) => a.rating.rate > b.rating.rate)]}
    }

    case types.BY_CATEGORY : {
      return { ...state, filterdProducts : [...state.filterdProducts.filter(c => c.category === action.payload)]}
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
      return {...state, filterdProducts : action.payload}
    }
    default:
      return state;
  }
}