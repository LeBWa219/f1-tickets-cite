import React from "react";
import styles from "./RaceModal.module.css";
import melbournemapImg from "../assets/melbournemap.jpg";
import suzukamapImg from "../assets/suzukamap.jpg";
import shanghaimapImg from "../assets/shanghaimap.jpg";
import monacomapImg from "../assets/monacomap.jpg";

interface RaceData {
  id: string;
  title: string;
  location: string;
  date: string;
  info: string;
  longDescription?: string; // Подробное описание для поп-апа
  image: string;
}

interface RaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  race: RaceData | null;
}

export const RaceModal: React.FC<RaceModalProps> = ({
  isOpen,
  onClose,
  race,
}) => {
  // Если окно закрыто или данных нет — ничего не рендерим
  if (!isOpen || !race) return null;

  // Словарь для связи ID гонки с импортированной картинкой схемы трассы
  const mapImages: { [key: string]: string } = {
    "1": melbournemapImg,
    "2": suzukamapImg,
    "3": shanghaimapImg,
    "4": monacomapImg,
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imageContainer}>
          <div className={styles.trackImagePlaceholder}>
            {mapImages[race.id] ? (
              <img
                src={mapImages[race.id]}
                alt={`Схема трассы ${race.location}`}
                className={styles.trackImage}
              />
            ) : (
              <span>СХЕМА ТРАССЫ #{race.id} ВСПЛЫВАЮЩЕЕ ОКНО</span>
            )}
          </div>
        </div>

        <div className={styles.contentContainer}>
          <h2 className={styles.title}>{race.title}</h2>
          <p className={styles.description}>
            {race.longDescription ||
              `Подробная информация о Гран-при на трассе ${race.location}. Заезд состоится ${race.date}.`}
          </p>

          <button className={styles.closeBtn} onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#E10600"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
