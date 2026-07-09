import {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { FireSymbol } from './components/FireSymbol';
import styles from './App.module.css?final-cta-fidelity-19';

const FALLBACK_DURATION = 5;
const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

const TodayScreenAnimation = lazy(() => import('./components/TodayScreenAnimation'));
const CalendarScreenAnimation = lazy(() => import('./components/CalendarScreenAnimation'));
const HoursScreenAnimation = lazy(() => import('./components/HoursScreenAnimation'));
const LaEnergyScreenAnimation = lazy(
  () => import('./components/LaEnergyScreenAnimation/LaEnergyScreenAnimation'),
);

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3);

const getInitialMobileViewport = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(MOBILE_MEDIA_QUERY).matches;

function useMobileViewport() {
  const [isMobileViewport, setIsMobileViewport] = useState(getInitialMobileViewport);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MEDIA_QUERY);
    const update = () => setIsMobileViewport(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  return isMobileViewport;
}

const assets = {
  logo: `${import.meta.env.BASE_URL}assets/logo.svg`,
  heroLogo: `${import.meta.env.BASE_URL}assets/hero-logo.svg`,
  heroGirl: `${import.meta.env.BASE_URL}assets/hero-girl-transparent.png`,
  heroArrow: `${import.meta.env.BASE_URL}assets/hero-arrow-figma.svg`,
  googlePlayMark: `${import.meta.env.BASE_URL}assets/google-play-mark-figma.svg`,
  googlePlayWordmark: `${import.meta.env.BASE_URL}assets/google-play-wordmark-figma.svg`,
  appleMark: `${import.meta.env.BASE_URL}assets/apple-mark-figma.svg`,
  appStoreWordmark: `${import.meta.env.BASE_URL}assets/app-store-wordmark-figma.svg`,
  finalCtaBackground: `${import.meta.env.BASE_URL}assets/final-cta/background.png`,
  finalCtaHandsRotated: `${import.meta.env.BASE_URL}assets/final-cta/hands-rotated.png`,
  finalCtaHandsFront: `${import.meta.env.BASE_URL}assets/final-cta/hands-front.png`,
  finalCtaFrame: `${import.meta.env.BASE_URL}assets/final-cta/figma-frame.png`,
  todayOrnament: `${import.meta.env.BASE_URL}today-ornament.svg`,
  todaySparkles: `${import.meta.env.BASE_URL}today-sparkles.svg`,
  planningCloud: `${import.meta.env.BASE_URL}planning-cloud.svg`,
  planningKnot: `${import.meta.env.BASE_URL}planning-knot.svg`,
  laFlower: `${import.meta.env.BASE_URL}la-flower.svg`,
  todayFigmaMockup: `${import.meta.env.BASE_URL}phone-frame-figma.png`,
  today: `${import.meta.env.BASE_URL}assets/02_Block_Today.png`,
  calendar: `${import.meta.env.BASE_URL}assets/03_Block_Calendar.png`,
  clock: `${import.meta.env.BASE_URL}assets/03_Block_Clock.png`,
  la: `${import.meta.env.BASE_URL}assets/04_Block_LA.png`,
};

type ScreenKind = 'today' | 'calendar' | 'clock' | 'la';

const screenRegions: Record<
  ScreenKind,
  Array<{ clipPath: string; offset: number }>
> = {
  today: [
    { clipPath: 'inset(12% 4% 70% 4%)', offset: 10 },
    { clipPath: 'inset(29% 4% 49% 4%)', offset: 14 },
    { clipPath: 'inset(52% 4% 20% 4%)', offset: 18 },
    { clipPath: 'inset(79% 4% 10% 4%)', offset: 12 },
  ],
  calendar: [
    { clipPath: 'inset(12% 3% 76% 3%)', offset: 9 },
    { clipPath: 'inset(22% 3% 32% 3%)', offset: 16 },
    { clipPath: 'inset(67% 3% 9% 3%)', offset: 13 },
  ],
  clock: [
    { clipPath: 'inset(11% 3% 46% 3%)', offset: 12 },
    { clipPath: 'inset(54% 3% 20% 3%)', offset: 16 },
    { clipPath: 'inset(78% 3% 8% 3%)', offset: 12 },
  ],
  la: [
    { clipPath: 'inset(9% 3% 52% 3%)', offset: 8 },
    { clipPath: 'inset(47% 3% 25% 3%)', offset: 12 },
    { clipPath: 'inset(73% 3% 8% 3%)', offset: 10 },
  ],
};

