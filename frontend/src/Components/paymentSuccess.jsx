import styled from "styled-components";

export default function PaymentSuccess() {
  return (
    <Box>
      <h1>Thanks for shopping with TopStore!🎉</h1>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;
