require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY);
const YOUR_DOMAIN = 'http://localhost:5173';

module.exports = {
  createCheckOutSession : async (req, res) => {
    const cart = req.body
    console.log('cart', cart);
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
  }
}