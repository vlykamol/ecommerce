import { useEffect, useState } from "react"
import axios from "axios"
import ItemCard from "./ItemCard"

export default function Page() {

  const [products, setproducts] = useState([])

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then(res => setproducts(res.data)).catch(err => console.log(err))
  },[])
  return (
    <div className="w-full flex flex-wrap">
      {console.log(products)}
      {products.map((p, key) => {
        return <ItemCard key={key} {...p} />
      })}
    </div>
  )
}
