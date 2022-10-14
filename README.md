# Ecommerce


## full stack ecommerece site with authentication, add to cart, payment with razorpay

### front end is built with React, tailwind css with react-router-dom for internal routing, axios for network requests, razorpay for payments

### back end is bult with Node.js, Express.js for creating server, mongoose for mongodb and JWT for authentication


## copy repo and goto server directory
 `npm start` will start server and serve static files on localhost


## for razorpay to work you'll need razorpay account 
## for razorpay webhook to test on localhost we can use ngrok 

## env variables required
### DATABASE_URI
### PORT 
### YOUR_DOMAIN
### JWT_ACCESS_TOKEN
### RAZORPAY_SECRET
### RAZORPAY_KEY_ID
### RAZORPAY_WEBHOOK_SECRET

## also add razorpay client id to frontend billing component
