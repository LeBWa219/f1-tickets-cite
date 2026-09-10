import React, { useState } from "react";
import styles from "./Tickets.module.css";

interface RaceTickets {
  raceName: string;
  date: string;
  prices: {
    grandstand: number;
    pitlane: number;
    general: number;
  };
}

export const Tickets: React.FC = () => {
  // Состояния для степера покупки
  const [step, setStep] = useState<number>(1); // 1 - выбор, 2 - оплата, 3 - готово
  const [selectedRace, setSelectedRace] = useState<string>(
    "FORMULA 1 ROLEX AUSTRALIAN GRAND PRIX 2026",
  );
  const [selectedTicket, setSelectedTicket] = useState<string>("grandstand");
  const [quantity, setQuantity] = useState<number>(1);

  // Данные полей формы оплаты
  const [formData, setFormData] = useState({
    fullName: "Иванов Иван Иванович",
    email: "example@example.com",
    cardNumber: "0000 0000 0000 0000",
    expiry: "ММ/ГГ",
    cvc: "000",
  });

  const racesData: RaceTickets[] = [
    {
      raceName: "FORMULA 1 ROLEX AUSTRALIAN GRAND PRIX 2026",
      date: "Март 6-8, 2026",
      prices: { grandstand: 450, pitlane: 600, general: 250 },
    },
    {
      raceName: "FORMULA 1 GULF AIR BAHRAIN GRAND PRIX 2026",
      date: "Март 20-22, 2026",
      prices: { grandstand: 520, pitlane: 750, general: 300 },
    },
    {
      raceName: "FORMULA 1 SAUDI ARABIAN GRAND PRIX 2026",
      date: "Март 27-29, 2026",
      prices: { grandstand: 490, pitlane: 700, general: 280 },
    },
    {
      raceName: "FORMULA 1 PIRELLI GRAND PRIX DE FRANCE 2026",
      date: "Июнь 26-28, 2026",
      prices: { grandstand: 550, pitlane: 800, general: 320 },
    },
  ];

  const currentRaceData =
    racesData.find((r) => r.raceName === selectedRace) || racesData[0];

  const ticketDescriptions = {
    grandstand: {
      name: "ГЛАВНАЯ ТРИБУНА",
      desc: "Лучший вид на старт/финишную прямую",
    },
    pitlane: { name: "ПИТ ЛЕЙН", desc: "Эксклюзивный доступ к боксам команд" },
    general: {
      name: "ОБЩИЙ ДОСТУП",
      desc: "Доступ ко всем основным местам просмотра",
    },
  };

  type TicketKey = "grandstand" | "pitlane" | "general";
  const ticketPrice = currentRaceData.prices[selectedTicket as TicketKey];
  const serviceFee = 15;
  const subtotal = ticketPrice * quantity;
  const totalAmount = subtotal + serviceFee;

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity((prev) => prev + 1);
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setStep(1);
    setQuantity(1);
    setSelectedTicket("grandstand");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Шапка страницы */}
        <div className={styles.headerBlock}>
          <span className={styles.subtitle}>ЗАБРОНИРУЙ СВОИ МЕСТА</span>
          <h1 className={styles.pageTitle}>БРОНИРОВАНИЕ БИЛЕТОВ</h1>
        </div>

        {/* Прогресс-бар (Степер) */}
        <div className={styles.stepper}>
          <div className={styles.stepItem}>
            <div
              className={`${styles.stepCircle} ${step >= 1 ? styles.stepActive : ""}`}
            >
              {step > 1 ? "✓" : "1"}
            </div>
            <span className={styles.stepLabel}>ВЫБОР</span>
          </div>
          <div className={styles.stepLine} />
          <div className={styles.stepItem}>
            <div
              className={`${styles.stepCircle} ${step >= 2 ? styles.stepActive : ""}`}
            >
              {step > 2 ? "✓" : "2"}
            </div>
            <span className={styles.stepLabel}>ОПЛАТА</span>
          </div>
          <div className={styles.stepLine} />
          <div className={styles.stepItem}>
            <div
              className={`${styles.stepCircle} ${step === 3 ? styles.stepActive : ""}`}
            >
              3
            </div>
            <span className={styles.stepLabel}>ГОТОВО</span>
          </div>
        </div>

        {/* Основной контент бронирования */}
        {step < 3 ? (
          <div className={styles.bookingGrid}>
            {/* ЛЕВАЯ ЧАСТЬ: Формы шагов */}
            <div className={styles.mainCard}>
              {/* ШАГ 1: Выбор билета */}
              {step === 1 && (
                <div>
                  <div className={styles.cardSectionTitle}>
                    <span className={styles.sectionIcon}>🎫</span> ВЫБЕРИТЕ
                    БИЛЕТ
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.inputLabel}>выберите гонку</label>
                    <select
                      className={styles.selectInput}
                      value={selectedRace}
                      onChange={(e) => {
                        setSelectedRace(e.target.value);
                        setQuantity(1);
                      }}
                    >
                      {racesData.map((race, index) => (
                        <option key={index} value={race.raceName}>
                          {race.raceName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.inputLabel}>
                      Категория билета
                    </label>
                    <div className={styles.ticketOptionsList}>
                      {(Object.keys(ticketDescriptions) as TicketKey[]).map(
                        (key) => {
                          const info = ticketDescriptions[key];
                          const price = currentRaceData.prices[key];

                          return (
                            <label
                              key={key}
                              className={`${styles.ticketOptionCard} ${selectedTicket === key ? styles.ticketSelected : ""}`}
                            >
                              <input
                                type="radio"
                                name="ticketType"
                                checked={selectedTicket === key}
                                onChange={() => setSelectedTicket(key)}
                                className={styles.hiddenRadio}
                              />
                              <div className={styles.radioCustom}>
                                <div className={styles.radioInner} />
                              </div>
                              <div className={styles.ticketCardInfo}>
                                <span className={styles.ticketName}>
                                  {info.name}
                                </span>
                                <span className={styles.ticketDesc}>
                                  {info.desc}
                                </span>
                              </div>
                              <span className={styles.ticketPrice}>
                                ${price}
                              </span>
                            </label>
                          );
                        },
                      )}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.inputLabel}>Количество</label>
                    <div className={styles.counterBlock}>
                      <button
                        className={styles.counterBtn}
                        onClick={() => handleQuantityChange("dec")}
                      >
                        -
                      </button>
                      <span className={styles.counterValue}>{quantity}</span>
                      <button
                        className={styles.counterBtn}
                        onClick={() => handleQuantityChange("inc")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.actionRowRight}>
                    <button
                      className={styles.nextBtn}
                      onClick={() => setStep(2)}
                    >
                      Следующий шаг &gt;
                    </button>
                  </div>
                </div>
              )}

              {/* ШАГ 2: Детали оплаты */}
              {step === 2 && (
                <div>
                  <div className={styles.cardSectionTitle}>
                    <span className={styles.sectionIcon}>💳</span> ДЕТАЛИ ОПЛАТЫ
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.inputLabel}>Ваше ФИО</label>
                    <input
                      type="text"
                      name="fullName"
                      className={styles.textInput}
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.inputLabel}>Ваше Email</label>
                    <input
                      type="email"
                      name="email"
                      className={styles.textInput}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.inputLabel}>
                      Номер банковской карты
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      className={styles.textInput}
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.rowInputs}>
                    <div className={styles.formGroup} style={{ flex: 2 }}>
                      <label className={styles.inputLabel}>Действует до</label>
                      <input
                        type="text"
                        name="expiry"
                        className={styles.textInput}
                        value={formData.expiry}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGroup} style={{ flex: 1 }}>
                      <label className={styles.inputLabel}>CVC</label>
                      <input
                        type="password"
                        name="cvc"
                        className={styles.textInput}
                        value={formData.cvc}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className={styles.actionRowBetween}>
                    <button
                      className={styles.backLink}
                      onClick={() => setStep(1)}
                    >
                      &lt; ОБРАТНО
                    </button>
                    <button
                      className={styles.nextBtn}
                      onClick={() => setStep(3)}
                    >
                      Завершить бронь ✓
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ПРАВАЯ ЧАСТЬ: Корзина (Итого) */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryTitle}>
                <span>🛒</span> ИТОГО
              </div>

              <div className={styles.summaryBlock}>
                <span className={styles.summaryLabel}>ГОНКА</span>
                <p className={styles.summaryValueText}>{selectedRace}</p>
                <span className={styles.summarySubtext}>
                  📅 {currentRaceData.date}
                </span>
              </div>

              <div className={styles.summaryBlock}>
                <span className={styles.summaryLabel}>БИЛЕТ</span>
                <div className={styles.summaryFlexRow}>
                  <span>
                    {ticketDescriptions[selectedTicket as TicketKey].name} x
                    {quantity}
                  </span>
                  <span>${subtotal}</span>
                </div>
              </div>

              <div className={styles.summaryBlock}>
                <span className={styles.summaryLabel}>НАЛОГОВЫЕ СБОРЫ</span>
                <div className={styles.summaryFlexRow}>
                  <span>Сервисный сбор</span>
                  <span>${serviceFee}</span>
                </div>
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Всего</span>
                <span className={styles.totalPrice}>${totalAmount}</span>
              </div>
            </div>
          </div>
        ) : (
          /* ШАГ 3: Бронирование подтверждено */
          <div className={styles.successCard}>
            <div className={styles.successCheckCircle}>
              <span className={styles.checkIcon}>✓</span>
            </div>
            <h2 className={styles.successTitle}>БРОНИРОВАНИЕ ПОДТВЕРЖДЕНО</h2>
            <p className={styles.successText}>
              Ваш билет на <strong>{selectedRace}</strong> <br />
              был отправлен на почту{" "}
              <span className={styles.highlightEmail}>
                {formData.email}
              </span>. <br />
              До встречи на треке!
            </p>
            <button className={styles.successHomeBtn} onClick={handleReset}>
              Обратно к покупке билетов
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
