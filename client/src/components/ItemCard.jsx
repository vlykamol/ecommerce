import React from "react";

export default function ItemCard(props) {
  const { title, price, description, category, image, rating } = props;
  return (
    <div className="w-96 h-96 flex flex-col m-1">
      <div className="flex justify-center bg-white h-3/5 rounded-xl">
        <img src={`${image}`} className="p-1" />
      </div>
      <div className="bg-blue-800 text-white p-2 h-2/5 rounded-xl">
        <div className="flex justify-between">
          <div className="basis-3/4">
            <p className="text-lg font-bold">{title}</p>
            {/* <p className="text-white/50">{description}</p> */}
          </div>
          <p className="text-lg font-bold">{price}$</p>
        </div>
        <p>#{category}</p>
        <p>
          Ratings : {rating.rate}/{rating.count}
        </p>
      </div>
    </div>
  );
}
