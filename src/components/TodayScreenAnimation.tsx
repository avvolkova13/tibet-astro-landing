import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./TodayScreenAnimation.module.css";

type TodayScreenAnimationProps = {
  className?: string;
  autoPlay?: boolean;
  scale?: number;
};

type Tone = "red" | "cream" | "green";

type DayState = {
  weekday: string;
  date: string;
  featureHeight: number;
  featureEventGap: number;
  title: string;
  description: string;
  memorial: string;
  planet: string;
  lunarDay: string;
  lunarMonthDay: string;
  animal: string;
  animalImage: {
    src: string;
    width: number;
    height: number;
    left: number;
    top: number;
  };
  colors: { label: string; name: string; tone: Tone }[];
  strip: { weekday: string; date: string; tone: Tone }[];
};

type CarouselDay = {
  weekday: string;
  date: string;
  tone: Tone;
};

const animalImageHorse =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAXCAYAAAB0zH1SAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAnRJREFUeAHVV0Fy2kAQnFlJFCeiY25WXmDyguju2OAXGN9tEK5UrpZPOQWwXanKLckLgJAH4BcE/wD/gGPKkXYyswaCE2OQy4WkrgKttJrd3tmZnhVAhjFo108H7cB/qE9BRjH4eLytAL1l/TZkBEKUED2FWI2JRohYvv2N5wVbbz30fuoe74aB+711/AYUVhHUOQHUbMQAiIb77zsjvnf7rfrBv3apE3dKuoKoegAYAhJ7l8JbwNdvTy6+Sb9cNaqrQaveWLRDSBGSfIYwGA+OtaWru/XL68V3uu3AtUE3kLgfaLx3cnklz1MhLuGhSvqA4znkW1dIgxP5O0efbh6z6995fVLhXdg48SnpCpOu8a3PBCboROVVpOf27cCzie1h03hh/l3+lU2LKFiXtMEvNuEdWlsOxVNWKd4mQE+8ZOl4tPMuwYRT2DreAqV8bro8zmiWhGujCJO95kV/JfHuh8ArFOmUE0PkajJ7ri3b+9FujFlzw0qCyTWibzFpYvVAJ/4KCbHf7BgOS2NctFW8q0RTgXoRa+zMyCyIY80hze+oM0QiWQB7c7hsF8QBdpG+aMJrjRAujvUU4LIJJI6401NOVFsVg7wI3wGSIlEFkTUOAWTpupsA2bvTeAY82212hvAM+I/4oBWMuRD8lHYEeJjUM7IIW5KPuFSjhIS6iXkhPM4InhH3iM8Kgiaq2QXe9qPkybcp3E9OUofs7WElaaangLmOm4MOnxUktiEHmBPnY6QPOYL628Bp5puqlnnMibOEeXLFPBEX7eaLkT1WlB7kAIa4wyUdCF+xtzssg7kgbsm3HsfHSynFViH6nGXtXsQfzi792GMoYHIAAAAASUVORK5CYII=";
const animalImageMonkey =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAWCAYAAABUpxX0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAj5JREFUeAHNl1FyEkEQhrtnl9I38ATBE8gN3HcCyAmIz5qwoGWVT5AnqyyTXbB8Fk8AK+bZzQmMJ3Bzg9VHw07bvexKik2EqJWar2rZYaZn5p9mpqdBYILjg66F6BJAFQGihGjY6o8/gKEoFtyxU8H4eAF4H4l8hTiZ80LAUGwF6pBIDxr9UZjVjT553Roh7kkZDEQBUpm3RHy58kLjKb9qYCiKBU/Yq/78aP/BqlKXwWDUbm/UAz546o7+7W3e4+LlEAzFlo/dtUihAR7JQsBQ1HrF9LUrXq4Aqq9gKAXRlq130obSxTcwlILohNQ9MJyCaEjgTF7003LAUAqi2y98ER1nl8vWnLx5siPPdOhW4IZIv5vY45WD8BWuOXZrjYetZ/7wus4fj/cfIippXx7eFTHnMSERzfQPFbSHfrzeVxZnl2kqZbaN2Hs1zRGr2R8H8DeihbnX/cwvh58ZX/N+s//29AqxTlYVcoicEarvCQuw0sRLDjRKe40nmWULEWETScZOvO57to2bck9kY1qAlfq/iBY4B/F4Ijf7GuNyYvFo7tWZKi3c+tN359eNMfXYo7I44kWgOkegFi1/mZj77uV9UzvSnUZ/vDHfwU0GPFjVAuriKhcR4RECBo2eH8J/ZO4dDBagRu1ecTsZS3DkDrexs8EApq/cqn2XvoBOnG3sFRhA+6UfSbYJSp1t4+2Ne/o2kfNTAhpw0fnTXz6jROeweIfFd+CSeLmA6s+XkcZI0Tm557MQGaWVROEvBB/tRt0pAX8AAAAASUVORK5CYII=";
const animalImageTiger =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAYCAYAAABurXSEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAA61JREFUeAHNV01WE0EQruqZPFkZPIHxBI4ncNgaIuQEhLWaH3RPWLnRZALPtckJAkTWhhMYTuBwAoMrfiZdfjUhmoSgeRgC33vzHtPd0/m6+quvCqJ7jP3Km+dfqoXP4+Mu3UM03xdT7oJ8JuFjIpHxeUP3CAcfXj3eq+TX3AfUJuKtzEaQ4wnr7kWkWx/fPCVjgh5R1wifREyejqs0rGOD8fV3Tnq/kl9h5roRu3rGznF2IwgHc61qPuSeyeHP0vA3d0papQDCgVjrv3i7czQ+H52aBrT9vVXJh5mN7dpg/M40DcIF/PyziPhZZJzjSWvcBbvGRnLEXFa9D8bN8Ms8YZhXiey3bCkI8XTH55vl4iKS0V8ubDfw2rGOW//9LV46rWpBIPpvrfj084PjXD/nPrRrRmSQhHooT307ntPrSYh9jivw8QT71YL3slRbp1sGi9TJsn9QyXfP2RwiEVcsmz06pcXEghTEsfV0fuco1r3ILrh1iU0Zny6N2CA2KFhNDLH+y42dQ7plwB02mTiF6qEWh4eXIkhhIJfYWchk1a8PqoWmJfIR5CcjiZhGhuIUIU6UozkgU9reuiAuGf1NYJiwejezOVHCejgr0sZw6ApkM2GvNoinaA5QjbpCbURw1VreGk7IDCwwOqEOcq1qreHop2mgrD8SyPiKT8scCCtZ7uvTZ5KuiBRX3tZqw2vUPQySUcjsGer9cJKmiTZkU4jLkyLtWeEjugVoIwSn+grC7f4IZyGPJ8OFY4BsOehaRBeHWkGJL4Ps1sWZOVQVjET60lIWDdMuzRhx5/Ygll5SIzuJ6DgXJutdkGlANh1NSneB485vJNKstkeaIEGbZghNqpgwSxJW5v+LsELdS9c50kvidpoa4UyptgSv/D4SaUPs9S4zeRZQXbpJi4KlOpSQEpG3/PrT8TTf9nWvQTRHcJV1+snUqhTrJHZ3pg2TRhQ+70FeKS3BSGv1XpRj2j0nXs++/tSddq/LOnGo5BNsNiVJKZOIimkceoQ0nCPENaw2q8XFSf3AJAxFs0iaD5fj6vewsjqKx95N5QYeHvZ5hKexDF0PxkdIW4QemV1MkGzSWA87Cf1kITQ0rE1XGxnegLx083DaQ/8N2T7Rzvj4lf9m1JIo9k9EqReV0++ualDJOqiaiGROyeLacukptToLXCGt0kCkq9InpAs6tp+cGjm9fk8LEMa1KJSncYJZg6+bAHkf5Nf+NDPx4q7odaHrijj2z/+WwE3wC+FpqhnlL6ErAAAAAElFTkSuQmCC";
const eventImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAzhJREFUeAGNVG1uFEcQraruNZDYpldKbIU/OwPKb29O4L2B4QTxDRzfwLmBc4PkBDEnyPoEDL/yB7KNFDkOIO1gG7C901W87pXNCixBS7Oz/fWq6r1XQ/SFcfL/s4fTyZNAXzHkSwdY3dQvr+4srp2+mmy+PzoafHb2JoCz4+c76qVNjh77jnZIldhJnM3OD3tuactIKyPfrK7Vfyze8zeBmVtq2Dryl7rDbNGIKwCOABRIpLVkhyx++um9a7CT48lWnq1+Vz82veg74Y1EVJFxyYo0RTOuECOinG3W2d7Jy8nPRhSc2Xh5/f5TXgRjp0M2alV7UeRiNN8RgFBQltZbF7rEffE4hXMlSLImA5WTV2ACHuZTvH0Kpjw0zI2XGnPS5H3FnIUHpDYUrKH0YMLhRs5yVviNoomUOTLLgXUXNTA2yawC0phFI6tENd+SXQbfuxWv7+e6mQmbNJTCUVflObIMiNwa50tpJI7HahIspafiAK7cmFDFJI1in3MSKdGhqW6LaWBCVOYDKDVOnb0h8ZinyGKNojRLsz57N4C6bVFdZWyWHmagTEURYPrfpOo5ClBv0wtFU8o84EltUnpEShHZDBAImUp0pq0SDU0tgMMWAsWV9Qe/8tnL59ndQ/gyQJ19ED3Cf0RNNYvchQSNsg8oFRTMbV5AAQA6WhWJnOACKMvTyST067qkfXr87C/zbr8IAZPCsFCYxolcoJR2wduf2iE3x9OcIXCHTCnM3p7u9uuf2o8+y0KYVnODzkvMJi3AouUN/4YiDFGTvYcsA+yTbROW1x78dm2NEsUyXwouqBKxSOLaZMUyhcO8D/NG6lLtvGFIK5zgmrnXZC7A31XmRHPfdbnvcIE4W4Mc0szckMmBJusX1WHcDFSsDmVyye+P/hnMMzu/3a7U9aMrZT3rBsJlkOh634zT5bs9loToPCnfGTOU6ILvbP/O+v0XH7sI40qA0hKe0C46dN23+zDy6Pz8DWeAlKx2Cg8iMyRcerHz9stiB332cVz5vj7s1O/euXfvhWdunLu9SeSauz/8uKcubSeTIYz7ZGWt3mW79Tt97Th5PdnKz+La2fTfjbefrF2ND7pRyf8A2FWWAAAAAElFTkSuQmCC";

