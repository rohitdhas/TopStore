import styled from "styled-components";

export default function Footer() {
  return <Bar>&#169; 2021 TopStore. All Rights Reserved</Bar>;
}

const Bar = styled.footer`
  padding: 20px 40px;
  text-align: end;
  background-color: #252525;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;

  @media (max-width: 750px) {
    font-size: 0.8rem;
    padding: 15px 20px;
  }
`;
