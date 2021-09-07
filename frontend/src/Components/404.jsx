import styled from "styled-components";

export default function PageNotFound() {
  return (
    <Box id="not_found_page">
      <h1>404 ERROR</h1>
      <p>Sorry, The Page you are trying to access is unavailable!</p>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 90vh;
  text-align: center;

  h1 {
    color: tomato;
    margin-bottom: 10px;
    text-decoration: underline;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
