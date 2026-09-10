import React, { useState } from "react";
import styles from "./UpcomingRaces.module.css";
import { RaceModal } from "./RaceModal";
import melbourneImg from "../assets/melbourne.jpg";
import suzukaImg from "../assets/suzuka.jpg";
import shanghaiImg from "../assets/shanghai.jpg";

interface Race {
  id: string;
  title: string;
  location: string;
  date: string;
  info: string;
  longDescription: string;
  image: string;
}

interface UpcomingRacesProps {
  onViewScheduleClick?: () => void;
}

export const UpcomingRaces: React.FC<UpcomingRacesProps> = ({
  onViewScheduleClick,
}) => {
  // Состояния для управления модальным окном
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  const races: Race[] = [
    {
      id: "1",
      title: "FORMULA 1 ROLEX AUSTRALIAN GRAND PRIX 2026",
      location: "Albert Park Circuit",
      date: "Март 6-8, 2026",
      info: "58 кругов • 5.278км",
      longDescription:
        "Легендарный старт сезона Формулы-1 пройдёт с 6 по 8 марта 2026 года на живописной трассе Альберт-Парк в Мельбурне. Пилоты преодолеют 58 кругов по скоростной 5,3-километровой трассе, известной зрелищными обгонами и уникальной атмосферой. Не пропустите главное автоспортивное событие года — билеты уже доступны в продаже!",
      image: melbourneImg,
    },
    {
      id: "2",
      title: "FORMULA 1 MSC CRISES JAPANESE GRAND PRIX 2026",
      location: "Suzuka International Racing Course",
      date: "Март 27-29, 2026",
      info: "53 круга • 5.807км",
      longDescription:
        'Уникальная культовая трасса Сузука в форме восьмерки встретит команды в конце марта. Известная своими сложнейшими поворотами 130R и "Эсками", Сузука станет настоящей проверкой аэродинамики болидов нового сезона 2026 года.',
      image: suzukaImg,
    },
    {
      id: "3",
      title: "FORMULA 1 LENOVO CHINESE GRAND PRIX 2026",
      location: "Shanghai International Circuit",
      date: "Апрель 10-12, 2026",
      info: "56 кругов • 5.451км",
      longDescription:
        "Гран-при Китая в Шанхае предлагает одну из самых длинных прямых в календаре чемпионата, где скорость болидов превышает 340 км/ч, гарантируя жаркие дуэли с использованием DRS на торможении перед 14-м поворотом.",
      image: shanghaiImg,
    },
  ];

  const handleOpenModal = (race: Race) => {
    setSelectedRace(race);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRace(null);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h2 className={styles.sectionTitle}>ПРЕДСТОЯЩИЕ ГОНКИ</h2>
          <span className={styles.allLink} onClick={onViewScheduleClick}>
            СМОТРЕТЬ ПОЛНОЕ РАСПИСАНИЕ ➜
          </span>
        </div>

        <div className={styles.grid}>
          {races.map((race) => (
            <div key={race.id} className={styles.card}>
              <div className={styles.imagePlaceholder}>
                <img
                  src={race.image}
                  alt={race.title}
                  className={styles.raceImage}
                />
                <span className={styles.badge}>Предстоит</span>
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

                  <button
                    className={styles.infoBtn}
                    onClick={() => handleOpenModal(race)}
                  >
                    БОЛЬШЕ ИНФОРМАЦИИ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RaceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        race={selectedRace}
      />
    </section>
  );
};
