import React, { useState } from "react";
import styles from "./UserCabinet.module.css";

interface Ticket {
  id: number;
  raceTitle: string;
  date: string;
  grandstand: string;
  status: "confirmed" | "pending";
}

interface UserCabinetProps {
  userName?: string;
  onLogout: () => void;
}

export const UserCabinet: React.FC<UserCabinetProps> = ({
  userName = "*имя пользователя*",
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<"tickets" | "settings">("tickets");

  const [tickets] = useState<Ticket[]>([
    {
      id: 1,
      raceTitle: "FORMULA 1 ROLEX AUSTRALIAN GRAND PRIX 2026",
      date: "Март 6-8, 2026",
      grandstand: "2x Основная трибуна",
      status: "confirmed",
    },
    {
      id: 2,
      raceTitle: "FORMULA 1 MSC CRUISES JAPANESE GRAND PRIX 2025",
      date: "Март 27-29, 2026",
      grandstand: "1x Общий доступ",
      status: "pending",
    },
  ]);

  return (
    <div className={styles.cabinetWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarTitle}>
            <span className={styles.logoAccent}>F1</span> АККАУНТ
          </div>

          <ul className={styles.menuList}>
            <li
              className={`${styles.menuItem} ${activeTab === "tickets" ? styles.menuItemActive : ""}`}
              onClick={() => setActiveTab("tickets")}
            >
              <span>🎟️</span> БИЛЕТЫ
            </li>
            <li
              className={`${styles.menuItem} ${activeTab === "settings" ? styles.menuItemActive : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <span>⚙️</span> НАСТРОЙКИ
            </li>
          </ul>
        </div>

        <button className={styles.logoutBtn} onClick={onLogout}>
          <span>➔</span> ВЫХОД
        </button>
      </aside>

      <main className={styles.contentArea}>
        <h1 className={styles.welcomeTitle}>ДОБРО ПОЖАЛОВАТЬ, {userName}</h1>
        <p className={styles.subtitle}>
          {activeTab === "tickets"
            ? "Ваши предстоящие гонки"
            : "Управление вашими личными данными"}
        </p>

        {activeTab === "tickets" && (
          <div className={styles.panelCard}>
            <h3 className={styles.panelCardTitle}>Мои билеты</h3>

            <div className={styles.ticketsList}>
              {tickets.map((ticket) => (
                <div key={ticket.id} className={styles.ticketItem}>
                  <div className={styles.ticketInfoGroup}>
                    <div className={styles.trackPlaceholder}></div>
                    <div>
                      <h4 className={styles.raceTitle}>{ticket.raceTitle}</h4>
                      <div className={styles.ticketMetaRows}>
                        <span>📅 {ticket.date}</span>
                        <span>🎫 {ticket.grandstand}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {ticket.status === "confirmed" ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <span className={styles.statusConfirmed}>
                          Подтверждено
                        </span>
                        <button className={styles.downloadBtn}>
                          СКАЧАТЬ ПДФ
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <span className={styles.statusPending}>
                          Ожидает оплаты
                        </span>
                        <button className={styles.payBtn}>ОПЛАТИТЬ</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className={styles.panelCard} style={{ padding: "30px" }}>
            <h3
              className={styles.panelCardTitle}
              style={{ marginBottom: "24px" }}
            >
              Личная информация
            </h3>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Имя</label>
                  <input type="text" />
                </div>
                <div className={styles.formGroup}>
                  <label>Фамилия</label>
                  <input type="text" />
                </div>
              </div>

              <div className={styles.formGroupFull}>
                <label>Email адрес</label>
                <input type="email" />
              </div>

              <div className={styles.formGroupFullLast}>
                <label>Номер телефона</label>
                <input type="tel" />
              </div>

              <div className={styles.saveBtnWrapper}>
                <button type="submit" className={styles.saveBtn}>
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
