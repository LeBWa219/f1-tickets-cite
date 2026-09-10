import React, { useState } from "react";
import styles from "./Login.module.css";

interface LoginProps {
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  onSwitchToRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Неверный логин или пароль");
        }
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        onLoginSuccess();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <span className={styles.f1Red}>F1</span>
        </div>

        <h1 className={styles.title}>ВВОЙДИТЕ В СВОЙ АККАУНТ</h1>
        <p className={styles.subtitle}>
          или{" "}
          <span className={styles.switchLink} onClick={onSwitchToRegister}>
            создайте новый аккаунт
          </span>
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Логин/Почта"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={styles.row}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Запомнить меня</span>
            </label>
            <span className={styles.forgotPassword}>Забыли пароль?</span>
          </div>

          <button type="submit" className={styles.submitBtn}>
            ВОЙТИ
          </button>
        </form>
      </div>
    </div>
  );
};
