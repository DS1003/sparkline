'use client';

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { CSSProperties } from 'react';

import { gsap } from 'gsap';

import './TextLoop.css';

const VIEW_W = 1200;
const VIEW_H = 520;

const CX = VIEW_W / 2;
const CY = VIEW_H / 2;

const EDGE_PAD = 6;

const buildPath = (
  shape: string,
  curviness: number,
  ribbonWidth: number
): string => {
  const c = Math.max(0, curviness);

  const room = Math.max(
    20,
    CY - Math.max(0, ribbonWidth) / 2 - EDGE_PAD
  );

  switch (shape) {
    case 'circle': {
      const r = Math.min(90 + c * 0.95, room);

      return `
        M ${CX - r} ${CY}
        A ${r} ${r} 0 1 1 ${CX + r} ${CY}
        A ${r} ${r} 0 1 1 ${CX - r} ${CY}
        Z
      `;
    }

    case 'infinity': {
      const r = 150 + c * 1.4;
      const h = Math.min(60 + c * 0.95, room);

      return [
        `M ${CX} ${CY}`,
        `C ${CX + r * 0.55} ${CY - h} ${CX + r} ${CY - h} ${CX + r
        } ${CY}`,
        `C ${CX + r} ${CY + h} ${CX + r * 0.55} ${CY + h} ${CX} ${CY}`,
        `C ${CX - r * 0.55} ${CY - h} ${CX - r} ${CY - h} ${CX - r
        } ${CY}`,
        `C ${CX - r} ${CY + h} ${CX - r * 0.55} ${CY + h} ${CX} ${CY}`,
        'Z',
      ].join(' ');
    }

    case 'arch': {
      const rise = Math.min(120 + c * 1.1, room * 2);

      return `
        M 120 ${CY + rise / 2}
        Q ${CX} ${CY - rise * 1.5}
        ${VIEW_W - 120} ${CY + rise / 2}
      `;
    }

    case 'line':
      return `M -320 ${CY} L ${VIEW_W + 320} ${CY}`;

    case 'wave':
    default: {
      const a = Math.min(c * 2.2, room * 2);

      return `
        M -320 ${CY}
        Q -160 ${CY - a} 0 ${CY}
        T 320 ${CY}
        T 640 ${CY}
        T 960 ${CY}
        T 1280 ${CY}
        T ${VIEW_W + 320} ${CY}
      `;
    }
  }
};

interface TextLoopProps {
  text?: string;

  shape?: string;

  path?: string;

  speed?: number;

  direction?: 'forward' | 'reverse';

  separator?: string;

  curviness?: number;

  fontSize?: number;

  fontWeight?: number;

  letterSpacing?: number;

  uppercase?: boolean;

  color?: string;

  ribbon?: boolean;

  ribbonColor?: string;

  ribbonWidth?: number;

  pauseOnHover?: boolean;

  className?: string;

  style?: CSSProperties;

  viewBox?: string;

  svgPreserveAspectRatio?: string;

  svgStyle?: CSSProperties;

  /**
   * Décalage vertical du texte par rapport au centre du path.
   *
   * Utiliser une valeur en "em" permet au décalage de rester
   * proportionnel à la taille de la typo.
   *
   * 0.28em = léger
   * 0.32em = recommandé
   * 0.36em = plus bas
   */
  textOffsetY?: string | number;
}

