import React from "react";
import { Header } from "./Header";
import { api } from "../utils/Api";
import { Link, useNavigate } from "react-router-dom";
import { InfoTooltip } from "./InfoTooltip";

export function Register() {
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
      .signUp({ email, password })
      .then((response) => {
        if (response.data) {
          setEmail("");
          setPassword("");

          setRegistrationResponse({ success: true });
        }
      })
      .catch((error) => {
        console.log(error);
        setRegistrationResponse({ success: false, error });
      });
  }

  const [registrationResponse, setRegistrationResponse] = React.useState(false);

  function closeAllPopups() {
    setRegistrationResponse(null);

    if (registrationResponse.success) {
      navigate("/sign-in", { replace: true });
    }
  }

  return (
    <div className="page">
      <Header>
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </Header>

      <main>
        <form onSubmit={handleSubmit}>
          <section className="auth">
            <h1 className="auth__title">Регистрация</h1>
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
              Зарегистрироваться
            </button>
            <Link to="/sign-in">
              <button type="button" className="auth__container-alt-btn">
                Уже зарегистрированы? Войти
              </button>
            </Link>
          </section>
        </form>
      </main>

      <InfoTooltip onClose={closeAllPopups} response={registrationResponse} />
    </div>
  );
}