const screenClasses: Record<ScreenKind, string> = {
  today: styles.screenToday,
  calendar: styles.screenCalendar,
  clock: styles.screenClock,
  la: styles.screenLa,
};

function ScreenRevealRegion({
  clipPath,
  offset,
  index,
}: {
  clipPath: string;
  offset: number;
  index: number;
}) {
  return (
    <div
      className={`${styles.screenRegion} ${styles[`screenRegion${index + 1}`]}`}
      style={
        {
          clipPath,
          '--region-offset': `${offset}px`,
        } as CSSProperties
      }
      aria-hidden="true"
    />
  );
}

function HeroStoreButton({
  store,
}: {
  store: 'google' | 'apple';
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      className={styles.heroStoreButton}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.006 }}
      whileTap={reduceMotion ? undefined : { y: 1, scale: 0.992 }}
      aria-label={store === 'google' ? 'Скачать в Google Play' : 'Скачать в App Store'}
    >
      <span className={styles.heroButtonGlass} aria-hidden="true" />
      <span className={styles.heroButtonShine} aria-hidden="true" />
      {store === 'google' ? (
        <span className={styles.googlePlayLockup} aria-hidden="true">
          <img
            src={assets.googlePlayMark}
            alt=""
            className={styles.googlePlayMark}
          />
          <img
            src={assets.googlePlayWordmark}
            alt=""
            className={styles.googlePlayWordmark}
          />
        </span>
      ) : (
        <span className={styles.appStoreLockup} aria-hidden="true">
          <img
            src={assets.appleMark}
            alt=""
            className={styles.appleMark}
          />
          <img
            src={assets.appStoreWordmark}
            alt=""
            className={styles.appStoreWordmark}
          />
        </span>
      )}
    </motion.button>
  );
}

function HeroScene({
  className = '',
  onArrowClick,
}: {
  className?: string;
  onArrowClick?: () => void;
}) {
  const reduceMotion = useReducedMotion();

  const scrollToToday = () => {
    if (onArrowClick) {
      onArrowClick();
      return;
    }

    document
      .getElementById('today')
      ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section className={`${styles.hero} ${className}`}>
      <div className={styles.heroAtmosphere} aria-hidden="true">
        <span className={styles.heroBloomOne} />
        <span className={styles.heroBloomTwo} />
        {Array.from({ length: 9 }, (_, index) => (
          <span
            className={styles.heroParticle}
            style={{ '--particle-index': index } as CSSProperties}
            key={index}
          />
        ))}
      </div>

      <motion.img
        src={assets.heroLogo}
        alt="Tibet Astro"
        className={styles.heroLogo}
        initial={reduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08 }}
      />

      <motion.div
        className={styles.heroFigure}
        initial={
          reduceMotion
            ? { x: '-50%' }
            : { opacity: 0, scale: 0.985, x: '-50%' }
        }
        animate={{ opacity: 1, scale: 1, x: '-50%' }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <motion.img
          src={assets.heroGirl}
          alt=""
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [-3, 5, -3],
                  filter: [
                    'drop-shadow(0 0 13px rgba(255, 137, 76, 0.28)) drop-shadow(0 0 34px rgba(148, 35, 28, 0.2))',
                    'drop-shadow(0 0 20px rgba(255, 167, 101, 0.44)) drop-shadow(0 0 48px rgba(171, 45, 32, 0.3))',
                    'drop-shadow(0 0 13px rgba(255, 137, 76, 0.28)) drop-shadow(0 0 34px rgba(148, 35, 28, 0.2))',
                  ],
                }
          }
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.h1
        className={`${styles.heroTitle} ${styles.heroTitleLeft}`}
        initial={reduceMotion ? false : { opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        Тибетский
      </motion.h1>
      <motion.h1
        className={`${styles.heroTitle} ${styles.heroTitleRight}`}
        initial={reduceMotion ? false : { opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        календарь
      </motion.h1>

      <motion.p
        className={`${styles.heroCopy} ${styles.heroCopyLeft}`}
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.62 }}
      >
      </motion.p>
      <motion.p
        className={`${styles.heroCopy} ${styles.heroCopyRight}`}
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        Узнавайте особенности дня,
        <br />
        находите благоприятные даты
        <br />
        и следите за жизненной энергией
        <br />
        ЛА в одном приложении
      </motion.p>

      <button
        className={styles.heroArrow}
        type="button"
        onClick={scrollToToday}
        aria-label="Перейти к следующему разделу"
      >
        <span className={styles.heroArrowGlass} aria-hidden="true" />
        <motion.img
          src={assets.heroArrow}
          alt=""
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.78 }
              : {
                  opacity: [0.68, 0.82, 0.68],
                  scale: [1, 1.01, 1],
                  filter: [
                    'drop-shadow(0 0 0 rgba(243, 232, 221, 0))',
                    'drop-shadow(0 0 7px rgba(243, 232, 221, 0.1))',
                    'drop-shadow(0 0 0 rgba(243, 232, 221, 0))',
                  ],
                }
          }
          transition={{
            duration: 4.2,
            repeat: reduceMotion ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        />
        <span className={styles.heroArrowShine} aria-hidden="true" />
      </button>

      <motion.div
        className={styles.heroStoreRow}
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.86 }}
      >
        <HeroStoreButton store="google" />
        <HeroStoreButton store="apple" />
      </motion.div>
    </section>
  );
}