const TextLoop = ({
  text = 'React ✦ Bits',

  shape = 'wave',

  path,

  speed = 90,

  direction = 'forward',

  separator = '✦',

  curviness = 90,

  fontSize = 46,

  fontWeight = 800,

  letterSpacing = 2,

  uppercase = true,

  color = '#ffffff',

  ribbon = true,

  ribbonColor = '#5227FF',

  ribbonWidth = 86,

  pauseOnHover = true,

  className = '',

  style = {},

  viewBox: viewBoxProp,

  svgPreserveAspectRatio = 'xMidYMid meet',

  svgStyle,

  // Important pour Safari / iPhone
  textOffsetY = '0.32em',
}: TextLoopProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const pathRef = useRef<SVGPathElement>(null);

  const measureRef = useRef<SVGTextElement>(null);

  const headRef = useRef<SVGTextPathElement>(null);

  const tailRef = useRef<SVGTextPathElement>(null);

  const [metrics, setMetrics] = useState({
    length: 0,
    reps: 1,
  });

  const rawId = useId();

  const pathId = `text-loop-${rawId.replace(/:/g, '')}`;

  /**
   * Construction du chemin SVG.
   */
  const d = useMemo(
    () => path || buildPath(shape, curviness, ribbonWidth),
    [path, shape, curviness, ribbonWidth]
  );

  /**
   * Texte utilisé pour constituer la boucle.
   */
  const unit = useMemo(() => {
    const base = uppercase
      ? String(text).toUpperCase()
      : String(text);

    const gap = separator
      ? `\u00A0${separator}\u00A0`
      : '\u00A0\u00A0\u00A0';

    return `${base}${gap}`;
  }, [text, separator, uppercase]);

  /**
   * Important :
   * la mesure et le rendu utilisent exactement
   * les mêmes propriétés typographiques.
   */
  const textStyle = useMemo<CSSProperties>(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
      fontFamily: 'inherit',
    }),
    [fontSize, fontWeight, letterSpacing]
  );

  /**
   * Mesure du path + largeur réelle d'une unité de texte.
   */
  useLayoutEffect(() => {
    const pathEl = pathRef.current;
    const measureEl = measureRef.current;

    if (!pathEl || !measureEl) {
      return undefined;
    }

    let cancelled = false;

    const measure = () => {
      if (cancelled) {
        return;
      }

      let length = 0;
      let unitWidth = 0;

      try {
        length = pathEl.getTotalLength();
        unitWidth = measureEl.getComputedTextLength();
      } catch {
        return;
      }

      if (!length) {
        return;
      }

      /*
       * On préfère ceil à round.
       *
       * Cela garantit qu'il y a toujours suffisamment de texte
       * pour couvrir l'intégralité du chemin, même lorsque les
       * métriques diffèrent légèrement sur Safari/iOS.
       */
      const reps =
        unitWidth > 0
          ? Math.max(1, Math.ceil(length / unitWidth))
          : 1;

      setMetrics((prev) => {
        if (
          Math.abs(prev.length - length) < 0.01 &&
          prev.reps === reps
        ) {
          return prev;
        }

        return {
          length,
          reps,
        };
      });
    };

    measure();

    /**
     * On remesure lorsque les fonts sont réellement chargées.
     * Particulièrement important sur Safari.
     */
    if (
      typeof document !== 'undefined' &&
      document.fonts?.ready
    ) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) {
            measure();
          }
        })
        .catch(() => { });
    }

    return () => {
      cancelled = true;
    };
  }, [
    d,
    unit,
    fontSize,
    fontWeight,
    letterSpacing,
  ]);

  /**
   * Animation continue avec deux copies du texte.
   */
  useEffect(() => {
    const { length } = metrics;

    const head = headRef.current;
    const tail = tailRef.current;

    if (!head || !tail || !length) {
      return undefined;
    }

    const apply = (offset: number) => {
      const partner =
        offset >= 0
          ? offset - length
          : offset + length;

      head.setAttribute(
        'startOffset',
        String(offset)
      );

      tail.setAttribute(
        'startOffset',
        String(partner)
      );
    };

    apply(0);

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    if (prefersReduced || speed <= 0) {
      return undefined;
    }

    const state = {
      offset: 0,
    };

    const tween = gsap.to(state, {
      offset:
        direction === 'reverse'
          ? -length
          : length,

      duration: length / speed,

      ease: 'none',

      repeat: -1,

      onUpdate: () => {
        apply(state.offset);
      },
    });

    const root = rootRef.current;

    const pause = () => {
      tween.pause();
    };

    const resume = () => {
      tween.resume();
    };

    if (pauseOnHover && root) {
      root.addEventListener(
        'pointerenter',
        pause
      );

      root.addEventListener(
        'pointerleave',
        resume
      );
    }

    return () => {
      tween.kill();

      if (pauseOnHover && root) {
        root.removeEventListener(
          'pointerenter',
          pause
        );

        root.removeEventListener(
          'pointerleave',
          resume
        );
      }
    };
  }, [
    metrics,
    speed,
    direction,
    pauseOnHover,
  ]);

  const loopText = unit.repeat(metrics.reps);

  const fitLength =
    metrics.length || undefined;

  return (
    <div
      ref={rootRef}
      className={`text-loop ${className}`.trim()}
      style={style}
    >
      <svg
        className="text-loop-svg"
        viewBox={
          viewBoxProp ??
          `0 0 ${VIEW_W} ${VIEW_H}`
        }
        preserveAspectRatio={
          svgPreserveAspectRatio
        }
        role="img"
        aria-label={text}
        style={{
          display: 'block',
          ...svgStyle,
        }}
      >
        {/* RUBAN / PATH */}
        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
          stroke={
            ribbon
              ? ribbonColor
              : 'none'
          }
          strokeWidth={
            ribbon
              ? ribbonWidth
              : 0
          }
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/*
          Élément invisible uniquement utilisé
          pour mesurer précisément le texte.
        */}
        <text
          ref={measureRef}
          className="text-loop-measure"
          style={textStyle}
          aria-hidden="true"
        >
          {unit}
        </text>

        {/*
          PREMIÈRE COPIE

          IMPORTANT :
          dominantBaseline="central" a été supprimé.

          Le placement vertical est maintenant contrôlé
          explicitement par dy, ce qui est beaucoup plus
          fiable sur Safari/iOS avec textPath.
        */}
        <text
          className="text-loop-text"
          style={textStyle}
          fill={color}
          dy={textOffsetY}
          aria-hidden="true"
        >
          <textPath
            ref={headRef}
            href={`#${pathId}`}
            startOffset={0}
            textLength={fitLength}
            lengthAdjust="spacing"
          >
            {loopText}
          </textPath>
        </text>

        {/* DEUXIÈME COPIE POUR LA BOUCLE INFINIE */}
        <text
          className="text-loop-text"
          style={textStyle}
          fill={color}
          dy={textOffsetY}
          aria-hidden="true"
        >
          <textPath
            ref={tailRef}
            href={`#${pathId}`}
            startOffset={0}
            textLength={fitLength}
            lengthAdjust="spacing"
          >
            {loopText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default TextLoop;