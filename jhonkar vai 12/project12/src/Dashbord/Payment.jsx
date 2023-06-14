import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";



// provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_PK);

const Payment = () => {
  const data = useLoaderData()

  console.log(data)
  

  const getPrice = parseFloat(data.price);
  
  
  const price = getPrice.toFixed(2);
 
  
  return (
    <div>
      <h2>This is the payment section</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} data={data} />
      </Elements>
    </div>
  );
};

export default Payment;
