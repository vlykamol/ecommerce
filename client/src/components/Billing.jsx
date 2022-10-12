import { useCart } from '../context/CartContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Billing() {

  const {state : {cart}, amount } = useCart()
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  const createCheckOutSession = () => {
    axios.post('http://localhost:8080/payment/create-checkout-session',cart).then(res => {
      console.log('res',res);
      window.location.href = `${res.data}`
    }).catch(err => console.log('error', err))
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [])

  return (
    <div className='w-full sm:w-1/3 p-2 bg-white/75 text-black border-l-2 flex flex-col justify-between'>
      <div className='flex flex-col gap-1'>
        <div className='border-b-2 border-black p-1 text-center text-xl font-bold'>Billing</div>
        {cart.map((p, key) => {
          return (
            <div key={key} className='border-b-2 border-black'>
              <div>{p.title}</div>
              <div>Qty : {p.quantity}</div>
              <div>Price : {(p.price * p.quantity).toFixed(2)}</div>
            </div>
          )
        })}
      </div>
      <div className='p-2 flex justify-between'>
        <div>Total amount: {amount}</div>
        <button onClick={() => createCheckOutSession()} className='bg-lime-600 p-1 rounded'>check out</button>
      </div>
    </div>
  )
}
