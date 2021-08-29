import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function CreateAc({ notify }) {
  const fullNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const password_againRef = useRef("");

  const history = useHistory();

  useEffect(() => {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

    fetch("http://localhost:8080/data", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (!data) {
          loader.classList.remove("active");
          return;
        }
        loader.classList.remove("active");
        history.goBack();
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAccountCreation(e) {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

    e.preventDefault();
    const userInputsRefs = [
      fullNameRef,
      emailRef,
      passwordRef,
      password_againRef,
    ];

    // Validations for empty values and mismatched passwords
    userInputsRefs.forEach((input) => {
      if (!input.current.value) return;
    });

    if (passwordRef.current.value !== password_againRef.current.value) return;

    const userData = {
      full_name: fullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // Making a POST request to the server with userData to create an account!
    fetch("http://localhost:8080/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ message }) => {
        loader.classList.remove("active");
        history.push("/login");
        notify(message);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Form>
      <h1>Create an Account</h1>
      <form onSubmit={handleAccountCreation}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" ref={fullNameRef} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordRef} />
        </div>
        <div>
          <label htmlFor="password_again">Retype Password</label>
          <input type="password" ref={password_againRef} />
        </div>
        <button type="submit">Create Account</button>
        <h3>
          <a href="/login">Click Here</a> To Log in
        </h3>
      </form>
    </Form>
  );
}

const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  h1 {
    margin-bottom: 20px;
  }

  form {
    border-radius: 7px;
    padding: 20px;
    background-color: #892be2a0;
    border: 2px solid blueviolet;
    color: white;

    input {
      color: white;
      border: none;
      background: transparent;
      border-bottom: 1px solid white;
      outline: none;
      height: 30px;
      width: 100%;
      margin: 5px 0;
      font-size: 1.03rem;
      transition: all 0.2s;

      ::placeholder {
        color: white;
      }

      &:focus {
        border-bottom: 2px solid blueviolet;
      }
    }

    button {
      padding: 5px 10px;
      margin: 10px 0;
      outline: none;
      border: none;
      cursor: pointer;
      background-color: white;
      font-size: 1.1rem;
      border-radius: 5px;
      /* transition: all 0.3s; */
    }
  }
`;
