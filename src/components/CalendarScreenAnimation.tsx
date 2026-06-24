import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./CalendarScreenAnimation.module.css";

type CalendarScreenAnimationProps = {
  className?: string;
  autoPlay?: boolean;
  scale?: number;
};

type Tone = "green" | "cream" | "red";

type CalendarDay = {
  day?: number;
  lunar?: string;
  tone?: Tone;
  selected?: boolean;
  moon?: boolean;
};

const dragonImage =
  "data:image/png;base64,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";
const lotusImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAA2BJREFUeAHtVTla20AQnl3ZkDRBOQHiBIETRKl5nwDTByz7S49SpQLZ5EuNfQJsIL24gW+AOUFMC5ImM7sreRGIh5ukYL5Pr9HO/PMegDf63+n8cO8TXzAjSZiBzqP9A5ByxNfwMAhhBhLwSlKgIEKyeJyhECBwkZR01lrd1mv0VAIPj/Z36OfEydLR6rdf14bXlEJ0GBTqiX97Vxc1hJjBATFYbx93+dxpGLjyQ7bJ8hvt4+GLgX9HzZMMoGEd6mWY9QQ4fQaR9cRb/aqNUXnmsBMIZJkvpQxsWQQYbLS6288Cn0aBWwP8w16RUIwoviiPpop6pGjXlrmImhHxA0vphMDJUGWAm4D4uN3qTGyZB8XlYKoqNQUYUd5219sdj+DC4n89CcsydyC+T78wpO8lMq5FwAPmvHfSxbJMZVWTp9fTd4zNa5yH2CbjTZyftbxTzzQR3guAhavuAhcKYBDL5i2GCsoQlXeiOGv9E/LmWeA0kblHbs5zhLZYIoygElgrz0Au5TwKtVd1vsY3rkykaiQrfPYPtZBvnXOrLJ8al16xH3akqM9XqDBJF55QAXLBjZ00Cbg9tcfCGXIFEqCHUyvds6O9zzAjKVnTDUbvMmFsoVOLmWeA1YEJl/16qysoX6o1hJCh0TPRx7LFaihdG1SUNzoCsqFlsME6WTfryR3Lcxyzh3krUUj7Bsxny1PEMfNTnObvAayAZa0wuzr9EXg8RHgWrLWP+4qP2SbolMUFMGIWqg8hezxAuB0kYs7rUI5UUUmJT4Re+Hyv1zCuzRetpXSoEQrS9LrueQW80f55SY8Bh8EBjJi3quduzLkh8K08AmxYGZI95H/sYZJSiHXq4tzbuQU8YR5PvfVWRxlVy4UpB7s08FeoKhtnUdPl6rvVvBiFyrnKcx2QthPc20Rz7/CAQkutpPIXmCXSYE8ZlPhbhhcW8blneRR4+bahH2PKbUj5viw2kCFKjW+iZC8JMCFUmyu9lV6xVAzPnnqPLgnyiod+w7BiPbEEe+0aobFIzVqcv2cURQU7Jt++tlL0EwFBeUlU7uML2sfIBWF5WhLk7eWCNeFKFHMh5Tl9RP5pogj4FIGd8nqsUMbTaUDzul8FaJ19OZER3KuuU5rBKeeQLgrnGN7ojf41/QXOOZGcBl+zuAAAAABJRU5ErkJggg==";
const arrowLeftImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAgRJREFUeAHVlVFu00AQhv9Z20mjECuRqGgiEDGIvhJOkHACwgkabsANCCeAGzS5QXoD9wQtTzyVOE9VAalWKALF3R3WtHHjxo4t96mfZGu0szv/zNi7C9x3KGvC+fSoLqr1PWLVAVP7apR9mGJiLdittJ7NCgmcn35tW4b1gRUNsAEmHllSDNOEEgV+/Zh2WaqJdtaRAwY8XdF7+6FzkCkw/zl9Q5dqgiIYolfbdg5TBcK2CFiuIHqKIhB8U1JntV1i1R/2vHDwEEY9MNQwrnlNmL1JpWnqWpZj0zCOpMJnZHD5Z95oOK/80I4qMIyt7qbgdnN3oJhc5MCq2ntLOxIglv1NwS/Ovr1UzC5yoCQ6S9u8iZTwSxJP7J3dQWgGAZFp0Nv1OeqTfnfiY6KN2xUkZy8iUcti1umsP6S8TTGiCojg6RDxRMC9+dnJvv3o+TuUSsDi70Rv3VuVJuWo/HUv03HCTN0lDEKRB43HX6i01UMOhD6n1gSCshinLViKKBm0kQNjUXajtauOi+8n+6wwwB1gwuh/S6+JNTCQ4qNO10dBdLaeJSvD1bGYQKPpeBDlPgpC+kSttFqzVIGQ2vaTQ4boM/MM+fHB6nU14bhO3Af2jnMgYfRIYIQMwp6bqtKpNV+4Sf7sK/N0qm82dJlVf7kHmMgThOPgN8YNxyn8ze4H/wAut7/V4ERbcQAAAABJRU5ErkJggg==";
const arrowRightImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAgVJREFUeAHVlV1u00AQx2dmbUKUJnIkqtAIhM3HM+EECSdoOEHaG3ADwhE4AekN0hu4J6A8ISHAzlP4kmqlRUh1d4ddQoKT2LHlPvX3NN4d//+7s18ANx3MSzgL3jlUcwbIqgOM7ryVI7BobF+yX20/nJQyOJt+cG1hv2KFB7AFRh7ZkoZZRqkG5z+CLks11p0OFIABQj2jl4073nGuwexnsI9XagxlENSr73onmQamLAS2T4gPoAwIkSWxkywXJftNzUuLGxicWKjhquc/zOgtvBXkaih+QQL2mbMX/+r3rNn0nkUmXs5AiNtdKAAJCnZajw9R756sHLvWGCzzFwGy7EMBGNi/+Pbl6TYTJaGziK3En5tbEnkMSrxZc9DTnZfWmJx//eTqxN7qf+RuGqSCrs7gjWbFnBhEpE9bpsLSABFCXpdiPVWp/LXWCLDSM8Fs+nEETCmlVdEi+r9NGU+hAKjFd1r33htxRDFIyyF9T20YxBU6ggIoEbvbxA3isuIvB5TsuPj++S0rOIBroJdj1Gg9Olx8r5zkWNLrv4tWEj3a0JbVYbJtxaC554VAlULnIdVA36jVdnuSaWCo794/YaA+M0+gOHqrque1lOua0rIbd71jCaKHBCPIwdTcUtVOfe+Jn9af/2ROA/2yQZdZ9bWaMxfFkBBO419w1PS80mt2M/gDAAyzcSENXAoAAAAASUVORK5CYII=";
const closeImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAi5JREFUeAGtVr1y00AQ3j2dPB5HkzkmpFdHJjQu6UiZDh7BPEEo6WJ3UPIEuITOLRWmpCINTIYmosYzOSYJFtJJx66wgoh9yiXxN2N7b+X9ve/2hNCCWCnVNeYAAfbQ2hgQY9bTWpcARyDEJM2yyUmafnf5wFXKHaViNOYNOwYPlIjj33k+XBUouKp4sLl5IIviLccBT1Ai/VCIwf0wTGd5/skZYCeKDgNrX5LYhZuji4j7W50OzrJsuhSAM184vxO4rVSJriup9oB7Hhjz2QIoWA/03Jg+74nglcjzwzU6Z6iulGMWkLMXxpy4/skMESWREnHgo2/il5T3JJblkzbnx2dnz1jejaKEfoaLRyPSV/LuxoYzSM+Y55KyeGrhenw9Px9REBaR5KGHCZDfx0hGp9DS/5KzdThkWot/VS0HQEyC7U6nlZpMu6vc9nG+sFUCPCA8dasQbIfhgDapjaKjVT3/kWUfqXoW91pstaDjnbieMouazrkt9Llc88aDtWOXPW3ykaSvqSsLGtE/m87rnpMMxx5MotEzwT7N/MyYU2ip4rYHjcZFXM2ih1H0wXrOfl/Uh7QiQyEln1YN64PmC4iFalzP0lTzZcHzHNYAYe2Lb/P5+8sAVRCa3x6088Hoy8XFq3rx343G3ObLgip5BDe/1TRn3nS+FIDBlWz1eu+wKBQxpA8eYKqnxuzXbWkC2wyrtwsa54uJy8H+nnhrEx5kZDylmf860dpJkD8MOvuNgiBR1QAAAABJRU5ErkJggg==";