const MemoHeroScene = memo(HeroScene);

function TodayCopy({ className = '', inView }: { className?: string; inView: boolean }) {
  return (
    <div className={`${styles.sectionCopy} ${className}`}>
      <div>
        <motion.span className={styles.kicker} {...getOuterRevealProps(inView, 0.18)}>
          Каждый день раскрывает себя по-новому
        </motion.span>
        <motion.h2 {...getOuterRevealProps(inView, 0.08)}>Что сегодня за день?</motion.h2>
      </div>
      <motion.div {...getOuterRevealProps(inView, 0.24)}>
        <p>
          Приложение подскажет, что важно знать именно сегодня
        </p>
      </motion.div>
    </div>
  );
}

const HeroStoryContent = memo(function HeroStoryContent() {
  return (
    <motion.div
      className={styles.heroScrubStoryContent}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.14,
            delayChildren: 0.04,
          },
        },
      }}
    >
      <motion.div
        className={styles.heroScrubOrnamentSlot}
        variants={{
          hidden: { opacity: 0, y: 18, scale: 0.96 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        <FireSymbol />
      </motion.div>
      <div className={styles.heroScrubStoryText}>
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 26 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          Почему одни дни складываются легко, <span>а другие нет?</span>
        </motion.h2>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 22 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          Тибетский календарь заранее раскрывает особенности каждого дня,
          помогая выбрать удачное время для важных решений
        </motion.p>
      </div>
    </motion.div>
  );
});

function HeroScrubSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const targetProgressRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);
  const lastSeekTimeRef = useRef(0);
  const lastUiUpdateRef = useRef(0);
  const scrollMetricsRef = useRef({ top: 0, distance: 1 });
  const reduceMotion = useReducedMotion();
  const isMobileViewport = useMobileViewport();
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoMetadataReady, setVideoMetadataReady] = useState(false);
  const [mobileVideoEnabled, setMobileVideoEnabled] = useState(
    () => !getInitialMobileViewport(),
  );

  useEffect(() => {
    setVideoReady(false);
    setVideoMetadataReady(false);

    if (reduceMotion) {
      setMobileVideoEnabled(false);
      return;
    }

    if (!isMobileViewport) {
      setMobileVideoEnabled(true);
      return;
    }

    setMobileVideoEnabled(false);
    const frame = window.requestAnimationFrame(() => {
      setMobileVideoEnabled(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isMobileViewport, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || (isMobileViewport && !videoMetadataReady)) {
      return;
    }

    const wrapper = wrapperRef.current;
    const video = videoRef.current;

    if (!wrapper || !video) {
      return;
    }

    const measure = () => {
      const rect = wrapper.getBoundingClientRect();
      scrollMetricsRef.current = {
        top: window.scrollY + rect.top,
        distance: Math.max(1, wrapper.offsetHeight - window.innerHeight),
      };
    };

    const readScroll = () => {
      const { top, distance } = scrollMetricsRef.current;
      targetProgressRef.current = clamp01((window.scrollY - top) / distance);
    };

    const handleResize = () => {
      measure();
      readScroll();
    };

    measure();
    readScroll();
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const update = (timestamp: number) => {
      const wrapper = wrapperRef.current;
      const video = videoRef.current;

      if (wrapper && video) {
        const nextProgress = targetProgressRef.current;
        const duration =
          Number.isFinite(video.duration) && video.duration > 0
            ? video.duration
            : FALLBACK_DURATION;

        targetTimeRef.current = nextProgress * duration;
        const deltaSeconds = lastFrameTimeRef.current
          ? Math.min(0.05, (timestamp - lastFrameTimeRef.current) / 1000)
          : 1 / 60;
        lastFrameTimeRef.current = timestamp;

        const current = currentTimeRef.current;
        const smoothing = 1 - Math.exp(-14 * deltaSeconds);
        const next =
          current + (targetTimeRef.current - current) * smoothing;
        const resolved =
          Math.abs(next - targetTimeRef.current) > 1 / 240
            ? next
            : targetTimeRef.current;
        currentTimeRef.current = resolved;

        if (
          video.readyState >= HTMLMediaElement.HAVE_METADATA &&
          !video.seeking &&
          timestamp - lastSeekTimeRef.current >= 16 &&
          Math.abs(resolved - video.currentTime) > 1 / 120
        ) {
          video.currentTime = Math.min(
            Math.max(0, resolved),
            Math.max(0, duration - 0.001),
          );
          lastSeekTimeRef.current = timestamp;
        }

        if (
          timestamp - lastUiUpdateRef.current >= 40 ||
          nextProgress === 0 ||
          nextProgress === 1
        ) {
          const rounded = Math.round(nextProgress * 1000) / 1000;
          setProgress((previous) =>
            previous === rounded ? previous : rounded,
          );
          lastUiUpdateRef.current = timestamp;
        }
      }

      frameRef.current = window.requestAnimationFrame(update);
    };

    frameRef.current = window.requestAnimationFrame(update);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileViewport, reduceMotion, videoMetadataReady]);

  const scrollToSecondFrame = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const top = window.scrollY + wrapper.getBoundingClientRect().top;
    const scrollable = wrapper.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + scrollable * 0.94,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div className={styles.heroScrubReduced}>
        <MemoHeroScene className={styles.heroScrubHero} />
        <section className={`${styles.heroScrubStory} ${styles.heroScrubStoryReduced}`}>
          <HeroStoryContent />
        </section>
      </div>
    );
  }

  const videoSrc = !isMobileViewport || mobileVideoEnabled ? `${import.meta.env.BASE_URL}hero-scrub.mp4` : undefined;
  const showScrubVideo = Boolean(videoSrc) && (!isMobileViewport || videoMetadataReady);

  const blockOneOpacity =
    progress <= 0.36
      ? 1
      : progress >= 0.44
        ? 0
        : 1 - easeOut((progress - 0.36) / (0.44 - 0.36));
  const storyOpacity =
    progress <= 0.7
      ? 0
      : progress >= 0.86
        ? 1
        : easeOut((progress - 0.7) / (0.86 - 0.7));
  return (
    <div className={styles.heroScrubWrapper} ref={wrapperRef}>
      <div className={styles.heroScrubSticky}>
        <img
          className={styles.heroScrubPoster}
          src={`${import.meta.env.BASE_URL}hero-poster.jpg`}
          alt=""
          aria-hidden="true"
        />
          <video
            ref={videoRef}
            className={styles.heroScrubVideo}
            src={videoSrc}
            poster={`${import.meta.env.BASE_URL}hero-poster.jpg`}
            muted
            playsInline
            preload={isMobileViewport ? 'metadata' : 'auto'}
            disablePictureInPicture
            style={{ opacity: showScrubVideo && progress > 0.002 ? 1 : 0 }}
            onLoadedMetadata={() => {
              const video = videoRef.current;
              if (video) {
                video.pause();
                video.currentTime = 0;
                currentTimeRef.current = 0;
                setVideoMetadataReady(true);
                if (isMobileViewport) {
                  setVideoReady(true);
                }
              }
            }}
            onCanPlayThrough={() => setVideoReady(true)}
        />
        <div className={styles.heroScrubWatermarkCover} aria-hidden="true" />
        <div
          className={styles.heroScrubBlockOne}
          style={{
            opacity: blockOneOpacity,
            visibility: progress < 0.46 ? 'visible' : 'hidden',
            pointerEvents: blockOneOpacity > 0.5 ? 'auto' : 'none',
          }}
        >
          <MemoHeroScene
            className={styles.heroScrubHero}
            onArrowClick={scrollToSecondFrame}
          />
        </div>
        <section
          className={styles.heroScrubStory}
          style={{
            opacity: storyOpacity,
            visibility: progress > 0.69 ? 'visible' : 'hidden',
          }}
          aria-label="Почему одни дни складываются легко, а другие нет?"
        >
          {progress > 0.69 ? <HeroStoryContent /> : null}
        </section>
        <div
          className={`${styles.heroScrubLoader} ${
            videoReady ? styles.heroScrubLoaderHidden : ''
          }`}
          aria-hidden="true"
        >
          <span />
        </div>
      </div>
    </div>
  );
}

