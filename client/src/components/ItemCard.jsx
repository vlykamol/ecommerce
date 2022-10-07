import React from "react";
import { useCart } from "../context/CartContext";
import { types } from "../context/CartContext";

export default function ItemCard(props) {
  const { product } = props;
  const {id, title, price, category, image, rating} = product
  const {
    state: { cart },
    dispatch,
  } = useCart();
  
  return (
    <div className="flex flex-col w-72 h-96 items-center bg-white rounded-lg">
      <div className="w-4/5 h-3/5 flex justify-center">
        <img src={`${image}`} className="object-scale-down p-2" />
      </div>
      <div className="h-2/5 w-full p-2 bg-slate-900/90 flex flex-col justify-between">
        <p className="text-base font-bold">{title.length > 3 ? `${title.substring(0,30)}...`: `${title}`}</p>
        <div className="flex justify-between">
          <p>#{category}</p>
          <p>
            Ratings : {rating.rate}/{rating.count}
          </p>
        </div>
        <div className="flex justify-between">
          {cart.some((c) => c.id === id) ? (
            <button
            onClick={() =>
              dispatch({ type: types.REMOVE_FROM_CART, payload: id })
            }
            className="bg-blue-500 p-1 rounded"
          >
            remove from cart
          </button>
          ) : (
            <button
              onClick={() => dispatch({ type: types.ADD_TO_CART, payload: product })}
              className="bg-blue-500 p-1 rounded"
            >
              add to cart
            </button>
          )}
          <p className="text-lg font-bold">{price}$</p>
        </div>
      </div>
    </div>
  );
}
