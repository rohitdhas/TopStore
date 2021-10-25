import { useRef, useEffect } from "react";
import Form from "../Styles/registerFormStyles";
import { useUserAuth } from "../helpers/userHandler";

export default function CreateAc() {
  const fullNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const password_againRef = useRef("");

  const refs = { fullNameRef, emailRef, passwordRef, password_againRef };
  const { checkIfAuthenticated, handleAccountCreation } = useUserAuth();

  useEffect(() => {
    document.title = "Create New Account";
    checkIfAuthenticated();
  }, []);

  return (
    <Form>
      <h1>Create an Account</h1>
      <form onSubmit={(e) => handleAccountCreation(e, refs)}>
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
