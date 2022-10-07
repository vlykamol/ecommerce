import { useCart } from "../context/CartContext"
import ItemCard from "./ItemCard"

export default function Page() {

  const { state } = useCart()
  const {products} = state

  return (
    <div className="w-full flex flex-wrap gap-2">
      {products.map((p, key) => {
        return <ItemCard key={key} product = {p} />
      })}
    </div>
  )
}
