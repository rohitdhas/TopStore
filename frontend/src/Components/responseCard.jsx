import styled from "styled-components";

export default function ResCard({ message }) {
  return (
    <Box>
      <Card id="card">
        <p>{message}</p>
      </Card>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  height: auto;
  width: max-content;
  background-color: #4ccd32;
  font-size: 1.2rem;
  padding: 10px;
  margin: 10px auto;
  color: white;
  border-radius: 5px;
  z-index: 100;
  transform: translateY(70px) scaleX(0);
  transition: all 0.5s ease-in-out;
  position: fixed;
  bottom: 0;
  opacity: 0;

  &.active {
    opacity: 1;
    transform: translateY(-20px) scaleX(1);
  }
`;
