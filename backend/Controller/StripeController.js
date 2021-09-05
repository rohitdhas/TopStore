const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVET_KEY);
const bodyParser = require("body-parser");
const resMessages = require("./responseMessages");

router.get("/create-checkout", async (req, res) => {
  if (!req.user) return res.json({ message: resMessages.unauthorized });
  try {
    let { cart } = req.user;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: resMessages.err });
  }
});

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const event = request.body;

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        const { email } = paymentIntent.charges.data[0].billing_details;

        User.updateOne({ email }, { $set: { cart: [] } }, (err) => {
          if (err) console.log(err);
          response.end();
        });

        break;
      case "payment_method.attached":
        console.log("PaymentMethod was attached to a Customer!");
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true });
  }
);

module.exports = router;
