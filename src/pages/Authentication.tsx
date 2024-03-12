import React, { useState } from "react";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { gql } from "../../src/__generated__/gql";
// import {
//   type Task as ITask,
//   type TaskFilters,
// } from "../../src/__generated__/graphql";

// import { useNavigate } from "react-router-dom";

const LOGIN = gql(/* GraphQL */ `
  mutation login($input: loginInput!) {
    login(input: $input)
  }
`);

const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();

  // const navigate = useNavigate();

  const onButtonClick = (): void => {
    console.log("onButtonClick");
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if (email === "") {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (password === "") {
      setPasswordError("Please enter a password");
      return;
    }

    login({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
      .then((res) => {
        if (
          res.data !== null &&
          res?.data?.login !== null &&
          res?.data?.login !== ""
        ) {
          document.cookie = "token=" + res?.data?.login;
          navigate("/Dashboard");
        } else {
          setPasswordError("Invalid mail or password");
        }
      })
      .catch(() => {
        setPasswordError("Wrong mail or password");
      });
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => {
            setEmail(ev.target.value);
          }}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          type={"password"}
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
