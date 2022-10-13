import { useCart } from '../context/CartContext'
import axios from 'axios'
import { useEffect, useState } from 'react'


const loadScript = (src) => {
  return new Promise(resolve => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

export default function Billing() {

  const {state : {cart}, amount } = useCart()
  const [message, setMessage] = useState("");

  const createCheckOutSession = () => {
    axios.post('http://localhost:8080/payment/create-checkout-session',cart).then(res => {
      console.log('res from stripe',res);
      window.location.href = `${res.data}`
    }).catch(err => console.log('error', err))
  }

  const razorPayCheckOut = () => {

    loadScript("https://checkout.razorpay.com/v1/checkout.js").then(res =>{
      axios.post('http://localhost:8080/payment/razorpayCheckout',cart).then(order => {
      console.log('res from razorPay',order);
      var options = {
        "key": "rzp_test_SWVOO1lUyi4oSC", // Enter the Key ID generated from the Dashboard
        "amount": `${order.data.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": `${order.data.currency}`,
        "name": "eCommerce",
        "description": "Test Transaction",
        "image": "/vite.svg",
        "order_id": `${order.data.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        }
    };

    const paymentObject = new Razorpay(options)
    paymentObject.open()
      }).catch(err => console.log('error', err))
    }).catch(err => {
      console.log('razorPay failed', err.message);
    })
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
        <button onClick={() => razorPayCheckOut()} className='bg-lime-600 p-1 rounded'>check out</button>
      </div>
    </div>
  )
}
