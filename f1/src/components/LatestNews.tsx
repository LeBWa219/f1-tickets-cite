import React from "react";
import styles from "./LatestNews.module.css";
// Импортируй свои картинки
import ferrariImg from "../assets/ferrari.jpg";
import mercedesImg from "../assets/mercedes.jpg";

export const LatestNews: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>ПОСЛЕДНИЕ НОВОСТИ</h2>

        <div className={styles.grid}>
          <div className={styles.newsCard}>
            <div
              className={styles.imagePlaceholder}
              style={{ backgroundImage: `url(${ferrariImg})` }}
            />
            <div className={styles.cardOverlay}>
              <span className={styles.date}>18 ФЕВРАЛЯ, 2026</span>
              <h3 className={styles.newsTitle}>ФЕРРАРИ - ЧЕМПИОН?!</h3>
              <p className={styles.newsDescription}>
                После предсезонных тестов многие эксперты сходятся во мнении,
                что Скудерия является главным фаворитом этого сезона.
              </p>
            </div>
          </div>

          <div className={styles.newsCard}>
            <div
              className={styles.imagePlaceholder}
              style={{ backgroundImage: `url(${mercedesImg})` }}
            />
            <div className={styles.cardOverlay}>
              <span className={styles.date}>11 МАРТА, 2026</span>
              <h3 className={styles.newsTitle}>СКАНДАЛ ВОКРУГ MERCEDES</h3>
              <p className={styles.newsDescription}>
                Команды соперников заподозрили, что двигатели Mercedes были
                созданы с умными серыми зонами регламента.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
