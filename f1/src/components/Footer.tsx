import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoRow}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>F1</div>
            <span className={styles.logoText}>RACE HUB</span>
          </div>
        </div>

        <div className={styles.socialsColumn}>
          <span className={styles.subscribeText}>ПОДПИСЫВАЙТЕСЬ</span>
          <div className={styles.socialIcons}>
            <div className={styles.iconItem}>TW</div>
            <div className={styles.iconItem}>TWITCH</div>
            <div className={styles.iconItem}>YT</div>
            <div className={styles.iconItem}>INST</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
