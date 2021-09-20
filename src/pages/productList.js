import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { graphql, StaticQuery, useStaticQuery } from "gatsby";
const ProductList = (props) => {
  const data = useStaticQuery(
    graphql`
      query ProductPrices {
        prices: allStripePrice {
          edges {
            node {
              id
              active
              currency
              unit_amount
              product {
                id
                name
                images
              }
            }
          }
        }
      }
    `
  );
  console.log("stripe Data =", data);
  const stripePromise = loadStripe(
    "pk_test_51JagUeCE3jhPVdWsoteTE4pfDQIJM4JKBckIVik3rU9BVus94QFc0LIRvGrzBF8LdcEzzpmsKHYQWpELoikvuh9c00kUrZR3iV"
  );
  const redirectToCheckout = async (id) => {
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: id, quantity: 1 }],
      successUrl: `${props.location.origin}/payment-success/`,
      cancelUrl: `${props.location.origin}/payment-error`,
    });
  };

  return (
    <main>
      Product List
      {data.prices.edges.map((node) => (
        <div key={node.node.id}>
          <div>Product Name: {node.node.product.name}</div>
          <div>Product Price: {node.node.unit_amount / 100}</div>
          <div>
            <img width="200px" src={node.node.product.images[0]} />
          </div>
          <button
            onClick={() => {
              redirectToCheckout(node.node.id);
            }}
          >
            Checkout
          </button>
        </div>
      ))}
    </main>
  );
};

export default ProductList;
