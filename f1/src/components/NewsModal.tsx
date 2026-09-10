import React from "react";
import styles from "./NewsModal.module.css";
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

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: NewsItem | null;
}

const imageMap: Record<string, string> = {
  ferrariImg: ferrariImg,
  mercedesImg: mercedesImg,
  ferrariCard: ferrariImg,
  mercedesCard: mercedesImg,
};

export const NewsModal: React.FC<NewsModalProps> = ({
  isOpen,
  onClose,
  news,
}) => {
  if (!isOpen || !news) return null;

  const currentImage = imageMap[news.imageClass] || "";

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div
          className={styles.modalImage}
          style={{
            backgroundImage: currentImage ? `url(${currentImage})` : undefined,
          }}
        />

        <div className={styles.modalBody}>
          <h3 className={styles.modalTitle}>{news.title}</h3>
          <p className={styles.modalText}>{news.fullText}</p>

          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
