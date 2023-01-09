import React from "react";
import { PayPalScriptProvider, } from "@paypal/react-paypal-js";
import PayPalButtonWrapper from './PayPalButtonWrapper';

const Checkout = () => {
  return (
    <>
      <span>Checkout</span>
      <div style={{ maxWidth: "500px", minHeight: "200px", margin: "0 auto", width: "100%", }}>
        <PayPalScriptProvider
          options={{
            "client-id": "test",
            components: "buttons",
            currency: "EUR"
          }}
        >
          <PayPalButtonWrapper
            amount="2"
            onOrderApproved={() => console.log("order approved")}
            onOrderCreated={() => console.log("order created")}
            showSpinner
          // disabled={true}
          />
        </PayPalScriptProvider>
      </div>
    </>
  );
};

export default Checkout;
