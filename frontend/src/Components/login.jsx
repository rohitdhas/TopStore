import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Box from "../Styles/loginStyles";
import { startSpinner, closeSpinner } from "./spinner";

export default function Login({ notify }) {
  const history = useHistory();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    startSpinner();

    fetch("http://localhost:8080/isAuthenticated", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((isAuthenticated) => {
        closeSpinner();
        if (isAuthenticated) history.push("/");
      })
      .catch((err) => console.log(err));
  }, []);

  function handleLogin(event) {
    startSpinner();
    event.preventDefault();
    if (!emailRef.current || !passwordRef.current) return;

    fetch("http://localhost:8080/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: emailRef.current.value,
        password: passwordRef.current.value,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ data, message }) => {
        closeSpinner();
        if (!data) {
          notify(message);
        } else {
          notify(message);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <Box>
      <h1 id="login_title">Login to TopStore</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input ref={emailRef} type="email" placeholder="Email" />
        </div>
        <div>
          <input ref={passwordRef} type="password" placeholder="Password" />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an Account. <a href="/user/create">Create Here</a>
        </p>
      </form>
    </Box>
  );
}
