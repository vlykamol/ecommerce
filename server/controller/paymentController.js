require('dotenv').config()

const shortid = require('shortid')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Razorpay = require('razorpay')
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret : process.env.RAZORPAY_SECRET
})

const {buffer} = require('micro')

module.exports = {
  createCheckOutSession : async (req, res) => {
    const cart = req.body
    const session = await stripe.checkout.sessions.create({
      line_items: [ ...cart.map(c => {
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: c.title,
            },
            unit_amount: c.price * 100,
          },
          quantity: c.quantity,
        }})
      ],
      mode: 'payment',
      success_url: `${process.env.YOUR_DOMAIN}/successPayment`,
      cancel_url: `${process.env.YOUR_DOMAIN}/canceledPayment`,
    });
    res.json(session.url);
  },

  razorPayCheckOut : (req, res) => {
    const cart = req.body
    console.log('cart, ', cart);
    var options = {
      amount: 0,  // amount in the smallest currency unit
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
    };

    cart.map(c => {
      options.amount += c.price * 100
    })
    instance.orders.create(options).then(order => {
      console.log('order: ', order);
      res.json(order)
    }).catch(err => {
      console.log('order err : ', err);
      res.status(403).json({'error' : err.message})
    })
  },

  razorPayWebhook : (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET
    
    res.json({status: 'ok'})
  },

  webhooks : async (request, response) => {
    const event = request.body;

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

  //   // Return a response to acknowledge receipt of the event
  //   res.json({received: true});
  }
}