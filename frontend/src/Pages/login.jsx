import { useRef, useEffect } from "react";
import Box from "../Styles/loginStyles";
import { useUserAuth } from "../helpers/userHandler";

export default function Login({ notify }) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { handleLogin, checkIfAuthenticated } = useUserAuth();

  useEffect(() => {
    document.title = "Login";
    checkIfAuthenticated();
  }, []);

  return (
    <Box>
      <h1 id="login_title">Login to TopStore</h1>
      <form onSubmit={(e) => handleLogin(e, emailRef, passwordRef)}>
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
