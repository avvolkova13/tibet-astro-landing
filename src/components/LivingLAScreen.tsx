import { memo, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './LivingLAScreen.module.css';

const laImage = '/assets/04_Block_LA.png';
const ease = [0.22, 1, 0.36, 1] as const;

function LASlice({
  className,
  visible,
  delay,
  distance = 10,
}: {
  className: string;
  visible: boolean;
  delay: number;
  distance?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.img
      src={laImage}
      alt=""
      aria-hidden="true"
      className={`${styles.screenImage} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: distance, scale: 0.994 }}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: distance, scale: 0.994 }
      }
      transition={{ duration: 0.72, delay, ease }}
    />
  );
}

export const LivingLAScreen = memo(function LivingLAScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.18 });

  return (
    <div className={styles.screen} ref={rootRef}>
      <LASlice
        className={styles.chrome}
        visible={inView}
        delay={0.16}
        distance={7}
      />
      <LASlice
        className={styles.silhouettes}
        visible={inView}
        delay={0.54}
        distance={12}
      />
      <LASlice
        className={styles.indicators}
        visible={inView}
        delay={0.88}
        distance={6}
      />
      <LASlice
        className={styles.kalachakraCard}
        visible={inView}
        delay={1.2}
      />
      <LASlice
        className={styles.bushmiCard}
        visible={inView}
        delay={1.52}
      />
      <LASlice
        className={styles.details}
        visible={inView}
        delay={1.82}
        distance={8}
      />
      <LASlice
        className={styles.navigation}
        visible={inView}
        delay={2.12}
        distance={6}
      />
    </div>
  );
});
