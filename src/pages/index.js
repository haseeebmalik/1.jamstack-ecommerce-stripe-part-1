import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const IndexPage = (props) => {
  console.log("props", props);
  const stripePromise = loadStripe(
    "pk_test_51JagUeCE3jhPVdWsoteTE4pfDQIJM4JKBckIVik3rU9BVus94QFc0LIRvGrzBF8LdcEzzpmsKHYQWpELoikvuh9c00kUrZR3iV"
  );
  const redirectToCheckout = async () => {
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_1JaiQYCE3jhPVdWspFCnYdbZ", quantity: 1 }],
      successUrl: `${props.location.origin}/payment-success/`,
      cancelUrl: `${props.location.origin}/payment-error`,
    });
  };

  return (
    <main>
      HELLO WORLD
      <button onClick={redirectToCheckout}>Checkout</button>
    </main>
  );
};

export default IndexPage;
