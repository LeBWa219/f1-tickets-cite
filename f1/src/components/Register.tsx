import React, { useState } from "react";
import styles from "./Login.module.css";

interface RegisterProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({
  onRegisterSuccess,
  onSwitchToLogin,
}) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreePd, setAgreePd] = useState(false);
  const [agreePromo, setAgreePromo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !login ||
      !email ||
      !password ||
      password !== confirmPassword ||
      !agreePd
    ) {
      return;
    }

    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Пользователь с таким логином или email уже существует",
          );
        }
        return res.json();
      })
      .then(() => {
        onRegisterSuccess();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.authCard}>
        <div className={styles.logoBlock}>
          <span className={styles.f1Logo}>F1</span>
          <span className={styles.hubText}>RACE HUB</span>
        </div>

        <h2 className={styles.authTitle}>СОЗДАЙТЕ СВОЙ АККАУНТ</h2>
        <p className={styles.switchText}>
          или{" "}
          <span className={styles.switchLink} onClick={onSwitchToLogin}>
            войдите уже в существующий аккаунт
          </span>
        </p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Введите логин"
              className={styles.authInput}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Введите адрес электронной почты"
              className={styles.authInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Придумайте пароль"
              className={styles.authInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Введите пароль еще раз"
              className={styles.authInput}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className={styles.consentBlock}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={agreePd}
                onChange={(e) => setAgreePd(e.target.checked)}
                className={styles.hiddenCheckbox}
              />
              <div
                className={`${styles.customCheckbox} ${agreePd ? styles.checked : ""}`}
              />
              <span className={styles.consentText}>
                Согласие на обработку персональных данных
              </span>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={agreePromo}
                onChange={(e) => setAgreePromo(e.target.checked)}
                className={styles.hiddenCheckbox}
              />
              <div
                className={`${styles.customCheckbox} ${agreePromo ? styles.checked : ""}`}
              />
              <span className={styles.consentText}>
                Согласие на информационную рассылку о акциях и новинках
              </span>
            </label>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={!agreePd}
          >
            РЕГИСТРАЦИЯ
          </button>
        </form>
      </div>
    </div>
  );
};
