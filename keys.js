if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
  }

exports.stripe = {
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY
  };