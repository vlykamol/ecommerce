import React from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { types } from "../context/CartContext";

export default function CartItemCard(props) {
  const { product } = props;
  const { user } = useAuth()
  const {_id, title, price, description, category, images, ratings, quantity} = product
  const {
    dispatch,
  } = useCart();
  
  return (
    <div className="flex flex-col sm:flex-row w-full items-center rounded-lg text-white bg-slate-900/90">
      <div className="w-full sm:w-1/3 h-full flex justify-center rounded-lg bg-white">
        <img src={`${images[0].url}`} className="object-scale-down p-2 w-1/2 sm:w-full" />
      </div>
      <div className="h-full w-full p-2 flex flex-col justify-between">
        <p className="text-base font-bold">{title}</p>
        <p className="font-bold text-slate-300">{description}</p>
        <div className="flex justify-between">
          <p>#{category}</p>
          <p>
            Ratings : {ratings.rate}/{ratings.count}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="w-16 flex justify-center items-center gap-1">
            <button className={` ${quantity ? 'bg-white' : 'bg-white/70'}  text-black w-1/3`} disabled={!quantity} onClick={() => {
              dispatch({ type: types.DECREMENT_ITEM, payload: _id })
              dispatch({ type: types.UPDATE_CART, payload: user})
              }}>-</button>
            <div className="bg-white text-black w-1/3 text-center">{quantity}</div>
            <button className="bg-white text-black w-1/3" onClick={() => {
              dispatch({ type: types.INCREMENT_ITEM, payload: _id })
              dispatch({ type: types.UPDATE_CART, payload: user})
            }}>+</button>
          </div>
          {
            <button
              onClick={() => {
                dispatch({ type: types.REMOVE_FROM_CART, payload: _id })
                dispatch({ type: types.UPDATE_CART, payload: user})
              }}
              className="bg-blue-500 p-1 rounded"
            >
              remove from cart
            </button>
          }
          <p className="text-lg font-bold">{price}$</p>
        </div>
      </div>
    </div>
  );
}


