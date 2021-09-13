import styled from "styled-components";
import { useEffect } from "react";

export default function PageNotFound() {
  useEffect(() => {
    document.title = "404 - ERR";
  }, []);

  return (
    <Box id="not_found_page">
      <h1>404 - ERR</h1>
      <p>Sorry, The Page you are trying to access is unavailable!</p>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  text-align: center;

  h1 {
    color: tomato;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
  }

  @media (max-width: 750px) {
    p {
      font-size: 1.2rem;
    }
  }
`;
