import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./HoursScreenAnimation.module.css";

type HoursScreenAnimationProps = {
  className?: string;
  autoPlay?: boolean;
  scale?: number;
};

type TabItem = {
  label: string;
  icon: string;
  icon2?: string;
  active?: boolean;
};

const clockImage = new URL("./HoursScreenAnimation.assets/figma-hours-clock.png", import.meta.url).href;
const tabSunImage = new URL("./HoursScreenAnimation.assets/figma-hours-tab-sun.svg", import.meta.url).href;
const tabCalendarImage1 = new URL("./HoursScreenAnimation.assets/figma-hours-tab-calendar-1.svg", import.meta.url).href;
const tabCalendarImage2 = new URL("./HoursScreenAnimation.assets/figma-hours-tab-calendar-2.svg", import.meta.url).href;
const tabClockImage = new URL("./HoursScreenAnimation.assets/figma-hours-tab-clock.svg", import.meta.url).href;
const tabFireImage = new URL("./HoursScreenAnimation.assets/figma-hours-tab-fire.svg", import.meta.url).href;
const tabCogImage = new URL("./HoursScreenAnimation.assets/figma-hours-tab-cog.svg", import.meta.url).href;

const revealDelays = [130, 340, 620, 880, 1110, 1340];

const tabs: TabItem[] = [
  { label: "Сегодня", icon: tabSunImage },
  { label: "Календарь", icon: tabCalendarImage1, icon2: tabCalendarImage2 },
  { label: "Часы", icon: tabClockImage, active: true },
  { label: "Энергия", icon: tabFireImage },
  { label: "Еще", icon: tabCogImage },
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HoursScreenAnimation({
  className,
  autoPlay = true,
  scale = 1,
}: HoursScreenAnimationProps) {
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
      aria-label="Animated Tibet Astro hours screen"
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
            <DateTitle />
          </Reveal>
          <Reveal visible={revealed > 2}>
            <Clock />
          </Reveal>
          <Reveal visible={revealed > 3}>
            <SpecialPeriods />
          </Reveal>
          <Reveal visible={revealed > 4}>
            <BreathingCycles />
          </Reveal>
          <Reveal visible={revealed > 5}>
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
      <h1>Календарь времени</h1>
      <span aria-hidden="true" />
    </header>
  );
}

function DateTitle() {
  return <h2 className={styles.dateTitle}>3 марта 2026 года 06:45</h2>;
}

function Clock() {
  return (
    <section className={styles.clockBlock} aria-label="Час кролика">
      <img src={clockImage} alt="" aria-hidden="true" />
      <div className={styles.planetLegend} aria-label="Планеты">
        <span>☉ Солнце</span>
        <span>☾ Луна</span>
        <span>☿ Меркурий</span>
        <span>♀ Венера</span>
        <span>♂ Марс</span>
        <span>♃ Юпитер</span>
        <span>♄ Сатурн</span>
      </div>
    </section>
  );
}

function SpecialPeriods() {
  return (
    <section className={styles.specialPeriods}>
      <h2>Особые периоды дня</h2>
      <div className={styles.periodGrid}>
        <article className={styles.periodCard}>
          <span className={cx(styles.badge, styles.goodBadge)}>Благоприятные периоды</span>
          <div className={styles.periodTimes}>
            <strong>05:25</strong>
            <i />
            <strong>06:44</strong>
            <strong>14:32</strong>
            <i />
            <strong>15:51</strong>
          </div>
          <p>Лучшее время для приёма пищи и лекарств</p>
        </article>
        <article className={styles.periodCard}>
          <span className={cx(styles.badge, styles.badBadge)}>Неблагоприятные периоды</span>
          <div className={styles.periodTimes}>
            <strong>13:16</strong>
            <i />
            <strong>14:32</strong>
            <strong>23:47</strong>
            <i />
            <strong>00:31</strong>
          </div>
          <p>Не рекомендуется приём пищи и лекарств</p>
        </article>
      </div>
    </section>
  );
}

function BreathingCycles() {
  return (
    <section className={styles.breathingCycles}>
      <h2>Циклы дыхания</h2>
      <div className={styles.breathingGrid}>
        <article>
          <h3>Женщинам</h3>
          <p><i className={styles.moonDot} />Лунное дыхание — правый канал</p>
          <p><i className={styles.sunDot} />Солнечное дыхание — левый канал</p>
        </article>
        <article>
          <h3>Мужчинам</h3>
          <p><i className={styles.moonDot} />Лунное дыхание — левый канал</p>
          <p><i className={styles.sunDot} />Солнечное дыхание — правый канал</p>
        </article>
      </div>
    </section>
  );
}

function TabBar() {
  return (
    <nav className={styles.tabBar} aria-label="Bottom navigation">
      <div className={styles.tabBarInner}>
        {tabs.map((tab) => (
          <div className={cx(styles.tab, tab.active && styles.activeTab)} key={tab.label}>
            <span className={styles.iconWrap}>
              <img src={tab.icon} alt="" aria-hidden="true" />
              {tab.icon2 ? <img src={tab.icon2} alt="" aria-hidden="true" /> : null}
            </span>
            <span>{tab.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
