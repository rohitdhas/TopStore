import styled from "styled-components";

export const Box = styled.ul`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  z-index: 100;

  li {
    list-style: none;
  }
`;

export const Card = styled.li`
  height: auto;
  width: max-content;
  background-color: #892be2b3;
  border: 2px solid blueviolet;
  font-size: 1.2rem;
  padding: 10px;
  margin: 10px auto;
  color: white;
  border-radius: 5px;
  transform: translateY(70px);
  transition: all 0.2s ease-in-out;

  &.active {
    opacity: 1;
    transform: translateY(-20px);
  }

  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;