const dayStates: DayState[] = [
  {
    weekday: "Чт",
    date: "05.03",
    featureHeight: 178,
    featureEventGap: 16,
    title: "День Будды Медицины",
    description:
      "Особенно благоприятен для начала лечения или начала здорового образа жизни.\n\nКармические последствия от совершённых действий (как положительных, так и отрицательных) увеличиваются в 100 тыс. раз.",
    memorial: "Годовщина первого До Друбчен Ринпоче Джигме Тринле Озер",
    planet: "Меркурий ☿",
    lunarDay: "17-й",
    lunarMonthDay: "1-й",
    animal: "Лошадь",
    animalImage: { src: animalImageHorse, width: 46, height: 23, left: 167, top: 7 },
    colors: [
      { label: "Удача", name: "Золотой", tone: "cream" },
      { label: "Здоровье", name: "Белый", tone: "cream" },
      { label: "Богатство", name: "Зелёный", tone: "green" },
    ],
    strip: [
      { weekday: "Вт", date: "03.03", tone: "red" },
      { weekday: "Ср", date: "04.03", tone: "cream" },
      { weekday: "Пт", date: "06.03", tone: "green" },
      { weekday: "Сб", date: "07.03", tone: "green" },
    ],
  },
  {
    weekday: "Пт",
    date: "06.03",
    featureHeight: 168,
    featureEventGap: 25,
    title: "День заслуг",
    description:
      "Благоприятен для духовных практик, обучения и преодоления препятствий.\nКармические последствия от совершённых действий (как положительных, так и отрицательных) увеличиваются в 10 тыс. раз.",
    memorial: "День памяти Лонгченпа",
    planet: "Сатурн ♄",
    lunarDay: "18-й",
    lunarMonthDay: "1-й",
    animal: "Обезьяна",
    animalImage: { src: animalImageMonkey, width: 45, height: 22, left: 168, top: 7.5 },
    colors: [
      { label: "Удача", name: "Синий", tone: "green" },
      { label: "Здоровье", name: "Белый", tone: "cream" },
      { label: "Богатство", name: "Красный", tone: "red" },
    ],
    strip: [
      { weekday: "Вт", date: "03.03", tone: "red" },
      { weekday: "Чт", date: "05.03", tone: "cream" },
      { weekday: "Сб", date: "07.03", tone: "green" },
      { weekday: "Вс", date: "08.03", tone: "green" },
    ],
  },
  {
    weekday: "Сб",
    date: "07.03",
    featureHeight: 168,
    featureEventGap: 25,
    title: "День Гуру Ринпоче",
    description:
      "Особенно благоприятна для обучения, чтения священных текстов и накопления заслуг.\nКармические последствия от совершённых действий (положительных и отрицательных) увеличиваются в 10 тыс. раз.",
    memorial: "Годовщина Дилго Кхьенце Ринпоче",
    planet: "Юпитер ♃",
    lunarDay: "19-й",
    lunarMonthDay: "1-й",
    animal: "Тигр",
    animalImage: { src: animalImageTiger, width: 45, height: 24, left: 168, top: 6.5 },
    colors: [
      { label: "Удача", name: "Золотой", tone: "cream" },
      { label: "Здоровье", name: "Синий", tone: "green" },
      { label: "Богатство", name: "Зелёный", tone: "green" },
    ],
    strip: [
      { weekday: "Вт", date: "03.03", tone: "red" },
      { weekday: "Чт", date: "05.03", tone: "cream" },
      { weekday: "Вс", date: "08.03", tone: "green" },
      { weekday: "Пн", date: "09.03", tone: "green" },
    ],
  },
];