const revealDelays = [140, 360, 620, 900, 1180, 1440];

const calendarRows: CalendarDay[][] = [
  [{}, {}, {}, {}, {}, {}, { day: 1, lunar: "☾13", tone: "green" }],
  [
    { day: 2, lunar: "14", tone: "cream" },
    { day: 3, lunar: "☾15", tone: "green" },
    { day: 4, lunar: "16", tone: "green" },
    { day: 5, lunar: "17", tone: "red" },
    { day: 6, lunar: "18", tone: "cream" },
    { day: 7, lunar: "19", tone: "cream" },
    { day: 8, lunar: "☾20", tone: "cream" },
  ],
  [
    { day: 9, lunar: "21", tone: "cream" },
    { day: 10, lunar: "☾22", tone: "cream" },
    { day: 11, lunar: "23", tone: "cream" },
    { day: 12, lunar: "24", tone: "cream" },
    { day: 13, lunar: "25", tone: "cream" },
    { day: 14, lunar: "26", tone: "green" },
    { day: 15, lunar: "☾27", tone: "green" },
  ],
  [
    { day: 16, lunar: "☾28", tone: "cream", selected: true },
    { day: 17, lunar: "29", tone: "cream" },
    { day: 18, lunar: "30", tone: "cream" },
    { day: 19, lunar: "☾1/12", tone: "red" },
    { day: 20, lunar: "2", tone: "red" },
    { day: 21, lunar: "3", tone: "cream" },
    { day: 22, lunar: "4", tone: "cream" },
  ],
  [
    { day: 23, lunar: "5", tone: "cream" },
    { day: 24, lunar: "6", tone: "cream" },
    { day: 25, lunar: "7", tone: "cream" },
    { day: 26, lunar: "8", tone: "cream" },
    { day: 27, lunar: "☾9", tone: "red" },
    { day: 28, lunar: "☾10", tone: "cream" },
    { day: 29, lunar: "11", tone: "cream" },
  ],
  [
    { day: 30, lunar: "12", tone: "green" },
    { day: 31, lunar: "☾13", tone: "green" },
    {},
    {},
    {},
    {},
    {},
  ],
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function CalendarScreenAnimation({
  className,
  autoPlay = true,
  scale = 1,
}: CalendarScreenAnimationProps) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timers = revealDelays.map((delay, index) =>
      window.setTimeout(() => setRevealed(index + 1), delay),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [autoPlay]);

  return (
    <div
      className={cx(styles.root, autoPlay && styles.isPlaying, className)}
      style={{ "--animation-scale": scale } as CSSProperties & Record<"--animation-scale", number>}
      aria-label="Animated Tibet Astro calendar screen"
    >
      <div className={styles.phoneShell}>
        <div className={styles.phoneGlow} />
        <div className={cx(styles.phoneRail, styles.left, styles.top)} />
        <div className={cx(styles.phoneRail, styles.left, styles.mid)} />
        <div className={cx(styles.phoneRail, styles.left, styles.low)} />
        <div className={cx(styles.phoneRail, styles.right)} />
        <div className={styles.screen}>
          <StatusBar />
          <Reveal visible={revealed > 0}>
            <Header />
          </Reveal>
          <Reveal visible={revealed > 1}>
            <FilterChips />
          </Reveal>
          <Reveal visible={revealed > 2}>
            <CalendarBlock />
          </Reveal>
          <Reveal visible={revealed > 3}>
            <EventBlock />
          </Reveal>
          <Reveal visible={revealed > 4}>
            <TabBar />
          </Reveal>
          <div className={styles.homeIndicator} />
        </div>
      </div>
    </div>
  );
}

