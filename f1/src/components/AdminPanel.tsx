import React, { useState } from "react";
import styles from "./AdminPanel.module.css";

interface Race {
  id: number;
  title: string;
  location: string;
  date: string;
  info: string;
  longDescription: string;
}

interface QAItem {
  id: number;
  question: string;
  answer: string;
}

interface Message {
  id: number;
  sender: "admin" | "user";
  text: string;
  time: string;
}

interface Chat {
  id: number;
  title: string;
  lastMessage: string;
  unread?: boolean;
  messages: Message[];
}

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<"chats" | "races" | "qa">("chats");

  const [races, setRaces] = useState<Race[]>([
    {
      id: 1,
      title: "Formula 1 Rolex Australian Grand Prix 2026",
      location: "Albert Park Circuit",
      date: "Март 6-8, 2026",
      info: "58 кругов • 5.278км",
      longDescription: "",
    },
    {
      id: 2,
      title: "Formula 1 MSC Cruises Japanese Grand Prix 2026",
      location: "Suzuka International Racing Course",
      date: "Март 27-29, 2026",
      info: "53 круга • 5.807км",
      longDescription: "",
    },
    {
      id: 3,
      title: "Formula 1 Lenovo Chinese Grand Prix 2026",
      location: "Shanghai International Circuit",
      date: "Апрель 9-12, 2026",
      info: "56 кругов • 5.451км",
      longDescription: "",
    },
    {
      id: 4,
      title: "Formula 1 Crypto.com Miami Grand Prix 2026",
      location: "Miami International Autodrome",
      date: "Июнь 5-7, 2026",
      info: "57 кругов • 5.412км",
      longDescription: "",
    },
  ]);

  const [qaList, setQaList] = useState<QAItem[]>([
    {
      id: 1,
      question: "Как купить билеты?",
      answer:
        "Выберите гран-при и категорию билета на сайте, оплатите онлайн. Билет придёт на email в течение 5 минут",
    },
    {
      id: 2,
      question: "Нужна ли распечатка билета?",
      answer: "Нет, достаточно показать QR-код с телефона на входе.",
    },
    {
      id: 3,
      question: "Нужен ли билет ребенку?",
      answer:
        "Дети до 3 лет — бесплатно без места. От 3 лет и старше — нужен полный билет.",
    },
    {
      id: 4,
      question: "Где парковаться?",
      answer:
        "На официальных парковках автодрома. Однако на всех гонках организован трансфер такси, который будет удобней и быстрее",
    },
  ]);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: "ВОПРОС №1",
      lastMessage: "здравствуйте",
      messages: [
        { id: 1, sender: "user", text: "Здравствуйте", time: "14:00" },
        {
          id: 2,
          sender: "admin",
          text: "Здравствуйте, какая у вас проблема?",
          time: "14:00",
        },
      ],
    },
    {
      id: 2,
      title: "ВОПРОС №2",
      lastMessage: "Не пришли билеты",
      unread: true,
      messages: [
        {
          id: 1,
          sender: "user",
          text: "Не пришли билеты на почту после оплаты",
          time: "14:05",
        },
      ],
    },
    {
      id: 3,
      title: "ВОПРОС №3",
      lastMessage: "Здравствуйте, какая у вас проблема ?",
      messages: [],
    },
    {
      id: 4,
      title: "ВОПРОС №4",
      lastMessage: "Здравствуйте, какая у вас проблема ?",
      messages: [],
    },
    {
      id: 5,
      title: "ВОПРОС №5",
      lastMessage: "Здравствуйте, какая у вас проблема ?",
      messages: [],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [replyText, setReplyText] = useState("");

  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentRace, setCurrentRace] = useState<Race | null>(null);
  const [currentQA, setCurrentQA] = useState<QAItem | null>(null);

  const handleSendMessage = () => {
    if (!replyText.trim()) return;
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            lastMessage: replyText,
            messages: [
              ...c.messages,
              {
                id: Date.now(),
                sender: "admin",
                text: replyText,
                time: "14:00",
              },
            ],
          };
        }
        return c;
      }),
    );
    setReplyText("");
  };

  const handleDeleteRace = (id: number) => {
    setRaces((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDeleteQA = (id: number) => {
    setQaList((prev) => prev.filter((q) => q.id !== id));
  };

  const selectedChat = chats.find((c) => c.id === activeChatId);

  return (
    <div className={styles.adminWrapper}>
      <aside
        className={styles.sidebar}
        style={{
          minWidth: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div className={styles.sidebarTop}>
          <div className={styles.adminTitle}>
            <span className={styles.logoAccent}>F1</span> АДМИН
          </div>
          <ul
            className={styles.menuList}
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            <li
              className={`${styles.menuItem} ${activeTab === "chats" ? styles.activeItem : ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
              onClick={() => {
                setActiveTab("chats");
                setEditMode(false);
              }}
            >
              <span>💬</span> <span>ЧАТЫ ПОДДЕРЖКИ</span>
            </li>
            <li
              className={`${styles.menuItem} ${activeTab === "races" ? styles.activeItem : ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                whiteSpace: "nowrap",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={() => {
                setActiveTab("races");
                setEditMode(false);
              }}
            >
              <span>⚙️</span> <span>ГОНКИ</span>
            </li>
            <li
              className={`${styles.menuItem} ${activeTab === "qa" ? styles.activeItem : ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                whiteSpace: "nowrap",
                cursor: "pointer",
                marginTop: "10px",
                marginLeft: "5px",
              }}
              onClick={() => {
                setActiveTab("qa");
                setEditMode(false);
              }}
            >
              <span>!?</span> <span>Q&A</span>
            </li>
          </ul>
        </div>

        <button
          style={{
            marginTop: "40px",
            padding: "16px 25px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#ffffff",
            fontSize: "20px",
            fontWeight: "600",
            border: "none",
            background: "none",
            width: "100%",
            textAlign: "left",
            borderTop: "1px solid #1f1f2e",
            whiteSpace: "nowrap",
            boxSizing: "border-box",
          }}
          onClick={onLogout}
        >
          <span style={{ fontSize: "20px" }}>➔</span>
          <span style={{ letterSpacing: "0.5px", fontSize: "20px" }}>
            ВЫХОД
          </span>
        </button>
      </aside>

      <main className={styles.contentArea}>
        {activeTab === "chats" && (
          <div className={styles.chatContainer}>
            <div className={styles.chatMain}>
              <div className={styles.chatHeader}>{selectedChat?.title}</div>
              <div className={styles.messagesArea}>
                {selectedChat?.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`${styles.msgRow} ${m.sender === "admin" ? styles.msgRowAdmin : styles.msgRowUser}`}
                  >
                    {m.sender === "user" && (
                      <div className={styles.userAvatar}>👤</div>
                    )}
                    <div
                      className={`${styles.msgBubble} ${m.sender === "admin" ? styles.msgAdmin : styles.msgUser}`}
                    >
                      {m.text}
                      <span className={styles.msgTime}>{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.inputBar}>
                <button className={styles.iconBtn}>📄</button>
                <button className={styles.iconBtn}>☺</button>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    placeholder="Введите сообщение ...."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                </div>
                <button className={styles.sendBtn} onClick={handleSendMessage}>
                  ➔
                </button>
              </div>
            </div>
            <div className={styles.sidebarChats}>
              <div className={styles.chatListHeader}>ЧАТЫ</div>
              {chats.map((c) => (
                <div
                  key={c.id}
                  className={`${styles.chatItem} ${c.id === activeChatId ? styles.chatItemActive : ""}`}
                  onClick={() => setActiveChatId(c.id)}
                >
                  <div className={styles.chatMeta}>
                    <h4>{c.title}</h4>
                    <p>{c.lastMessage}</p>
                  </div>
                  {c.unread && <div className={styles.badgeCount}>1</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "races" && !editMode && (
          <div className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Управление гонками</h2>
              <button
                className={styles.addBtn}
                onClick={() => {
                  setCurrentRace(null);
                  setEditMode(true);
                }}
              >
                + Добавить гонку
              </button>
            </div>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Название гонки</th>
                  <th>Трек</th>
                  <th>Дата</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {races.map((r) => (
                  <tr key={r.id}>
                    <td>{r.title}</td>
                    <td>{r.location}</td>
                    <td>{r.date}</td>
                    <td className={styles.actionCell}>
                      <button
                        className={styles.editIcon}
                        onClick={() => {
                          setCurrentRace(r);
                          setEditMode(true);
                        }}
                      >
                        📝
                      </button>
                      <button
                        className={styles.deleteIcon}
                        onClick={() => handleDeleteRace(r.id)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "races" && editMode && (
          <div className={styles.panelCard}>
            <h2 className={styles.panelTitle}>Изменить информацию гонки</h2>
            <div style={{ marginTop: "30px" }}>
              <div className={styles.formGroup}>
                <label>Название гонки</label>
                <input type="text" defaultValue={currentRace?.title || ""} />
              </div>
              <div className={styles.formGroupRow}>
                <div className={styles.formGroup}>
                  <label>Название трека</label>
                  <input
                    type="text"
                    defaultValue={currentRace?.location || ""}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Дата</label>
                  <input type="text" defaultValue={currentRace?.date || ""} />
                </div>
              </div>
              <div className={styles.formGroupRow}>
                <div className={styles.formGroup}>
                  <label>Статус</label>
                  <input type="text" defaultValue="Предстоит" />
                </div>
                <div className={styles.formGroup}>
                  <label>Месяц (для фильтров)</label>
                  <input type="text" defaultValue="Март" />
                </div>
              </div>
              <div className={styles.formGroupRow}>
                <div className={styles.formGroup}>
                  <label>Количество кругов</label>
                  <input type="text" defaultValue="58 кругов" />
                </div>
                <div className={styles.formGroup}>
                  <label>Длина гонки</label>
                  <input type="text" defaultValue="5.278км" />
                </div>
              </div>
              <button
                className={styles.saveBtn}
                onClick={() => setEditMode(false)}
              >
                Сохранить изменения
              </button>
            </div>
          </div>
        )}

        {activeTab === "qa" && !editMode && (
          <div className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Управление гонками</h2>
              <button
                className={styles.addBtn}
                onClick={() => {
                  setCurrentQA(null);
                  setEditMode(true);
                }}
              >
                + Добавить вопрос
              </button>
            </div>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Заголовок</th>
                  <th>Ответ на вопрос</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {qaList.map((q) => (
                  <tr key={q.id}>
                    <td style={{ width: "30%", fontWeight: "bold" }}>
                      {q.question}
                    </td>
                    <td style={{ color: "#a5a5b2" }}>{q.answer}</td>
                    <td className={styles.actionCell}>
                      <button
                        className={styles.editIcon}
                        onClick={() => {
                          setCurrentQA(q);
                          setEditMode(true);
                        }}
                      >
                        📝
                      </button>
                      <button
                        className={styles.deleteIcon}
                        onClick={() => handleDeleteQA(q.id)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "qa" && editMode && (
          <div className={styles.panelCard}>
            <h2 className={styles.panelTitle}>Изменить информацию гонки</h2>
            <div style={{ marginTop: "30px" }}>
              <div className={styles.formGroup}>
                <label>Заголовок вопроса</label>
                <input type="text" defaultValue={currentQA?.question || ""} />
              </div>
              <div className={styles.formGroup}>
                <label>Ответ на вопрос</label>
                <textarea defaultValue={currentQA?.answer || ""} />
              </div>
              <button
                className={styles.saveBtn}
                onClick={() => setEditMode(false)}
              >
                Сохранить изменения
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
