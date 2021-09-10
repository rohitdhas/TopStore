import styled from "styled-components";

export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  background-color: white;
  padding: 7px 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: rgb(38, 57, 77) 0px 7px 7px -10px;
  z-index: 100000;

  .logo a {
    padding: 0;
    font-size: 1.8rem;
    font-weight: bold;
    text-decoration: none;
    color: black;

    span {
      margin: 0;
      font-weight: lighter;
      transition: color 0.2s;
    }
    &:hover {
      span {
        color: blueviolet;
      }
    }
  }

  span {
    margin: 0 10px;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      font-size: 1.03rem;
      border: 1px solid gray;
      border-radius: 7px 0 0 7px;
      display: inline-block;
      padding: 5px 10px;
      font-size: 17px;
      transition: all 0.2s;
    }
    button {
      display: inline-block;
      padding: 6px 10px;
      font-size: 17px;
      outline: none;
      cursor: pointer;
      border: none;
      border-radius: 0 7px 7px 0;
      background-color: #1f1e1e;
      color: white;

      &:hover {
        background-color: blueviolet;
      }
    }
  }

  @media (max-width: 750px) {
    padding: 5px 20px;

    form {
      display: none;
    }

    .logo a {
      font-size: 1.7rem;
    }
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  #login_btn {
    padding: 7px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: blueviolet;

    &:hover {
      background-color: #681ab1;
    }
  }

  a {
    text-decoration: none;
    color: black;

    &:hover {
      color: blueviolet;
      text-decoration: underline;
    }
  }

  i {
    font-size: 2rem;
    cursor: pointer;
    color: #3b3b3b;

    &:hover {
      color: blueviolet;
    }
  }

  #profile_dropdown {
    .overlay.active {
      display: block;
    }

    .overlay {
      display: none;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    ul.active {
      display: block;
    }

    ul {
      z-index: 10000;
      display: none;
      list-style: none;
      border: 2px solid #510797;
      border-radius: 7px;
      position: absolute;
      right: 40%;
      margin-top: 15px;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 20px;
        background-color: #510797;
        height: 30px;
        width: 30px;
        transform: translateY(-15px);
        clip-path: polygon(50% 0, 100% 50%, 50% 50%, 0 50%);
      }

      img {
        height: 40px;
        width: 40px;
        margin: 0 5px;
        border-radius: 50%;
      }
      li {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #510797;
        padding: 7px;
        background-color: #a765e4;
        &:hover {
          background-color: #59208fea;
          cursor: pointer;
          color: white;
          i {
            color: white;
          }
        }
      }

      li:last-child {
        border-bottom: none;
      }
    }
  }

  @media (max-width: 750px) {
    display: none;
  }
`;

export const NavItemsMobile = styled.div`
  display: none;

  @media (max-width: 750px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 35%;
    i {
      color: black;
      font-size: 1.3rem;
    }
  }
`;

export const SideBarBox = styled.div`
  position: absolute;

  #sidebar_overlay.active {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #00000050;
    z-index: 100;
  }
  ul {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 70%;
    background-color: #161a1d;
    z-index: 1000;
    list-style: none;
    transform: translateX(1000px);
    transition: all 0.3s ease-in;

    li {
      padding: 8px 5px 8px 10px;
      border-bottom: 1px solid black;
      color: white;
      background-color: #9a3cf1;
      display: flex;
      align-items: center;

      &:first-child {
        padding: 10px;
        font-weight: bold;
        font-size: 1.4rem;
        background-color: #5e1c9c;
      }

      a {
        text-decoration: none;
        color: white;
      }
      i {
        color: white;
      }

      span {
        margin: 0 7px 0 0;
      }

      &:hover {
        background-color: #5a109e;
      }
    }

    &.active {
      transform: translateX(0);
    }
  }
`;