function Reveal({ visible, children }: { visible: boolean; children: ReactNode }) {
  return <div className={cx(styles.reveal, visible && styles.isVisible)}>{children}</div>;
}

function StatusBar() {
  return (
    <div className={styles.statusBar}>
      <span>9:41</span>
      <div aria-hidden="true">
        <i className={styles.signal} />
        <i className={styles.wifi} />
        <i className={styles.battery} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className={styles.topBar}>
      <button aria-label="Back">‹</button>
      <h1>Календарь</h1>
      <span aria-hidden="true" />
    </header>
  );
}

function FilterChips() {
  return (
    <div className={styles.chips} aria-label="Calendar filters">
      <span>Мытье волос</span>
      <span>Поездки</span>
      <span className={styles.activeChip}>
        Стрижки
        <img alt="" aria-hidden="true" src={closeImage} />
      </span>
    </div>
  );
}

function CalendarBlock() {
  return (
    <section className={styles.calendarBlock}>
      <div className={styles.monthHeader}>
        <img alt="" aria-hidden="true" src={arrowLeftImage} />
        <h2>Март 2026</h2>
        <img alt="" aria-hidden="true" src={arrowRightImage} />
      </div>
      <div className={styles.animalRow}>
        <span>Месяц</span>
        <img alt="" aria-hidden="true" src={dragonImage} />
        <strong>Дракона</strong>
      </div>
      <div className={styles.weekdays}>
        {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className={styles.calendarGrid}>
        {calendarRows.flatMap((row, rowIndex) =>
          row.map((day, colIndex) => (
            <CalendarCell day={day} key={`${rowIndex}-${colIndex}`} />
          )),
        )}
      </div>
    </section>
  );
}

function CalendarCell({ day }: { day: CalendarDay }) {
  if (!day.day) return <div className={styles.emptyCell} />;

  return (
    <div className={cx(styles.dayCell, day.selected && styles.selectedDay)}>
      <small>{day.lunar}</small>
      <strong>{day.day}</strong>
      <i className={cx(styles.dayDot, day.tone && styles[day.tone])} />
    </div>
  );
}

function EventBlock() {
  return (
    <section className={styles.eventBlock}>
      <div className={styles.dateCard}>
        <strong>16</strong>
        <strong>03</strong>
        <img alt="" aria-hidden="true" src={lotusImage} />
      </div>
      <article className={styles.eventCard}>
        <h2>День заслуг</h2>
        <p>
          День считается благоприятным для накопления духовных заслуг: молитв, подношений,
          медитации и благих дел.
        </p>
        <div className={styles.eventLink}>
          <span>Подробнее о дне</span>
          <img alt="" aria-hidden="true" src={arrowRightImage} />
        </div>
      </article>
    </section>
  );
}

function TabBar() {
  const tabs = [
    ["☀", "Сегодня", false],
    ["▣", "Календарь", true],
    ["◔", "Часы", false],
    ["♨", "Энергия", false],
    ["✿", "Еще", false],
  ] as const;

  return (
    <nav className={styles.tabBar} aria-label="App tabs">
      {tabs.map(([icon, label, active]) => (
        <button className={active ? styles.active : undefined} key={label}>
          <span>{icon}</span>
          <small>{label}</small>
        </button>
      ))}
    </nav>
  );
}
