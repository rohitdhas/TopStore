import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  const usernameRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    fetch("http://localhost:8080/isAuthenticated", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((isAuthenticated) => {
        if (isAuthenticated) history.push("/");
      })
      .catch((err) => console.log(err));
  }, []);

  function handleLogin(event) {
    event.preventDefault();
    if (!usernameRef.current || !passwordRef.current) return;

    fetch("http://localhost:8080/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ data, message }) => {
        if (!data) {
          console.log(message);
        } else {
          history.goBack();
          console.log(message);
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h1>Login to TopStore</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input ref={usernameRef} type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" />
        </div>
        <button type="submit">Login</button>
        <a href="#">Forget Password</a>
        <p>
          Don't have an Account. <a href="/user/create">Create Here</a>
        </p>
      </form>
    </div>
  );
}
