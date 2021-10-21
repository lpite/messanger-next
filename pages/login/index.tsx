import router from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/user";
import { CircularProgress } from "@mui/material";
import styles from "./Styles.module.css";

function Login() {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const dispatch = useDispatch();
  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    setError("");
  }
  function onSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) {
      dispatch(loginUser(value));
      setIsLoading(true);
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else {
      setError("Empty field");
    }
  }
  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={onSubmitForm} action="/">
        <h3 className={styles.form_text}>What is your name?</h3>
        <input
          type="text"
          className={styles.form_input}
          placeholder="type here"
          value={value}
          onChange={onChangeInput}
        />
        <span className={styles.form_error}>{error}</span>
        {isLoading ? (
          <>
            <div className={styles.form_loading_div}></div>
            <CircularProgress
              style={{ position: "fixed", top: "calc(50% - 40px)", zIndex: 4 }}
            />
          </>
        ) : (
          ""
        )}

        <button className={styles.form_button}>start</button>
      </form>
    </main>
  );
}

export default Login;