function TransparentPhoneMockup({
  src,
  alt,
  screen,
  children,
  className = '',
  rotate = 0,
  scale = 1,
  delay = 0,
}: {
  src?: string;
  alt?: string;
  screen: ScreenKind;
  children?: ReactNode;
  className?: string;
  rotate?: number;
  scale?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const regions = screenRegions[screen];

  return (
    <motion.div
      className={`${styles.transparentPhoneMockup} ${screenClasses[screen]} ${className}`}
      initial={false}
      animate={{ opacity: 1, y: 0, rotate, scale }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.phoneAtmosphere} aria-hidden="true" />
      <div className={styles.storyField} aria-hidden="true">
        <span className={`${styles.storyLine} ${styles.storyLineOne}`} />
        <span className={`${styles.storyLine} ${styles.storyLineTwo}`} />
        <span className={`${styles.storyLine} ${styles.storyLineThree}`} />
        <span className={styles.sourceGlow} />
      </div>
      <div className={styles.deviceShell}>
        <span
          className={`${styles.deviceButton} ${styles.deviceButtonTop}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.deviceButton} ${styles.deviceButtonMiddle}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.deviceButton} ${styles.deviceButtonLower}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.deviceButton} ${styles.deviceButtonRight}`}
          aria-hidden="true"
        />
        <div className={styles.deviceGlass}>
          <div className={styles.screenWell}>
            {children ?? (
              <>
                <img
                  src={src}
                  alt={alt}
                  className={`${styles.phoneImage} ${styles.phoneImageBase}`}
                />
                {regions.map((region, index) => (
                  <ScreenRevealRegion
                    clipPath={region.clipPath}
                    offset={region.offset}
                    index={index}
                    key={`${screen}-${index}`}
                  />
                ))}
                <motion.span
                  className={styles.screenFocus}
                  animate={
                    reduceMotion
                      ? { opacity: 0.3, scale: 1 }
                      : {
                          opacity: [0.12, 0.46, 0.2],
                          scale: [0.94, 1.05, 0.98],
                        }
                  }
                  transition={{
                    duration: screen === 'la' ? 5.8 : 3.6,
                    repeat: reduceMotion ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                />
                <motion.span
                  className={styles.screenSignal}
                  animate={
                    reduceMotion
                      ? { opacity: 0.22, x: 0 }
                      : {
                          opacity: [0.08, 0.32, 0.08],
                          x: ['-10%', '10%', '-10%'],
                        }
                  }
                  transition={{
                    duration: screen === 'la' ? 7 : 4.8,
                    repeat: reduceMotion ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                />
              </>
            )}
          </div>
          <div className={styles.glassReflection} aria-hidden="true" />
          <div className={styles.edgeHighlight} aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  );
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const outerRevealEase = [0.22, 1, 0.36, 1] as const;

function getOuterRevealProps(inView: boolean, delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.82, delay, ease: outerRevealEase },
  };
}

function LivingPlanningDemo({ inView }: { inView: boolean }) {
  const reduceMotion = useReducedMotion();
  const phoneStageRef = useRef<HTMLDivElement>(null);
  const phoneInView = useInView(phoneStageRef, { once: true, amount: 0.45 });

  return (
    <div className={styles.dualPhones}>
      <motion.div
        ref={phoneStageRef}
        className={styles.calendarPhoneStage}
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={
          inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 18 }
        }
        transition={{ duration: 0.82, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        {phoneInView ? (
          <Suspense fallback={null}>
            <CalendarScreenAnimation
              key="calendar-play"
              autoPlay
              className={styles.calendarPhone}
              scale={0.7}
            />
          </Suspense>
        ) : null}
      </motion.div>
    </div>
  );
}

function ClockSpacerDemo({ inView }: { inView: boolean }) {
  const reduceMotion = useReducedMotion();
  const phoneStageRef = useRef<HTMLDivElement>(null);
  const phoneInView = useInView(phoneStageRef, { once: true, amount: 0.45 });

  return (
    <div className={`${styles.dualPhones} ${styles.clockSpacerPhones}`}>
      <motion.div
        ref={phoneStageRef}
        className={styles.clockPhoneStage}
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={
          inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 18 }
        }
        transition={{
          duration: 0.82,
          delay: reduceMotion ? 0 : 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {phoneInView ? (
          <Suspense fallback={null}>
            <HoursScreenAnimation
              key="hours-play"
              autoPlay
              className={styles.clockPhone}
              scale={0.7}
            />
          </Suspense>
        ) : null}
      </motion.div>
    </div>
  );
}

function StackedSection({
  children,
  className,
  id,
  layer,
  sectionRef,
}: {
  children: ReactNode;
  className: string;
  id?: string;
  layer: number;
  sectionRef?: RefObject<HTMLElement | null>;
}) {
  return (
    <section
      ref={sectionRef}
      className={`${styles.stackedSection} ${className}`}
      id={id}
      style={{ zIndex: layer }}
    >
      {children}
    </section>
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const todaySectionRef = useRef<HTMLElement>(null);
  const planningSectionRef = useRef<HTMLElement>(null);
  const clockSectionRef = useRef<HTMLElement>(null);
  const laSectionRef = useRef<HTMLElement>(null);
  const todayPhoneRef = useRef<HTMLDivElement>(null);
  const laPhoneRef = useRef<HTMLDivElement>(null);
  const todaySectionInView = useInView(todaySectionRef, { once: true, amount: 0.2 });
  const planningSectionInView = useInView(planningSectionRef, { once: true, amount: 0.2 });
  const clockSectionInView = useInView(clockSectionRef, { once: true, amount: 0.2 });
  const laSectionInView = useInView(laSectionRef, { once: true, amount: 0.2 });
  const todayPhoneInView = useInView(todayPhoneRef, { once: true, amount: 0.24 });
  const laPhoneInView = useInView(laPhoneRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll();
  const ambientOne = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const ambientTwo = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <main className={styles.page}>
      <motion.div className={styles.ambientOne} style={{ y: ambientOne }} />
      <motion.div className={styles.ambientTwo} style={{ y: ambientTwo }} />

      <HeroScrubSection />

      <StackedSection
        className={`${styles.todaySection} ${styles.todayStandaloneSection}`}
        id="today"
        layer={2}
        sectionRef={todaySectionRef}
      >
          <motion.img
            src={assets.todaySparkles}
            alt=""
            className={styles.todaySparkles}
            aria-hidden="true"
            {...getOuterRevealProps(todaySectionInView, 0)}
          />
          <motion.img
            src={assets.todayOrnament}
            alt=""
            className={styles.todayOrnament}
            aria-hidden="true"
            {...getOuterRevealProps(todaySectionInView, 0.06)}
          />
          <motion.div
            ref={todayPhoneRef}
            className={styles.todayStage}
            {...getOuterRevealProps(todaySectionInView, 0.12)}
          >
            <div className={styles.todayPhoneReveal}>
              {todayPhoneInView ? (
                <Suspense fallback={null}>
                  <TodayScreenAnimation
                    key="today-play"
                    autoPlay
                    className={styles.todayPhone}
                    scale={0.7}
                  />
                </Suspense>
              ) : null}
            </div>
          </motion.div>
          <TodayCopy className={styles.todayStandaloneCopy} inView={todaySectionInView} />
      </StackedSection>

      <StackedSection className={styles.planningSection} layer={3} sectionRef={planningSectionRef}>
        <motion.img
          src={assets.todaySparkles}
          alt=""
          className={styles.planningSparkles}
          aria-hidden="true"
          {...getOuterRevealProps(planningSectionInView, 0)}
        />
        <motion.img
          src={assets.planningCloud}
          alt=""
          className={styles.planningCloud}
          aria-hidden="true"
          {...getOuterRevealProps(planningSectionInView, 0.06)}
        />
        <div className={styles.planningCopy}>
          <motion.h2 {...getOuterRevealProps(planningSectionInView, 0.08)}>Ваш календарь</motion.h2>
          <motion.span {...getOuterRevealProps(planningSectionInView, 0.18)}>Будьте на шаг впереди</motion.span>
          <motion.p {...getOuterRevealProps(planningSectionInView, 0.24)}>
            Следите за благоприятными датами и планируйте важные дела заранее
          </motion.p>
        </div>
        <LivingPlanningDemo inView={planningSectionInView} />
      </StackedSection>

      <StackedSection className={styles.clockSection} layer={4} sectionRef={clockSectionRef}>
        <motion.img
          src={assets.todaySparkles}
          alt=""
          className={styles.clockSparkles}
          aria-hidden="true"
          {...getOuterRevealProps(clockSectionInView, 0)}
        />
        <motion.img
          src={assets.planningKnot}
          alt=""
          className={styles.clockKnot}
          aria-hidden="true"
          {...getOuterRevealProps(clockSectionInView, 0.06)}
        />
        <div className={styles.clockCopy}>
          <motion.h2 {...getOuterRevealProps(clockSectionInView, 0.08)}>Находите удачные часы</motion.h2>
          <motion.span {...getOuterRevealProps(clockSectionInView, 0.18)}>Когда действовать?</motion.span>
          <motion.p {...getOuterRevealProps(clockSectionInView, 0.24)}>
            Узнайте, какое время дня считается наиболее благоприятным для ваших
            планов
          </motion.p>
        </div>
        <ClockSpacerDemo inView={clockSectionInView} />
      </StackedSection>

      <StackedSection className={styles.laSection} layer={5} sectionRef={laSectionRef}>
        <motion.img
          src={assets.todaySparkles}
          alt=""
          className={styles.laSparkles}
          aria-hidden="true"
          {...getOuterRevealProps(laSectionInView, 0)}
        />
        <motion.img
          src={assets.laFlower}
          alt=""
          className={styles.laFlower}
          aria-hidden="true"
          {...getOuterRevealProps(laSectionInView, 0.06)}
        />
        <div className={styles.laCopy}>
          <motion.h2 {...getOuterRevealProps(laSectionInView, 0.08)}>
            ЧТО ТАКОЕ
            <br />
            ЭНЕРГИЯ ЛА?
          </motion.h2>
          <motion.span {...getOuterRevealProps(laSectionInView, 0.18)}>Знание, которое веками хранил Тибет</motion.span>
          <motion.div className={styles.laDescription} {...getOuterRevealProps(laSectionInView, 0.24)}>
            <p>
              Приложение показывает движение энергии ЛА согласно традициям
              Калачакры и Бушми
            </p>
          </motion.div>
        </div>
        <div className={styles.laVisual}>
          <motion.div
            ref={laPhoneRef}
            className={styles.laPhoneReveal}
            {...getOuterRevealProps(laSectionInView, 0.12)}
          >
            {laPhoneInView ? (
              <Suspense fallback={null}>
                <LaEnergyScreenAnimation
                  key="la-play"
                  autoPlay
                  className={styles.laPhone}
                  scale={0.7}
                />
              </Suspense>
            ) : null}
          </motion.div>
        </div>
      </StackedSection>

      <StackedSection className={styles.finalCta} layer={6}>
        <img
          src={assets.finalCtaBackground}
          alt=""
          className={styles.finalCtaBackground}
          aria-hidden="true"
        />
        <img
          src={assets.finalCtaHandsRotated}
          alt=""
          className={styles.finalCtaHandsRotated}
          aria-hidden="true"
        />
        <img
          src={assets.finalCtaHandsFront}
          alt=""
          className={styles.finalCtaHandsFront}
          aria-hidden="true"
        />
        <img
          src={assets.finalCtaFrame}
          alt=""
          className={styles.finalCtaFrame}
          aria-hidden="true"
        />
        <img
          src={assets.heroLogo}
          alt="Tibet Astro"
          className={styles.finalCtaLogo}
        />
        <Reveal className={styles.finalInner}>
          <h2>
            Мудрость Тибета не требует поиска,
            <br />
            она уже здесь
          </h2>
        </Reveal>
        <motion.div
          className={styles.heroStoreRow}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.86 }}
        >
          <HeroStoreButton store="google" />
          <HeroStoreButton store="apple" />
        </motion.div>
      </StackedSection>
    </main>
  );
}

export default App;
