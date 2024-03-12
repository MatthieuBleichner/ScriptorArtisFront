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

const SIGNIN = gql(/* GraphQL */ `
  mutation signin($input: registerInput!) {
    register(input: $input) {
      email
      password
    }
  }
`);

const AUTH_LOGIN = "login";
const AUTH_SIGNIN = "signin";

const Login = (): JSX.Element => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [mode, setMode] = useState<"login" | "signin">(AUTH_LOGIN);

  const [login] = useMutation(LOGIN);
  const [signin] = useMutation(SIGNIN);

  const navigate = useNavigate();

  const onButtonClick = (): void => {
    setEmailError("");
    setPasswordError("");
    setFirstNameError("");
    setLastNameError("");

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

    if (firstName === "" && mode === AUTH_SIGNIN) {
      setFirstNameError(t("Authentication.EmailError"));
      return;
    }

    if (lastName === "" && mode === AUTH_SIGNIN) {
      setLastNameError(t("Authentication.EmailError"));
      return;
    }

    if (mode === AUTH_LOGIN) {
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
    } else {
      signin({
        variables: {
          input: {
            email,
            password,
            firstName,
            lastName,
          },
        },
      })
        .then((res) => {
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
        })
        .catch(() => {});
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>{t("Authentication.Title")}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            onClick={() => {
              setMode(AUTH_LOGIN);
            }}
            value={t("Authentication.Login")}
          />
        </div>
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            onClick={() => {
              setMode(AUTH_SIGNIN);
            }}
            value={t("Authentication.Signin")}
          />
        </div>
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
      {mode === AUTH_SIGNIN ? (
        <>
          <div className={"inputContainer"}>
            <input
              value={firstName}
              placeholder={t("Authentication.firstNamePlaceHolder")}
              onChange={(ev) => {
                setFirstName(ev.target.value);
              }}
              className={"inputBox"}
            />
            <label className="errorLabel">{firstNameError}</label>
          </div>
          <br />

          <div className={"inputContainer"}>
            <input
              value={lastName}
              placeholder={t("Authentication.lastNamePlaceHolder")}
              onChange={(ev) => {
                setLastName(ev.target.value);
              }}
              className={"inputBox"}
            />
            <label className="errorLabel">{lastNameError}</label>
          </div>
          <br />
        </>
      ) : null}
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={t("Authentication.Validate")}
        />
      </div>
    </div>
  );
};

export default Login;
