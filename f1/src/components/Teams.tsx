import React from "react";
import styles from "./Teams.module.css";

interface Team {
  id: number;
  name: string;
  code: string;
  drivers: string[];
  points: number;
  teamColor: string; // Фирменный цвет команды для левой линии
}

export const Teams: React.FC = () => {
  const teams: Team[] = [
    {
      id: 1,
      name: "RED BULL RACING",
      code: "RBR",
      drivers: ["Max Verstappen", "Sergio Perez"],
      points: 860,
      teamColor: "#001A30", // Темно-синий
    },
    {
      id: 2,
      name: "MERCEDES",
      code: "MER",
      drivers: ["George Russell", "Kimi Antonelli"],
      points: 409,
      teamColor: "#00A19B", // Бирюзовый
    },
    {
      id: 3,
      name: "FERRARI",
      code: "FER",
      drivers: ["Charles Leclerc", "Lewis Hamilton"],
      points: 406,
      teamColor: "#E10600", // Красный
    },
    {
      id: 4,
      name: "MCLAREN",
      code: "MCL",
      drivers: ["Lando Norris", "Oscar Piastri"],
      points: 302,
      teamColor: "#FF8700", // Оранжевый
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.headerBlock}>
          <span className={styles.subtitle}>СЕЗОН 2026</span>
          <h1 className={styles.pageTitle}>КОМАНДЫ</h1>
        </div>

        <div className={styles.grid}>
          {teams.map((team) => (
            <div key={team.id} className={styles.card}>
              <div
                className={styles.colorBorder}
                style={{ backgroundColor: team.teamColor }}
              />

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.teamName}>{team.name}</h2>
                    <span className={styles.teamCode}>{team.code}</span>
                  </div>

                  <div className={styles.cupIconContainer}>
                    <span className={styles.cupIcon}>🏆</span>
                  </div>
                </div>

                <div className={styles.driversBlock}>
                  <div className={styles.driversTitle}>
                    <span className={styles.driversIcon}>👤</span>
                    <span>гонщики</span>
                  </div>
                  <div className={styles.driversList}>
                    {team.drivers.map((driver, index) => (
                      <p key={index} className={styles.driverName}>
                        {driver}
                      </p>
                    ))}
                  </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.pointsBlock}>
                  <span className={styles.pointsLabel}>ОЧКИ ЗА СЕЗОН</span>
                  <span className={styles.pointsValue}>{team.points}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
