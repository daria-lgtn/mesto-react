import React from "react";
import { Header } from "./Header";
import { api } from "../utils/Api";
import { Link, useNavigate } from "react-router-dom";

export function Login(props) {
  const { handleLogin } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    api
      .signIn({ email, password })
      .then((data) => {
        if (data.token) {
          setEmail("");
          setPassword("");

          handleLogin(data.token);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <Header>
        <Link to="/sign-up" className="auth__link">
          Регистрация
        </Link>
      </Header>

      <main>
        <form onSubmit={handleSubmit}>
          <section className="auth">
            <h1 className="auth__title">Войти</h1>
            <label className="auth__container-field">
              <input
                name="email"
                placeholder="Email"
                required
                minLength="2"
                maxLength="40"
                className="auth__container-input"
                value={email}
                onChange={handleEmailChange}
              />
            </label>
            <label className="auth__container-field">
              <input
                name="password"
                placeholder="Пароль"
                required
                minLength="2"
                maxLength="200"
                className="auth__container-input"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            <button type="submit" className="auth__container-save-btn">
              Войти
            </button>
          </section>
        </form>
      </main>
    </div>
  );
}
