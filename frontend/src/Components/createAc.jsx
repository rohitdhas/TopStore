import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from "../Styles/registerFormStyles";
import { closeSpinner, startSpinner } from "./spinner";

export default function CreateAc({ notify }) {
  const fullNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const password_againRef = useRef("");
  const history = useHistory();

  useEffect(() => {
    startSpinner();
    fetch("http://localhost:8080/data", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ data }) => {
        closeSpinner();
        if (!data) return;
        history.goBack();
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAccountCreation(e) {
    startSpinner();
    e.preventDefault();
    const userInputsRefs = [
      fullNameRef,
      emailRef,
      passwordRef,
      password_againRef,
    ];

    // Validations for empty values and mismatched passwords
    userInputsRefs.forEach((input) => {
      if (!input.current.value) {
        closeSpinner();
        return;
      }
    });

    if (passwordRef.current.value !== password_againRef.current.value) {
      closeSpinner();
      notify("Passwords don't Match!❌");
      return;
    }

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
      .then(({ message, status }) => {
        closeSpinner();
        notify(message);
        if (status === "success") {
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Form>
      <h1>Create an Account</h1>
      <form onSubmit={handleAccountCreation}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" ref={fullNameRef} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            ref={passwordRef}
            required
            minLength={5}
            maxLength={10}
          />
        </div>
        <div>
          <label htmlFor="password_again">Retype Password</label>
          <input
            type="password"
            ref={password_againRef}
            required
            minLength={5}
            maxLength={10}
          />
        </div>
        <button type="submit">Create Account</button>
        <p>
          <a href="/login">Click Here</a> to Log in
        </p>
      </form>
    </Form>
  );
}
