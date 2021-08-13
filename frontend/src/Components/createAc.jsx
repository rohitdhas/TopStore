import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function CreateAc() {
  const fullNameRef = useRef("");
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const password_againRef = useRef("");

  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:8080/data", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ data, message }) => {
        if (!data) {
          console.log(message);
          return;
        }
        history.push("/");
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAccountCreation(e) {
    e.preventDefault();
    const userInputsRefs = [
      fullNameRef,
      usernameRef,
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
      username: usernameRef.current.value,
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
      .then(({ message }) => console.log(message))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h2>Create an Account</h2>
      <form onSubmit={handleAccountCreation}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" ref={fullNameRef} />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" ref={usernameRef} />
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
          <a href="/">Click Here</a> To Log in
        </h3>
      </form>
    </div>
  );
}
