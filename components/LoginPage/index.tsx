import React from "react";
import { useProfilePageStore } from "../../store/profilePageStore";
import { useSignInPageStore } from "../../store/signInPageStore";

import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const [errors, setErrors] = React.useState<string[]>([]);

  const [pageType, setPageType] = React.useState<"signUp" | "signIn">("signIn");

  const [userData, setUserData] = React.useState({
    email: "",
    name: "",
    password: "",
  });

  const { setUser } = useProfilePageStore((state) => state);
  const { isOpen ,closeSignInPage} = useSignInPageStore((state) => state);

  async function signUpUser(e: React.FormEvent) {
    e.preventDefault();

  }
  async function signInUser(e: React.FormEvent) {
    e.preventDefault();
   
  }

  function onChangeEmail({ target }: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, email: target.value });

    if (!target.value.length && errors.length) {
      setErrors(["Enter your email"]);
    } else {
      setErrors([]);
    }
  }

  function onChangeName({ target }: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, name: target.value });

    if (!target.value.length && errors.length) {
      setErrors(["Enter your name"]);
    } else {
      setErrors([]);
    }
  }

  function onChangePassword({ target }: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, password: target.value });

    if (!target.value.length && errors.length) {
      setErrors(["Enter your password"]);
    } else {
      setErrors([]);
    }
  }

  function changePageType() {
    if (pageType === "signIn") {
      setPageType("signUp");
    } else {
      setPageType("signIn");
    }
    setUserData({ email: "", name: "", password: "" });
    setErrors([]);
  }

  return (
    <main className={isOpen ? styles["login_page--open"] : styles.login_page}>
      <form
        action="/"
        onSubmit={pageType === "signUp" ? signUpUser : signInUser}
        className={styles.login_page__form}
      >
        <h1 className={styles.form_name}>{pageType==="signUp"?"Sign up":"Sign in"}</h1>
        <label className={styles.label}>
          Email
          <input
            onChange={onChangeEmail}
            value={userData.email}
            type="email"
            className={styles.input}
          />
        </label>
        {pageType === "signUp" ? (
          <label className={styles.label}>
            Name
            <input
              onChange={onChangeName}
              value={userData.name}
              type="text"
              className={styles.input}
            />
          </label>
        ) : (
          ""
        )}

        <label className={styles.label}>
          Password
          <input
            onChange={onChangePassword}
            value={userData.password}
            type="password"
            className={styles.input}
          />
        </label>
        <div className={styles.form_buttons}>
          <span className={styles.error_message}>{errors[0]}</span>
          <button className="button big_button">
            {pageType === "signIn" ? "Sign In" : "Sign Up"}
          </button>
          <button
            type="button"
            className="link_button"
            onClick={changePageType}
          >
            {pageType === "signUp" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </form>
    </main>
  );
}