const carouselDays: CarouselDay[] = [
  { weekday: "Вт", date: "03.03", tone: "red" },
  { weekday: "Ср", date: "04.03", tone: "cream" },
  { weekday: "Чт", date: "05.03", tone: "cream" },
  { weekday: "Пт", date: "06.03", tone: "green" },
  { weekday: "Сб", date: "07.03", tone: "green" },
  { weekday: "Вс", date: "08.03", tone: "green" },
  { weekday: "Пн", date: "09.03", tone: "green" },
];

const revealDelays = [120, 360, 640, 900, 1160, 1420, 1700];
const stateTimes = [0, 3200, 5100];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function TodayScreenAnimation({
  className,
  autoPlay = true,
  scale = 1,
}: TodayScreenAnimationProps) {
  const [activeState, setActiveState] = useState(0);
  const [contentState, setContentState] = useState(0);
  const [contentChanging, setContentChanging] = useState(false);
  const [revealed, setRevealed] = useState(autoPlay ? 0 : revealDelays.length);

  useEffect(() => {
    if (!autoPlay) return;

    const timers: number[] = revealDelays.map((delay, index) =>
      window.setTimeout(() => setRevealed(index + 1), delay),
    );

    stateTimes.slice(1).forEach((delay, index) => {
      const nextState = index + 1;

      timers.push(
        window.setTimeout(() => {
          setActiveState(nextState);
          setContentChanging(true);

          timers.push(
            window.setTimeout(() => setContentState(nextState), 230),
            window.setTimeout(() => setContentChanging(false), 470),
          );
        }, delay),
      );
    });

    return () => timers.forEach(window.clearTimeout);
  }, [autoPlay]);

  const state = dayStates[contentState];
  const selectorState = dayStates[activeState];
  const previousState = dayStates[Math.max(activeState - 1, 0)];
  const nextState = dayStates[Math.min(activeState + 1, dayStates.length - 1)];
  const activeCarouselIndex = carouselDays.findIndex((day) => day.date === selectorState.date);

  return (
    <div
      className={cx(styles.root, className)}
      style={{ "--animation-scale": scale } as CSSProperties & Record<"--animation-scale", number>}
      aria-label="Animated Tibet Astro today screen"
    >
      <div className={styles.phoneShell}>
        <div className={styles.phoneGlow} />
        <div className={cx(styles.phoneRail, styles.left, styles.top)} />
        <div className={cx(styles.phoneRail, styles.left, styles.mid)} />
        <div className={cx(styles.phoneRail, styles.left, styles.low)} />
        <div className={cx(styles.phoneRail, styles.right)} />
        <div className={styles.screen}>
          <div className={styles.dynamicIsland} />
          <StatusBar />
          <Header revealed={revealed > 0} />

          <main className={styles.content}>
            <Reveal visible={revealed > 1}>
              <section className={styles.daySelector} aria-label="Day selector">
                {carouselDays.map((day, index) => (
                  <DayCarouselItem
                    day={day}
                    isActive={index === activeCarouselIndex}
                    key={day.date}
                    offset={index - activeCarouselIndex}
                  />
                ))}
              </section>
            </Reveal>

            <div
              className={cx(styles.stateContent, contentChanging && styles.isChanging)}
              style={
                {
                  "--feature-event-gap": `${state.featureEventGap}px`,
                  "--feature-height": `${state.featureHeight}px`,
                } as CSSProperties & Record<"--feature-event-gap" | "--feature-height", string>
              }
            >
              <Reveal visible={revealed > 2}>
                <article className={styles.featureCard}>
                  <div className={styles.featureHeader}>
                    <h2>{state.title}</h2>
                    <img alt="" aria-hidden="true" className={styles.featureIcon} src={eventImage} />
                  </div>
                  <p>{state.description}</p>
                </article>
              </Reveal>

              <Reveal visible={revealed > 3}>
                <section className={styles.eventBlock}>
                  <div className={styles.eventTitle}>
                    <span>{state.memorial}</span>
                    <img alt="" aria-hidden="true" className={styles.eventIcon} src={eventImage} />
                  </div>
                  <div className={styles.eventGrid}>
                    <div className={styles.eventLeft}>
                      <div className={styles.planetCard}>
                        <span>Управитель лунного дня</span>
                        <strong>{state.planet}</strong>
                        <small>«День совокупления небесных псов»</small>
                      </div>
                      <div className={styles.lunarCards}>
                        <div>
                          <strong>{state.lunarMonthDay}</strong>
                          <span>лунный месяц</span>
                        </div>
                        <div>
                          <strong>{state.lunarDay}</strong>
                          <span>лунный день</span>
                        </div>
                      </div>
                      <div className={styles.animalCard}>
                        <span>
                          Животное дня
                          <b>{state.animal}</b>
                        </span>
                        <img
                          alt=""
                          aria-hidden="true"
                          className={styles.animalImage}
                          height={state.animalImage.height}
                          src={state.animalImage.src}
                          style={
                            {
                              "--animal-height": `${state.animalImage.height}px`,
                              "--animal-left": `${state.animalImage.left}px`,
                              "--animal-top": `${state.animalImage.top}px`,
                              "--animal-width": `${state.animalImage.width}px`,
                            } as CSSProperties &
                              Record<
                                "--animal-height" | "--animal-left" | "--animal-top" | "--animal-width",
                                string
                              >
                          }
                          width={state.animalImage.width}
                        />
                      </div>
                    </div>
                    <div className={styles.colorsArea}>
                      <div className={styles.colorsCard}>
                        <h3>Цвета дня</h3>
                        {state.colors.map((color) => (
                          <div className={styles.colorItem} key={`${state.date}-${color.label}`}>
                            <span>{color.label}</span>
                            <b className={cx(styles.swatch, styles[color.tone])}>{color.name}</b>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </Reveal>

              <Reveal visible={revealed > 4}>
                <section className={styles.recommendation}>
                  <h2>Рекомендации дня</h2>
                  <span>Посмотреть</span>
                </section>
              </Reveal>
            </div>
          </main>

          <Reveal visible={revealed > 5}>
            <TabBar />
          </Reveal>
          <div className={styles.homeIndicator} />
        </div>
      </div>
      <span className={styles.srOnly}>
        Animation changes from {previousState.date} to {state.date} and then {nextState.date}.
      </span>
    </div>
  );
}

function Reveal({ visible, children }: { visible: boolean; children: ReactNode }) {
  return <div className={cx(styles.reveal, visible && styles.isVisible)}>{children}</div>;
}

function DayCarouselItem({
  day,
  isActive,
  offset,
}: {
  day: CarouselDay;
  isActive: boolean;
  offset: number;
}) {
  return (
    <div
      className={cx(styles.carouselDay, isActive ? styles.activeDay : styles.smallDay)}
      style={
        {
          "--day-offset": offset,
          "--day-opacity": Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.42,
        } as CSSProperties & Record<"--day-offset" | "--day-opacity", number>
      }
    >
      <span>{day.weekday}</span>
      <strong>{day.date}</strong>
      <small aria-hidden={!isActive}>
        Благоприятный
        <br />
        день
      </small>
      <i className={cx(styles.dot, styles[isActive ? "green" : day.tone])} />
    </div>
  );
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

function Header({ revealed }: { revealed: boolean }) {
  return (
    <header className={cx(styles.topBar, revealed && styles.isVisible)}>
      <button aria-label="Back">‹</button>
      <h1>Сегодня</h1>
      <button aria-label="Location">⌖</button>
    </header>
  );
}

function TabBar() {
  const tabs = [
    ["☀", "Сегодня", true],
    ["▣", "Календарь", false],
    ["◔", "Часы", false],
    ["▮▮", "Традиции", false],
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

