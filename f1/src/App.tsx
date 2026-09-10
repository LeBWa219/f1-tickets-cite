import React, { useState, useEffect } from "react";
import { MainPage } from "./components/MainPage";
import { AdminPanel } from "./components/AdminPanel";
import { UserCabinet } from "./components/UserCabinet";
import { Schedule } from "./components/Schedule";
import { Teams } from "./components/Teams";
import { Tickets } from "./components/Tickets";
import { Support } from "./components/Support";
import "./app.css";

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("main");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false); // Новое состояние для обычного юзера

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string>(""); // Храним email для ЛК

  // Состояния для формы регистрации
  const [regLogin, setRegLogin] = useState<string>("");
  const [regEmail, setRegEmail] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  const [regPasswordConfirm, setRegPasswordConfirm] = useState<string>("");

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1120 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@racehub.com" && password === "admin123") {
      setIsAdmin(true);
      setIsUser(false);
      setCurrentPage("admin");
      setLoggedInUserEmail("Администратор");
      setEmail("");
      setPassword("");
    } else if (email && password.length >= 4) {
      // Простая имитация входа для обычного пользователя (любой email и пароль от 4 символов)
      setIsUser(true);
      setIsAdmin(false);
      setCurrentPage("cabinet"); // Сразу перенаправляем в личный кабинет
      setLoggedInUserEmail(email);
      setEmail("");
      setPassword("");
    } else {
      alert("Неверный логин или пароль");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regPasswordConfirm) {
      alert("Пароли не совпадают!");
      return;
    }
    alert("Регистрация успешна! Теперь вы можете войти.");
    // Очищаем поля регистрации
    setRegLogin("");
    setRegEmail("");
    setRegPassword("");
    setRegPasswordConfirm("");
    // Перенаправляем на страницу логина
    setCurrentPage("login");
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsUser(false);
    setLoggedInUserEmail("");
    setCurrentPage("main");
  };

  return (
    <div className="appWrapper">
      <header className="siteHeader">
        <div className="headerContainer">
          <div className="logoBlock" onClick={() => handleNavigation("main")}>
            <span className="f1Logo">F1</span>
            <span className="hubText">RACE HUB</span>
          </div>

          <nav className="navigation desktopNav">
            <button
              className={`navLink ${currentPage === "schedule" ? "active" : ""}`}
              onClick={() => handleNavigation("schedule")}
            >
              РАСПИСАНИЕ
            </button>
            <button
              className={`navLink ${currentPage === "teams" ? "active" : ""}`}
              onClick={() => handleNavigation("teams")}
            >
              КОМАНДЫ
            </button>
            <button
              className={`navLink ${currentPage === "tickets" ? "active" : ""}`}
              onClick={() => handleNavigation("tickets")}
            >
              БИЛЕТЫ
            </button>
            {isAdmin && (
              <button
                className={`navLink adminLink ${currentPage === "admin" ? "active" : ""}`}
                onClick={() => handleNavigation("admin")}
              >
                AДМИН-ПАНЕЛЬ
              </button>
            )}
            {isUser && (
              <button
                className={`navLink ${currentPage === "cabinet" ? "active" : ""}`}
                onClick={() => handleNavigation("cabinet")}
              >
                ЛИЧНЫЙ КАБИНЕТ
              </button>
            )}
          </nav>

          <div className="authActions desktopAuth">
            <button
              className={`supportLink ${currentPage === "support" ? "active" : ""}`}
              onClick={() => handleNavigation("support")}
            >
              Поддержка
            </button>
            {isAdmin || isUser ? (
              <div className="userMenu">
                <span
                  className="userEmail"
                  onClick={() =>
                    handleNavigation(isAdmin ? "admin" : "cabinet")
                  }
                >
                  👤 {loggedInUserEmail.split("@")[0]}
                </span>
                <span className="logoutBtn" onClick={handleLogout}>
                  Выйти
                </span>
              </div>
            ) : (
              <button
                className="loginBtn"
                onClick={() => handleNavigation("login")}
              >
                👤 Вход
              </button>
            )}
          </div>

          <button
            className={`burgerBtn ${isMenuOpen ? "burgerActive" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="burgerLine"></span>
            <span className="burgerLine"></span>
            <span className="burgerLine"></span>
          </button>

          <div className={`menuMobile ${isMenuOpen ? "menuActive" : ""}`}>
            <nav className="navigation">
              <button
                className={`navLink ${currentPage === "schedule" ? "active" : ""}`}
                onClick={() => handleNavigation("schedule")}
              >
                РАСПИСАНИЕ
              </button>
              <button
                className={`navLink ${currentPage === "teams" ? "active" : ""}`}
                onClick={() => handleNavigation("teams")}
              >
                КОМАНДЫ
              </button>
              <button
                className={`navLink ${currentPage === "tickets" ? "active" : ""}`}
                onClick={() => handleNavigation("tickets")}
              >
                БИЛЕТЫ
              </button>
              {isAdmin && (
                <button
                  className={`navLink adminLink ${currentPage === "admin" ? "active" : ""}`}
                  onClick={() => handleNavigation("admin")}
                >
                  AДМИН-ПАНЕЛЬ
                </button>
              )}
              {isUser && (
                <button
                  className={`navLink ${currentPage === "cabinet" ? "active" : ""}`}
                  onClick={() => handleNavigation("cabinet")}
                >
                  ЛИЧНЫЙ КАБИНЕТ
                </button>
              )}
            </nav>

            <div className="authActions">
              <button
                className={`supportLink ${currentPage === "support" ? "active" : ""}`}
                onClick={() => handleNavigation("support")}
              >
                Поддержка
              </button>
              {isAdmin || isUser ? (
                <div className="userMenu">
                  <span
                    className="userEmail"
                    onClick={() =>
                      handleNavigation(isAdmin ? "admin" : "cabinet")
                    }
                  >
                    👤 {loggedInUserEmail.split("@")[0]}
                  </span>
                  <span className="logoutBtn" onClick={handleLogout}>
                    Выйти
                  </span>
                </div>
              ) : (
                <button
                  className="loginBtn"
                  onClick={() => handleNavigation("login")}
                >
                  👤 Вход
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mainContent">
        {currentPage === "main" && (
          <MainPage
            onBuyTicketsClick={() => setCurrentPage("tickets")}
            onViewScheduleClick={() => setCurrentPage("schedule")}
          />
        )}

        {currentPage === "schedule" && <Schedule />}

        {currentPage === "teams" && <Teams />}

        {currentPage === "tickets" && <Tickets />}

        {currentPage === "support" && <Support />}

        {currentPage === "login" && (
          <div
            style={{
              width: "100%",
              minHeight: "calc(100vh - 250px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 0",
            }}
          >
            <div
              style={{
                backgroundColor: "#141414",
                padding: "60px 50px",
                borderRadius: "8px",
                border: "1px solid #1f1f2e",
                width: "100%",
                maxWidth: "600px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  fontSize: "36px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ color: "#ff2a24" }}>F1</span>
              </div>
              <h1
                style={{
                  color: "#ffffff",
                  fontSize: "32px",
                  textTransform: "uppercase",
                  margin: "0 0 8px 0",
                  letterSpacing: "1px",
                }}
              >
                ВВОЙДИТЕ В СВОЙ АККАУНТ
              </h1>
              <p
                style={{
                  color: "#a5a5b2",
                  fontSize: "14px",
                  margin: "0 0 40px 0",
                }}
              >
                или{" "}
                <span
                  style={{ color: "#ff2a24", cursor: "pointer" }}
                  onClick={() => setCurrentPage("register")}
                >
                  создайте новый аккаунт
                </span>
              </p>
              <form
                onSubmit={handleLogin}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <input
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #2a2a3a",
                    height: "54px",
                    padding: "0 20px",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  type="email"
                  placeholder="Логин/Почта"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #2a2a3a",
                    height: "54px",
                    padding: "0 20px",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#a5a5b2",
                    fontSize: "14px",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <input type="checkbox" style={{ accentColor: "#ff2a24" }} />
                    Запомнить меня
                  </label>
                  <span style={{ color: "#ff2a24", cursor: "pointer" }}>
                    Забыли пароль?
                  </span>
                </div>
                <button
                  style={{
                    backgroundColor: "#ff2a24",
                    color: "#ffffff",
                    border: "none",
                    height: "54px",
                    borderRadius: "8px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  type="submit"
                >
                  ВОЙТИ
                </button>
              </form>
            </div>
          </div>
        )}

        {currentPage === "register" && (
          <div
            style={{
              width: "100%",
              minHeight: "calc(100vh - 250px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 0",
            }}
          >
            <div
              style={{
                backgroundColor: "#141414",
                padding: "60px 50px",
                borderRadius: "8px",
                border: "1px solid #1f1f2e",
                width: "100%",
                maxWidth: "600px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  fontSize: "36px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ color: "#ff2a24" }}>F1</span>
              </div>
              <h1
                style={{
                  color: "#ffffff",
                  fontSize: "32px",
                  textTransform: "uppercase",
                  margin: "0 0 8px 0",
                  letterSpacing: "1px",
                }}
              >
                СОЗДАЙТЕ СВОЙ АККАУНТ
              </h1>
              <p
                style={{
                  color: "#a5a5b2",
                  fontSize: "14px",
                  margin: "0 0 40px 0",
                }}
              >
                или{" "}
                <span
                  style={{ color: "#ff2a24", cursor: "pointer" }}
                  onClick={() => setCurrentPage("login")}
                >
                  войдите уже в существующий аккаунт
                </span>
              </p>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
                onSubmit={handleRegister}
              >
                <input
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #2a2a3a",
                    height: "54px",
                    padding: "0 20px",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  type="text"
                  placeholder="Введите логин"
                  value={regLogin}
                  onChange={(e) => setRegLogin(e.target.value)}
                  required
                />
                <input
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #2a2a3a",
                    height: "54px",
                    padding: "0 20px",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  type="email"
                  placeholder="Введите адрес электронной почты"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
                <input
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #2a2a3a",
                    height: "54px",
                    padding: "0 20px",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  type="password"
                  placeholder="Придумайте пароль"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
                <input
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #2a2a3a",
                    height: "54px",
                    padding: "0 20px",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  type="password"
                  placeholder="Введите пароль еще раз"
                  value={regPasswordConfirm}
                  onChange={(e) => setRegPasswordConfirm(e.target.value)}
                  required
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    textAlign: "left",
                    color: "#a5a5b2",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ accentColor: "#ff2a24" }}
                      required
                    />
                    Согласие на обработку персональных данных
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <input type="checkbox" style={{ accentColor: "#ff2a24" }} />
                    Согласие на информационную рассылку о акциях и новинках
                  </label>
                </div>
                <button
                  style={{
                    backgroundColor: "#ff2a24",
                    color: "#ffffff",
                    border: "none",
                    height: "54px",
                    borderRadius: "8px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  type="submit"
                >
                  РЕГИСТРАЦИЯ
                </button>
              </form>
            </div>
          </div>
        )}

        {currentPage === "admin" && <AdminPanel onLogout={handleLogout} />}

        {currentPage === "cabinet" && (
          <UserCabinet
            userName={loggedInUserEmail.split("@")[0].toUpperCase()}
            onLogout={handleLogout}
          />
        )}
      </main>

      <footer className="siteFooter">
        <div className="footerContainer">
          <div style={{ fontStyle: "italic", fontWeight: "bold" }}>
            <span style={{ color: "#ff2a24" }}>F1</span> RACE HUB
          </div>
          <div className="subscribeText">ПОДПИСЫВАЙТЕСЬ В СОЦСЕТЯХ</div>
        </div>
      </footer>
    </div>
  );
};
