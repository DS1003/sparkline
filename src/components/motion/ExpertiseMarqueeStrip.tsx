'use client'

import React from 'react'
import CurvedLoop from './CurvedLoop'

const MARQUEE_TEXT =
  'Solutions Hybrides ✦ Réseaux Sécurisés & Scalables ✦ Observabilité & Monitoring ✦ Architecture Haute Disponibilité ✦ Sécurité & Conformité ✦ Performance & Vélocité ✦ '

export function ExpertiseMarqueeStrip() {
  return (
    <div
      className="w-full bg-white select-none relative z-10"
      style={{ fontFamily: 'var(--font-family--primary-font)' }}
    >
      <CurvedLoop
        marqueeText={MARQUEE_TEXT}
        speed={1.4}
        curveAmount={80}
        direction="left"
        interactive={true}
        className="expertise-marquee-text"
      />

      <style>{`
        .expertise-marquee-text {
          font-size: clamp(3rem, 6vw, 4rem);
          font-family: var(--font-family--primary-font);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          fill: #EB4604;
        }
        .curved-loop-svg {
          fill: #EB4604;
          overflow: visible;
        }
        .curved-loop-jacket {
          overflow: visible;
          padding: 0.5rem 0 1.5rem;
        }
        @media (max-width: 640px) {
          .expertise-marquee-text {
            font-size: 5.5rem;
          }
          .curved-loop-svg {
            aspect-ratio: 100 / 45;
          }
          .curved-loop-jacket {
            padding: 0.5rem 0 2.5rem;
          }
        }
      `}</style>
    </div>
  )
}
