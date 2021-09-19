import { formatWithValidation } from "next/dist/shared/lib/utils";
import React from "react";

import styles from "./Styles.module.css";

function Login() {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    setError("");
  }
  function onSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) {
    } else {
      setError("Empty field");
    }
  }
  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={onSubmitForm}>
        <h3 className={styles.form_text}>What is your name?</h3>
        <input
          type="text"
          className={styles.form_input}
          placeholder="type here"
          value={value}
          onChange={onChangeInput}
        />
        <span className={styles.form_error}>{error}</span>

        <button className={styles.form_button}>start</button>
      </form>
    </main>
  );
}

export default Login;
