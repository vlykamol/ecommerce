import { types } from "./AuthContext";

export default function profileReducer (state, action) {
  switch (action.type) {
    case types.SET_PROFILE : 
      return {...state, profile : {...state.profile, ...action.payload}}

    case types.SET_ADDRESS :
      return {...state, address : {...action.payload}}
    
    default :
      return state
  }
}