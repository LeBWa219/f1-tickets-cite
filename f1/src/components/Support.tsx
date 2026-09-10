import React, { useState } from "react";
import styles from "./Support.module.css";

interface QAItem {
  id: number;
  question: string;
  answer: string;
}

export const Support: React.FC = () => {
  const [activeQA, setActiveQA] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const qaData: QAItem[] = [
    {
      id: 1,
      question: "Как купить билеты?",
      answer:
        "Выберите нужный Гран-при в разделе «Билеты», укажите категорию трибуны, количество мест и нажмите кнопку оплаты.",
    },
    {
      id: 2,
      question: "Нужна ли распечатка билета?",
      answer:
        "Нет, достаточно показать QR-код билета на экране вашего мобильного устройства при входе на автодром.",
    },
    {
      id: 3,
      question: "Нужен ли билет ребенку?",
      answer:
        "Детям до 7 лет вход бесплатный без предоставления отдельного места в сопровождении взрослых.",
    },
    {
      id: 4,
      question: "Где парковаться?",
      answer:
        "На официальных парковках автодрома. Однако на всех гонках организован трансфер такси, который будет удобней и быстрее.",
    },
  ];

  const toggleQA = (id: number) => {
    setActiveQA(activeQA === id ? null : id);
  };

  return (
    <div className={styles.container}>
           {" "}
      <div className={styles.supportCard}>
               {" "}
        <div className={styles.chatSection}>
                    <div className={styles.sectionHeader}>ВОПРОС</div>         {" "}
          <div className={styles.chatBody}>
                       {" "}
            <div className={styles.messagesContainer}>
                           {" "}
              <div className={styles.incomingMessageWrapper}>
                               {" "}
                <div className={styles.avatar}>
                                   {" "}
                  <span className={styles.avatarText}>F1</span>             
                   {" "}
                </div>
                               {" "}
                <div className={styles.messageBlock}>
                                   {" "}
                  <div className={styles.incomingMessage}>
                                        Здравствуйте , какая у вас проблема ?  
                                   {" "}
                  </div>
                                   {" "}
                  <span className={styles.timeLabel}>14:00</span>             
                   {" "}
                </div>
                             {" "}
              </div>
                           {" "}
              <div className={styles.outgoingMessageWrapper}>
                               {" "}
                <div className={styles.messageBlockRight}>
                                   {" "}
                  <div className={styles.outgoingMessage}>Здравствуйте</div>   
                               {" "}
                  <span className={styles.timeLabelRight}>14:00</span>         
                       {" "}
                </div>
                                <div className={styles.userAvatar}></div>       
                     {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className={styles.inputArea}>
                            <button className={styles.attachBtn}></button>     
                      <button className={styles.emojiBtn}></button>
                           {" "}
              <input
                type="text"
                placeholder="Введите сообщение ....."
                className={styles.messageInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
                            <button className={styles.sendBtn}></button>       
                 {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
               {" "}
        <div className={styles.qaSection}>
                    <div className={styles.sectionHeader}>Q&A</div>         {" "}
          <div className={styles.qaBody}>
                       {" "}
            {qaData.map((item) => (
              <div
                key={item.id}
                className={`${styles.qaItem} ${activeQA === item.id ? styles.qaItemActive : ""}`}
              >
                               {" "}
                <div
                  className={styles.qaQuestionRow}
                  onClick={() => toggleQA(item.id)}
                >
                                   {" "}
                  <span className={styles.qaQuestion}>{item.question}</span>   
                               {" "}
                  <span
                    className={`${styles.arrow} ${activeQA === item.id ? styles.arrowUp : ""}`}
                  ></span>
                                 {" "}
                </div>
                               {" "}
                {activeQA === item.id && (
                  <div className={styles.qaAnswer}>{item.answer}</div>
                )}
                             {" "}
              </div>
            ))}
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};
