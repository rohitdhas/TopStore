import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Box from "../Styles/loginStyles";

export default function Login({ notify }) {
  const history = useHistory();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const localhost = "http://localhost:8080/";

  useEffect(() => {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

    fetch(localhost + "isAuthenticated", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((isAuthenticated) => {
        loader.classList.remove("active");
        if (isAuthenticated) history.push("/");
      })
      .catch((err) => console.log(err));
  }, []);

  function handleLogin(event) {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

    event.preventDefault();
    if (!emailRef.current || !passwordRef.current) return;

    fetch(localhost + "login", {
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
        if (!data) {
          loader.classList.remove("active");
          notify(message);
        } else {
          notify(message);
          loader.classList.remove("active");
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
