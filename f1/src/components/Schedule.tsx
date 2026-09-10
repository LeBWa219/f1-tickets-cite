import React, { useState } from "react";
import styles from "./Schedule.module.css";
import { RaceCard } from "./RaceCard";
import { RaceModal } from "./RaceModal";
import melbourneImg from "../assets/melbourne.jpg";
import suzukaImg from "../assets/suzuka.jpg";
import shanghaiImg from "../assets/shanghai.jpg";
import monacoImg from "../assets/monaco.jpg";

interface Race {
  id: string;
  title: string;
  location: string;
  date: string;
  info: string;
  month: string;
  longDescription?: string;
  image: string;
}

export const Schedule: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("ВСЕ");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  const allRaces: Race[] = [
    {
      id: "1",
      title: "FORMULA 1 ROLEX AUSTRALIAN GRAND PRIX 2026",
      location: "Albert Park Circuit",
      date: "Март 6-8, 2026",
      info: "58 кругов • 5.278км",
      month: "МАРТ",
      longDescription:
        "Легендарный старт сезона Формулы-1 пройдёт с 6 по 8 марта 2026 года на живописной трассе Альберт-Парк в Мельбурне. Пилоты преодолеют 58 кругов по скоростной 5,3-километровой трассе, известной зрелищными обгонами и уникальной атмосферой. Не пропустите главное автоспортивное событие года — билеты уже доступны в продаже!",
      image: melbourneImg,
    },
    {
      id: "2",
      title: "FORMULA 1 MSC CRUISES JAPANESE GRAND PRIX 2026",
      location: "Suzuka International Racing Course",
      date: "Март 27-29, 2026",
      info: "53 круга • 5.807км",
      month: "МАРТ",
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
      month: "АПРЕЛЬ",
      longDescription:
        "Гран-при Китая в Шанхае предлагает одну из самых длинных прямых в календаре чемпионата, где скорость болидов превышает 340 км/ч, гарантируя жаркие дуэли с использованием DRS на торможении перед 14-м поворотом.",
      image: shanghaiImg,
    },
    {
      id: "4",
      title: "FORMULA 1 LOUIS VUITTON GRAND PRIX DE MONACO 2026",
      location: "Circuit de Monaco",
      date: "Июнь 5-7, 2026",
      info: "78 кругов • 3.337км",
      month: "ЕЩЕ",
      longDescription:
        "Жемчужина календаря Формулы-1 — Гран-при Монако. Узкие городские улицы Монте-Карло не прощают ошибок. Здесь квалификация важнее самой гонки, а пилоты демонстрируют запредельный уровень концентрации в миллиметрах от железных барьеров.",
      image: monacoImg,
    },
  ];

  const handleOpenModal = (race: Race) => {
    setSelectedRace(race);
    setIsModalOpen(true);
  };

  const filteredRaces =
    activeFilter === "ВСЕ"
      ? allRaces
      : allRaces.filter((race) => race.month === activeFilter);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.titleBlock}>
            <span className={styles.subtitle}>СЕЗОН 2026</span>
            <h1 className={styles.pageTitle}>РАСПИСАНИЕ ГОНОК</h1>
          </div>

          <div className={styles.filterTabs}>
            {["ВСЕ", "МАРТ", "АПРЕЛЬ", "ЕЩЕ"].map((tab) => (
              <button
                key={tab}
                className={`${styles.tabBtn} ${activeFilter === tab ? styles.activeTab : ""}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {filteredRaces.map((race) => (
            <RaceCard key={race.id} race={race} onOpenModal={handleOpenModal} />
          ))}
        </div>
      </div>

      <RaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        race={selectedRace}
      />
    </div>
  );
};
