import React from "react";
import styles from "./UpcomingRaces.module.css"; // Используем те же стили для карточек

interface Race {
  id: string;
  title: string;
  location: string;
  date: string;
  info: string;
  month: string; // Поле для фильтрации
  longDescription?: string;
  image: string;
}

interface RaceCardProps {
  race: Race;
  onOpenModal: (race: Race) => void;
}

export const RaceCard: React.FC<RaceCardProps> = ({ race, onOpenModal }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}>
        <span className={styles.badge}>Предстоит</span>
        <img
          src={race.image}
          alt={race.title}
          className={styles.raceImage} // Добавьте класс для стилизации
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{race.title}</h3>
        <div className={styles.meta}>
          <p>📍 {race.location}</p>
          <p>📅 {race.date}</p>
          <p>🏁 {race.info}</p>
        </div>
        <div className={styles.cardButtons}>
          <button className={styles.buyBtn}>КУПИТЬ БИЛЕТЫ</button>
          <button className={styles.infoBtn} onClick={() => onOpenModal(race)}>
            БОЛЬШЕ ИНФОРМАЦИИ
          </button>
        </div>
      </div>
    </div>
  );
};
