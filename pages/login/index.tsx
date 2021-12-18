import router from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/user";
import { CircularProgress } from "@mui/material";
import styles from "./Styles.module.css";
import axios from "axios";
import { API_URL } from "../../config";

function Login() {
  let id = 0;
  if (typeof window !== "undefined") {
    id = parseInt(localStorage.getItem("id"));
  }
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
      dispatch(loginUser(value, id));
      setIsLoading(true);
      setTimeout(() => {
        router.push("/");
      }, 500);
      axios
        .post(`${API_URL}api/user/change/status`, {
          id: id,
          isOnline: true,
        })
        .catch(() => {});
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
