import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './PlanningScreens.module.css';

const calendarImage = `${import.meta.env.BASE_URL}assets/03_Block_Calendar.png`;
const clockImage = `${import.meta.env.BASE_URL}assets/03_Block_Clock.png`;
const ease = [0.22, 1, 0.36, 1] as const;

function ScreenSlice({
  src,
  className,
  visible,
  delay,
}: {
  src: string;
  className: string;
  visible: boolean;
  delay: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      className={`${styles.screenImage} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.992 }}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 10, scale: 0.992 }
      }
      transition={{ duration: 0.74, delay, ease }}
    />
  );
}

export const LivingCalendarScreen = memo(function LivingCalendarScreen({
  visible,
}: {
  visible: boolean;
}) {
  return (
    <div className={styles.calendarScreen}>
      <ScreenSlice
        src={calendarImage}
        className={styles.calendarChrome}
        visible={visible}
        delay={0.18}
      />
      <ScreenSlice
        src={calendarImage}
        className={styles.calendarMain}
        visible={visible}
        delay={0.72}
      />
      <ScreenSlice
        src={calendarImage}
        className={styles.calendarDetails}
        visible={visible}
        delay={1.34}
      />
      <ScreenSlice
        src={calendarImage}
        className={styles.calendarNavigation}
        visible={visible}
        delay={1.9}
      />
    </div>
  );
});

export const LivingClockScreen = memo(function LivingClockScreen({
  visible,
}: {
  visible: boolean;
}) {
  return (
    <div className={styles.clockScreen}>
      <ScreenSlice
        src={clockImage}
        className={styles.clockChrome}
        visible={visible}
        delay={0.16}
      />
      <ScreenSlice
        src={clockImage}
        className={styles.clockDial}
        visible={visible}
        delay={0.72}
      />
      <ScreenSlice
        src={clockImage}
        className={styles.clockContent}
        visible={visible}
        delay={1.38}
      />
      <ScreenSlice
        src={clockImage}
        className={styles.clockNavigation}
        visible={visible}
        delay={1.94}
      />
    </div>
  );
});
