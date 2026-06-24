import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./LaEnergyScreenAnimation.module.css";

type LaEnergyScreenAnimationProps = {
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

const bodyImage = new URL("./LaEnergyScreenAnimation.assets/la-body.png", import.meta.url).href;
const pointGoldLeft = new URL("./LaEnergyScreenAnimation.assets/la-point-gold-left.svg", import.meta.url).href;
const pointGreen = new URL("./LaEnergyScreenAnimation.assets/la-point-green.svg", import.meta.url).href;
const pointGoldRight = new URL("./LaEnergyScreenAnimation.assets/la-point-gold-right.svg", import.meta.url).href;
const cardDotGold = new URL("./LaEnergyScreenAnimation.assets/la-card-dot-green.svg", import.meta.url).href;
const cardDotGreen = new URL("./LaEnergyScreenAnimation.assets/la-card-dot-gold.svg", import.meta.url).href;
const tabSunImage = new URL("./LaEnergyScreenAnimation.assets/la-tab-sun.svg", import.meta.url).href;
const tabCalendarImage1 = new URL("./LaEnergyScreenAnimation.assets/la-tab-calendar-1.svg", import.meta.url).href;
const tabCalendarImage2 = new URL("./LaEnergyScreenAnimation.assets/la-tab-calendar-2.svg", import.meta.url).href;
const tabClockImage = new URL("./LaEnergyScreenAnimation.assets/la-tab-clock.svg", import.meta.url).href;
const tabFireImage = new URL("./LaEnergyScreenAnimation.assets/la-tab-fire.svg", import.meta.url).href;
const tabCogImage = new URL("./LaEnergyScreenAnimation.assets/la-tab-cog.svg", import.meta.url).href;

const revealDelays = [140, 380, 700, 960, 1210, 1440, 1660];

const tabs: TabItem[] = [
  { label: "Сегодня", icon: tabSunImage },
  { label: "Календарь", icon: tabCalendarImage1, icon2: tabCalendarImage2 },
  { label: "Часы", icon: tabClockImage },
  { label: "Энергия", icon: tabFireImage, active: true },
  { label: "Еще", icon: tabCogImage },
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function LaEnergyScreenAnimation({
  className,
  autoPlay = true,
  scale = 1,
}: LaEnergyScreenAnimationProps) {
  const [revealed, setRevealed] = useState(autoPlay ? 0 : revealDelays.length);

  useEffect(() => {
    if (!autoPlay) return;

    const timers = revealDelays.map((delay, index) =>
      window.setTimeout(() => setRevealed(index + 1), delay),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [autoPlay]);

  return (
    <div
      className={cx(styles.root, className)}
      style={{ "--animation-scale": scale } as CSSProperties & Record<"--animation-scale", number>}
      aria-label="Animated Tibet Astro LA energy screen"
    >
      <div className={styles.phoneShell}>
        <div className={styles.phoneGlow} />
        <div className={styles.dynamicIsland} />
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
            <BodyIllustration pointsVisible={revealed > 2} />
          </Reveal>
          <Reveal visible={revealed > 3}>
            <KalachakraCard />
          </Reveal>
          <Reveal visible={revealed > 4}>
            <BushmiCard />
          </Reveal>
          <Reveal visible={revealed > 5}>
            <WarningBlock />
          </Reveal>
          <Reveal visible={revealed > 6}>
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
      <h1>Жизненная энергия ЛА</h1>
      <span aria-hidden="true" />
    </header>
  );
}

function BodyIllustration({ pointsVisible }: { pointsVisible: boolean }) {
  return (
    <section className={styles.bodyStage} aria-label="Местонахождение энергии ЛА">
      <img className={styles.bodyImage} src={bodyImage} alt="" aria-hidden="true" />
      <div className={cx(styles.pointLayer, pointsVisible && styles.pointsVisible)}>
        <img className={cx(styles.laPoint, styles.maleHip)} src={pointGoldLeft} alt="" aria-hidden="true" />
        <img className={cx(styles.laPoint, styles.maleFoot)} src={pointGreen} alt="" aria-hidden="true" />
        <img className={cx(styles.laPoint, styles.femaleFoot)} src={pointGreen} alt="" aria-hidden="true" />
        <img className={cx(styles.laPoint, styles.femaleHip)} src={pointGoldRight} alt="" aria-hidden="true" />
      </div>
    </section>
  );
}

function KalachakraCard() {
  return (
    <section className={styles.kalachakraCard}>
      <div className={styles.cardTitle}>
        <img src={cardDotGold} alt="" aria-hidden="true" />
        <p>
          Движение энергии ЛА в традиции <span>“Калачакры”</span>
        </p>
      </div>
      <div className={styles.twoColumnDescriptions}>
        <article>
          <h2>У мужчин</h2>
          <p>в тазобедренном суставе (берцовая впадина) правой ноги</p>
        </article>
        <article>
          <h2>У женщин</h2>
          <p>в тазобедренном суставе (берцовая впадина) левой ноги</p>
        </article>
      </div>
    </section>
  );
}

function BushmiCard() {
  return (
    <section className={styles.bushmiCard}>
      <div className={styles.cardTitle}>
        <img src={cardDotGreen} alt="" aria-hidden="true" />
        <p>
          Движение энергии ЛА в традиции <span>“Бушми”</span>
        </p>
      </div>
      <div className={styles.singleDescription}>
        <p>на подошвах ног</p>
      </div>
    </section>
  );
}

function WarningBlock() {
  return (
    <p className={styles.warningText}>
      Местонахождение «ЛА» нельзя травмировать или подвергать хирургическому воздействию.
    </p>
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
