import React, { useState } from "react";
import { UpcomingRaces } from "./UpcomingRaces";
import { NewsModal } from "./NewsModal";
import styles from "./MainPage.module.css";
import ferrariImg from "../assets/ferrari-news.jpg";
import mercedesImg from "../assets/mercedes-news.jpg";

interface NewsItem {
  id: number;
  title: string;
  badge: string;
  text: string;
  fullText: string;
  imageClass: string;
}

interface MainPageProps {
  onBuyTicketsClick: () => void;
  onViewScheduleClick: () => void;
}

const imageMap: Record<number, string> = {
  1: ferrariImg,
  2: mercedesImg,
};

export const MainPage: React.FC<MainPageProps> = ({
  onBuyTicketsClick,
  onViewScheduleClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const newsData: NewsItem[] = [
    {
      id: 1,
      title: "ФЕРРАРИ - ЧЕМПИОН?!",
      badge: "15 МИНУТ НАЗАД",
      text: "После предсезонных тестов многие эксперты сходятся во мнении, что Скудерия является главным фаворитом этого сезона.",
      fullText:
        "Новостная информация, которая будет на каждом попапе. Дополнительные подробности предсезонных тестов в Бахрейне показывают, что новый двигатель Ferrari демонстрирует потрясающую надежность и стабильность на длинных сериях кругов, опережая график соперников.",
      imageClass: "ferrariImg",
    },
    {
      id: 2,
      title: "СКАНДАЛ ВОКРУГ MERCEDES",
      badge: "1 ЧАС НАЗАД",
      text: "Команды соперников заподозрили, что двигатели Mercedes были созданы в обход серого зон регламента и имеют значительное преимущество.",
      fullText:
        "Новостная информация, которая будет на каждом попапе. Представители трех независимых команд уже направили официальный запрос в FIA с требованием детально изучить геометрию впускного коллектора обновленной силовой установки Брэкли.",
      imageClass: "mercedesImg",
    },
  ];

  const handleOpenModal = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <div className={styles.mainPageWrapper}>
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <span className={styles.badge}>СЛЕДУЮЩЕЕ ГРАН-ПРИ</span>
          <h1 className={styles.heroTitle}>
            ПЕРВАЯ ГОНКА <br /> СЕЗОНА{" "}
            <span className={styles.accentYear}>2026</span>
          </h1>
          <p className={styles.heroDescription}>
            Мельбурн ждёт. Болиды готовы. Сезон начинается здесь. <br />
            Почувствуй пульс скорости на Гран-При Австралии. Рёв V8, запах
            резины и битва за каждый миллиметр асфальта. <br />
            Займи место на трибуне Альберт-парка, пока билеты не сгорели на
            старте!
          </p>
          <div className={styles.heroActions}>
            <button className={styles.primaryBtn} onClick={onBuyTicketsClick}>
              КУПИТЬ БИЛЕТЫ ➜
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={onViewScheduleClick}
            >
              ПОСМОТРЕТЬ РАСПИСАНИЕ
            </button>
          </div>
        </div>
      </section>

      <section className={styles.racesSection}>
        <UpcomingRaces onViewScheduleClick={onViewScheduleClick} />
      </section>

      <section className={styles.newsSection}>
        <h2 className={styles.sectionTitle}>ПОСЛЕДНИЕ НОВОСТИ</h2>
        <div className={styles.newsGrid}>
          {newsData.map((news) => {
            const bgImage = imageMap[news.id];
            return (
              <article
                key={news.id}
                className={styles.newsCard}
                onClick={() => handleOpenModal(news)}
              >
                <div className={styles.cardBgContainer}>
                  {bgImage ? (
                    <img
                      src={bgImage}
                      alt={news.title}
                      className={styles.cardBgImage}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>НЕТ ФОТО</div>
                  )}
                </div>

                <div className={styles.newsContent}>
                  <span className={styles.newsBadge}>{news.badge}</span>
                  <h3 className={styles.newsTitle}>{news.title}</h3>
                  <p className={styles.newsText}>{news.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <NewsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        news={selectedNews}
      />
    </div>
  );
};
