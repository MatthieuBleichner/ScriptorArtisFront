import React, { useState } from "react";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { gql } from "../../src/__generated__/gql";
import { useTranslation } from "react-i18next";

const LOGIN = gql(/* GraphQL */ `
  mutation login($input: loginInput!) {
    login(input: $input)
  }
`);

const Login = (): JSX.Element => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();

  const onButtonClick = (): void => {
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if (email === "") {
      setEmailError(t("Authentication.EmailError"));
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError(t("Authentication.EmailNotValid"));
      return;
    }

    if (password === "") {
      setPasswordError(t("Authentication.MissingPassword"));
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
          setPasswordError(t("Authentication.InvalidMailOrPassword"));
        }
      })
      .catch(() => {
        setPasswordError(t("Authentication.InvalidMailOrPassword"));
      });
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>{t("Authentication.Title")}</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder={t("Authentication.EnterMail")}
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
          placeholder={t("Authentication.EnterPassword")}
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
          value={t("Authentication.Login")}
        />
      </div>
    </div>
  );
};

export default Login;
