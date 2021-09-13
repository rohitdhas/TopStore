import styled from "styled-components";
import { useEffect } from "react";

export default function PaymentSuccess() {
  useEffect(() => {
    document.title = "Payment Successful🚀";
  }, []);

  return (
    <Box id="payment-success-page">
      <p>Thanks for shopping with TopStore!🎉</p>
    </Box>
  );
}

const Box = styled.div`
  margin: 60px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;
