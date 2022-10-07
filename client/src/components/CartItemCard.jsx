import React from "react";
import { useCart } from "../context/CartContext";
import { types } from "../context/CartContext";

export default function CartItemCard(props) {
  const { product } = props;
  const {id, title, price, description, category, image, rating, qty} = product
  const {
    dispatch,
  } = useCart();
  
  return (
    <div className="flex w-fuhl items-center rounded-lg text-white bg-slate-900/90">
      <div className="w-1/3 h-full flex justify-center rounded-lg bg-white">
        <img src={`${image}`} className="object-scale-down p-2" />
      </div>
      <div className="h-full w-full p-2 flex flex-col justify-between">
        <p className="text-base font-bold">{title}</p>
        <p className="font-bold text-slate-300">{description}</p>
        <div className="flex justify-between">
          <p>#{category}</p>
          <p>
            Ratings : {rating.rate}/{rating.count}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="w-16 flex justify-center items-center gap-1">
            <button className={` ${qty ? 'bg-white' : 'bg-white/70'}  text-black w-1/3`} disabled={!qty} onClick={() => dispatch({ type: types.DECREMENT_ITEM, payload: id })}>-</button>
            <div className="bg-white text-black w-1/3 text-center">{qty}</div>
            <button className="bg-white text-black w-1/3" onClick={() => dispatch({ type: types.INCREMENT_ITEM, payload: id })}>+</button>
          </div>
          {
            <button
              onClick={() =>
                dispatch({ type: types.REMOVE_FROM_CART, payload: id })
              }
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


