require("dotenv").config();

const shortid = require("shortid");
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Razorpay = require("razorpay");
const crypto = require("crypto");

const order = require("../model/order");
const orderTemplate = require("../model/order");
const cart = require("../model/cart");
const cartTemplate = require("../model/cart");
const invoice = require("../model/invoice");
const invoiceTemplate = require("../model/invoice");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// const {buffer} = require('micro')

module.exports = {
  // createCheckOutSession : async (req, res) => {
  //   const cart = req.body
  //   const session = await stripe.checkout.sessions.create({
  //     line_items: [ ...cart.map(c => {
  //       return {
  //         price_data: {
  //           currency: 'inr',
  //           product_data: {
  //             name: c.title,
  //           },
  //           unit_amount: c.price * 100,
  //         },
  //         quantity: c.quantity,
  //       }})
  //     ],
  //     mode: 'payment',
  //     success_url: `${process.env.YOUR_DOMAIN}/successPayment`,
  //     cancel_url: `${process.env.YOUR_DOMAIN}/canceledPayment`,
  //   });
  //   res.json(session.url);
  // },

  razorPayCheckOut: (req, res) => {
    const {_id, cart} = req.body;
    const receipt = shortid.generate();
    // console.log("cart, ",_id, cart);
    var options = {
      amount: 0, // amount in the smallest currency unit
      currency: "INR",
      receipt: receipt,
      payment_capture: 1,
    };

    cart.map((c) => {
      options.amount += c.price * 100;
    });

    instance.orders
      .create(options)
      .then((od) => {
        const order = new orderTemplate({
          order_id: od.id,
          user_id : _id,
          products: [
            ...cart.map((c) => {
              return {
                _id: c._id,
                quantity: c.quantity,
              };
            }),
          ],
          status: false,
        });
        order.save().then(o => console.log('new Order created', o.order_id)).catch(e => console.log('error creating new order', e.message));
        res.json(od);
      })
      .catch((err) => {
        // console.log('order err : ', err);
        res.status(403).json({ error: err.message });
      });
  },

  razorPayWebhook: (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest === req.headers["x-razorpay-signature"]) {
      // console.log("completed order", req.body.payload.payment);
      const entity = req.body.payload.payment.entity;

      const invoice = new invoiceTemplate({
        order_id: entity.order_id,
        user: {
          _id: entity.userId,
          email: entity.email,
        },
        payment_id: entity.id,
        amount: entity.amount,
      });

      invoice
        .save()
        .then((data) => {
          order
            .findOneAndUpdate({ order_id: entity.order_id }, { status: true })
            .then((d) => {
              console.log("order status set to successful", d.order_id)
            })
            .catch((e) => console.log(`order status can't be set to successful`, e.message));
            res.status(200).json({ invoice : data });
        })
        .catch((err) => {
          console.log("invoice not created", err.message);
          res.status(500).json({ error: err.message });
        });
    } else {
      res.json({ message: "order payment not completed" });
    }
  },

  // webhooks : async (request, response) => {
  //   const event = request.body;

  //   // Handle the event
  //   switch (event.type) {
  //     case 'payment_intent.succeeded':
  //       const paymentIntent = event.data.object;
  //       // Then define and call a method to handle the successful payment intent.
  //       // handlePaymentIntentSucceeded(paymentIntent);
  //       break;
  //     case 'payment_method.attached':
  //       const paymentMethod = event.data.object;
  //       // Then define and call a method to handle the successful attachment of a PaymentMethod.
  //       // handlePaymentMethodAttached(paymentMethod);
  //       break;
  //     // ... handle other event types
  //     default:
  //       console.log(`Unhandled event type ${event.type}`);
  //   }

  // //   // Return a response to acknowledge receipt of the event
  // //   res.json({received: true});
  // }
};
