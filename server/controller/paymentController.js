require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY);
const YOUR_DOMAIN = 'http://localhost:5173';

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
      success_url: `${YOUR_DOMAIN}/successPayment`,
      cancel_url: `${YOUR_DOMAIN}/canceledPayment`,
    });
    res.json(session.url);
  },

  webhooks : (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    let event;

    try {
      event =  stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_SIGINIG_SECRET)
    }
    catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.log('types:::::', event);
    // Handle the event
  //   switch (event.type) {
  //     case 'payment_intent.succeeded':
  //       const paymentIntent = event.data.object;
  //       console.log('PaymentIntent was successful!');
  //       break;
  //     case 'payment_method.attached':
  //       const paymentMethod = event.data.object;
  //       console.log('PaymentMethod was attached to a Customer!');
  //       break;
  //     // ... handle other event types
  //     default:
  //       console.log(`Unhandled event type ${event.type}`);
  //   }

  //   // Return a response to acknowledge receipt of the event
  //   res.json({received: true});
  }
}