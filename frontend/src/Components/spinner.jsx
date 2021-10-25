import styled from "styled-components";

export default function Spinner() {
  return (
    <Overlay id="loader_overlay">
      <span id="spinner"></span>
    </Overlay>
  );
}

const Overlay = styled.div`
  display: none;
  z-index: 1000;

  &.active {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(20, 19, 19, 0.849);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #spinner {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 7px solid rgba(0, 0, 0, 0.486);
    border-top: 7px solid blueviolet;
    animation: spinner 0.7s infinite;
  }

  @keyframes spinner {
    from {
      transform: rotate(0deg);
      border-top: 7px solid greenyellow;
    }
    to {
      transform: rotate(360deg);
      border-top: 7px solid blueviolet;
    }
  }
`;
