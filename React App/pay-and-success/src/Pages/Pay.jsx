import StripeCheckout from 'react-stripe-checkout';

const KEY = "pk_test_51NG1WpSIIu6JmYd9PqGQqgDeVletlMnMfIiijxWprLWWz0eZBV8eL9t4VR1Fx74tRiCuUEJK8Ppn1UlW3cw4JOM700pGb3Leqg";

const Pay = () => {

  const onToken = (token) => {
    console.log(token);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <StripeCheckout
        name="Lama Shop"
        image="https://avatars.githubusercontent.com/u/1486366?v=4"
        billingAddress
        shippingAddress
        description= "Your total is $20"
        amount = {3000}
        token={onToken}
        stripekey= {KEY}
      >
      <button
        style={{
          border: "none",
          width: 120,
          borderRadius: 5,
          padding: "20px",
          backgroundColor: "black",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
        }}>
        Pay Now
      </button>
    </StripeCheckout>

    </div >
  )
}

export default Pay