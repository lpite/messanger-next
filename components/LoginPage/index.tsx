import React from "react";
import { supabase } from "../../supaBase";

export default function LoginPage() {
    const [errors, setErrors] = React.useState<string[]>([]);

    const [userData, setUserData] = React.useState({
      email: "",
      name: "",
      password: "",
    });
  
    async function singUpUser(e: React.FormEvent) {
      e.preventDefault();
      if (userData.name.length) {
        let { user, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
        });
        console.log(user, error);
      } else {
        setErrors(["Enter your name"]);
      }
    }
    async function signInWithGoogle() {
      const { user, session, error } = await supabase.auth.signIn({
        provider: "google",
      });
      console.log(user);
    }
  return (
    <main className="login_page">
      <form action="" onSubmit={singUpUser} className="login_page__form">
        <h1 className="form_name">Sign up</h1>
        <label className="label">
          Email
          <input
            onChange={({ target }) =>
              setUserData({ ...userData, email: target.value })
            }
            value={userData.email}
            type="email"
            className="input"
          />
        </label>
        <label className="label">
          Name
          <input
            onChange={({ target }) =>
              setUserData({ ...userData, name: target.value })
            }
            value={userData.name}
            type="text"
            className="input"
          />
        </label>
        <label className="label">
          Password
          <input
            onChange={({ target }) =>
              setUserData({ ...userData, password: target.value })
            }
            value={userData.password}
            type="password"
            className="input"
          />
        </label>
        <div className="form_buttons">
          <span>{errors[0]}</span>

          <button className="button sign_up_button">Sign up</button>
          <button type="button" className="link_button">
            Sign in
          </button>

          {/* <button type="button" onClick={signInWithGoogle}>google</button> */}
        </div>
      </form>
    </main>
  );
}
