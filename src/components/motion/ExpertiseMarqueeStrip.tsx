'use client';

import React from 'react';

import TextLoop from '@/components/motion/TextLoop';

const expertiseText =
  'Solutions Hybrides ✦ Réseaux Sécurisés & Scalables ✦ Observabilité & Monitoring ✦ Architecture Haute Disponibilité ✦ Sécurité & Conformité ✦ Performance & Vélocité';

export function ExpertiseMarqueeStrip() {
  return (
    <div
      className="
        relative
        z-10
        flex
        h-[175px]
        w-full
        items-center
        justify-center
        overflow-hidden

        sm:block
        sm:h-auto
        sm:-my-12

        lg:-my-16
      "
    >
      <div
        className="
          w-full
          shrink-0

          max-sm:origin-center
          max-sm:scale-[2.1]
        "
      >
        <TextLoop
          text={expertiseText}
          shape="wave"

          speed={75}
          direction="forward"

          separator="✦"

          curviness={34}

          fontSize={22}
          fontWeight={800}
          letterSpacing={1.5}

          uppercase

          color="#ffffff"

          ribbon
          ribbonColor="#EB4604"
          ribbonWidth={54}

          /*
           * Correction du centrage du texte
           * dans le ruban, notamment Safari iOS.
           */
          textOffsetY="0.32em"

          pauseOnHover={false}

          viewBox="0 158 1200 204"

          svgPreserveAspectRatio="xMidYMid meet"
        />
      </div>
    </div>
  );
}