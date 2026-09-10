import React from "react";
import styles from "./Hero.module.css";

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.badge}>СЛЕДУЮЩЕЕ ГРАН-ПРИ</div>
        <h1 className={styles.title}>
          ПЕРВАЯ ГОНКА <br />
          СЕЗОНА <span className={styles.year}>2026</span>
        </h1>
        <p className={styles.description}>
          Мельбурн ждёт. Болиды готовы. Сезон начинается здесь. <br />
          Почувствуй пульс скорости на Гран-При Австралии. Рёв V8, запах резины
          и битва за каждый миллиметр асфальта. Займи место на трибуне
          Альберт-парка, пока билеты не сгорели на старте!
        </p>
        <div className={styles.buttons}>
          <button className={styles.primaryBtn}>КУПИТЬ БИЛЕТЫ ➜</button>
          <button className={styles.secondaryBtn}>ПОСМОТРЕТЬ РАСПИСАНИЕ</button>
        </div>
      </div>
    </section>
  );
};
