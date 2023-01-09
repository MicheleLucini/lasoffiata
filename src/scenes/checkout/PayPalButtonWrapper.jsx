import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// This values are the props in the UI
const style = { "layout": "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const PayPalButtonWrapper = ({
  amount,
  currency,
  disabled,
  onOrderApproved,
  onOrderCreated,
  showSpinner,
}) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, showSpinner]);


  const createOrder = (data, actions) => {
    const options = {
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
          },
        },
      ],
    };
    return actions.order.create(options)
      .then((orderId) => {
        // Your code here after create the order
        onOrderCreated();
        return orderId;
      });
  }

  const onApprove = (data, actions) => {
    return actions.order.capture()
      .then(function () {
        // Your code here after capture the order
        onOrderApproved();
      });
  }

  return (
    <>
      {(showSpinner && isPending) && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={disabled || !amount}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </>
  );
}

PayPalButtonWrapper.propTypes = {
  amount: PropTypes.string,
  currency: PropTypes.string,
  disabled: PropTypes.bool,
  onOrderApproved: PropTypes.func.isRequired,
  onOrderCreated: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool,
};

PayPalButtonWrapper.defaultProps = {
  amount: null,
  currency: "EUR",
  disabled: false,
  showSpinner: false,
};

export default PayPalButtonWrapper;
