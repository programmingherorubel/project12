import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

import "../Style/CheckoutForm.css";

const CheckoutForm = ({ price, data }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentData, setPaymentData] = useState("");

  useEffect(() => {
    axios
      .post("https://project12server-programmingherorubel.vercel.app/create-payment-intent", {
        price,
      })
      .then((res) => setPaymentData(res.data.clientSecret));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error.message);
      setCardError(error.message);
      return;
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      paymentData,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (confirmError) {
      alert(confirmError);
    }

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // save payment information
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        beforePaymentClassId: data._id,
        className: data.className,
        imageUrl: data.imageUrl,
        instructorName: data.instructorName,
        instructorEmail: data.instructorEmail,
      };

      axios.post("https://project12server-programmingherorubel.vercel.app/payments", payment).then((res) => {
        if (res.data.insertedId) {
          alert("added successfully");
        }
      });
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn w-100 bg-warning"
          type="submit"
          disabled={!stripe || !paymentData || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-danger">{cardError}</p>}
      {transactionId && (
        <p className="text-success">
          Payment Complete With TransactionID : {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
