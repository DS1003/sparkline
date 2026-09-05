import React from 'react'
import { Metadata } from 'next'
import { LegalPageLayout } from '@/features/legal/components/LegalPageLayout'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Conditions Générales d’Utilisation | SPARKLINE',
  description:
    'Consultez les conditions régissant l’accès et l’utilisation des services, plateformes et créations numériques de SPARKLINE Digital Studio, conformément au droit sénégalais et aux conventions OAPI.',
}

export default function TermsPage() {
  const lastUpdated = '01/09/2026'

  const highlights = [
    {
      label: 'Propriété Intellectuelle',
      value: 'Protection OAPI & Droits',
      description:
        'L’ensemble des créations, codes sources, designs et méthodologies du studio sont rigoureusement protégés.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      label: 'Engagement Qualité',
      value: 'Obligation de Moyens',
      description:
        'Mobilisation des plus hauts standards d’ingénierie logicielle et de design pour chaque projet client.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      label: 'Confidentialité Client',
      value: 'Accord NDA Systématique',
      description:
        'Protection intégrale et stricte non-divulgation de vos données stratégiques, métiers et techniques.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
    },
  ]

  const sections = [
    {
      id: 'objet',
      number: '01',
      title: 'Objet & Champ d’Application',
      summary: 'Règles d’accès et d’utilisation du site web et des solutions digitales SPARKLINE.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>
            Les présentes Conditions Générales d’Utilisation (les « <strong className="text-neutral-900 font-semibold">CGU</strong> ») ont pour vocation d’encadrer l’accès et les modalités d’utilisation de l’ensemble des plateformes et services numériques édités par <strong className="text-neutral-900 font-semibold">SPARKLINE</strong>, studio d’ingénierie et de design numérique basé à Dakar, Sénégal.
          </p>
          <p>
            L’accès au site web, la consultation de nos contenus ou la souscription à nos offres de développement impliquent l'acceptation formelle, intégrale et sans réserve des dispositions prévues ci-après.
          </p>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F9FB] border border-neutral-200/80 text-neutral-700 text-xs sm:text-sm">
            <span className="text-[#EB4604] font-mono font-bold mr-2">NOTIF :</span>
            SPARKLINE se réserve la possibilité d’adapter les présentes conditions à tout moment pour refléter les évolutions légales ou techniques de nos plateformes.
          </div>
        </div>
      ),
    },
    {
      id: 'propriete',
      number: '02',
      title: 'Propriété Intellectuelle & Droits Réservés',
      summary: 'Code source, designs, logos et méthodologies protégés par le droit d’auteur et l’OAPI.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>
            L'intégralité des éléments constitutifs de l'univers SPARKLINE (notamment : identité visuelle, logos, pictogrammes vectoriels, typographies personnalisées, code source, animations interactives, photographies, études de cas et méthodologies d’ingénierie) sont la propriété exclusive de SPARKLINE et sont protégés au titre des dispositions relatives au droit d'auteur et à la propriété industrielle (<strong className="text-neutral-900 font-semibold">Conventions OAPI</strong>).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 space-y-1.5">
              <span className="font-mono text-xs text-[#EB4604] font-bold">REPRODUCTION STRICTEMENT INTERDITE</span>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Toute réutilisation, copie ou adaptation de nos actifs graphiques ou technologiques sans accord exprès écrit constitue une contrefaçon passible de poursuites.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 space-y-1.5">
              <span className="font-mono text-xs text-[#FFB901] font-bold">CESSION AUX CLIENTS</span>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Les droits d’exploitation sur les livrables réalisés sur mesure pour nos clients font l’objet de cessions contractuelles formalisées et claires.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'services',
      number: '03',
      title: 'Prestations de Services & Engagements',
      summary: 'Devis préalable, obligation de moyens, méthode agile et confidentialité NDA stricte.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>
            SPARKLINE conçoit et délivre des prestations haut de gamme dans les domaines des solutions digitales Web & Mobile, de l'UI/UX design, du Cloud & DevOps, du branding et de la formation professionnelle :
          </p>
          <ul className="space-y-2.5">
            {[
              'Cadrage & Devis Précis : Chaque mission fait l’objet d’un cahier des charges et d’un devis préalablement validés.',
              'Obligation de Moyens Renforcée : Mobilisation continue de nos meilleurs talents et technologies de pointe selon les règles de l’art.',
              'Transparence Itérative : Présentation régulière de prototypes navigables et démos hebdomadaires en méthodologie agile.',
              'Confidentialité NDA : Engagement de non-divulgation absolu sur toutes les données d’affaires et les architectures clients.',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/20 flex items-center justify-center text-[#EB4604] text-xs shrink-0 mt-0.5 font-mono font-bold">
                  ✓
                </span>
                <span className="text-neutral-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'disponibilite',
      number: '04',
      title: 'Accès au Site & Disponibilité',
      summary: 'Disponibilité continue 24/7 sous réserve des opérations de maintenance technique.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>
            Nous veillons à garantir un accès stable, fluide et hautement disponible à notre site web <strong className="text-neutral-900 font-semibold">24h/24 et 7j/7</strong>.
          </p>
          <p>
            Néanmoins, l'accès peut être ponctuellement suspendu sans notification préalable pour des impératifs d'optimisation technique, de déploiement de correctifs de sécurité ou en cas de force majeure indépendante de notre volonté.
          </p>
          <div className="p-4 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 text-xs text-neutral-500">
            SPARKLINE ne saurait être tenue pour responsable des défaillances de connexion imputables aux fournisseurs d'accès internet tiers ou aux équipements terminaux utilisés par l’utilisateur.
          </div>
        </div>
      ),
    },
    {
      id: 'responsabilite',
      number: '05',
      title: 'Limitation de Responsabilité',
      summary: 'Informations publiées à titre méthodologique, conseil sur mesure lors des missions.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>
            Les publications, études comparatives et réflexions stratégiques partagées sur le site SPARKLINE ont une vocation purement informative et méthodologique.
          </p>
          <p>
            Bien que nous accordions une rigueur extrême à la fiabilité des données publiées, SPARKLINE ne saurait être tenue pour responsable des décisions opérationnelles, managériales ou techniques adoptées unilatéralement sur la base de ces lectures sans consultation dédiée.
          </p>
        </div>
      ),
    },
    {
      id: 'juridiction',
      number: '06',
      title: 'Droit Applicable & Juridiction Compétente',
      summary: 'Droit sénégalais et OHADA, conciliation amiable préalable puis tribunaux de Dakar.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>
            Les présentes Conditions Générales d’Utilisation sont soumises au droit sénégalais et aux traités de l'OHADA et de l'OAPI.
          </p>
          <p>
            En cas de contestation ou de différend portant sur leur interprétation ou leur exécution, les parties privilégieront systématiquement la recherche d'une conciliation amiable. À défaut de résolution conjointe dans un délai de 30 jours calendaires, compétence expresse est attribuée aux <strong className="text-neutral-900 font-semibold">tribunaux compétents du ressort de Dakar, Sénégal</strong>.
          </p>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#F8F9FB] border border-neutral-200/80 space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-neutral-900 tracking-tight">SPARKLINE Legal Department</h4>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">Dakar, Sénégal • Pôle Affaires Juridiques & Contrats</p>
              </div>
              <span className="font-mono text-xs text-[#EB4604] px-3 py-1 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/20 font-bold self-start sm:self-auto">
                SUPPORT JURIDIQUE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="p-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 text-xs font-mono text-neutral-700 hover:text-neutral-900 transition-all flex items-center gap-2.5 truncate shadow-2xs"
              >
                <span className="text-[#EB4604] flex items-center shrink-0">
                  <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span className="truncate">{siteConfig.contact.email}</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="p-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 text-xs font-mono text-neutral-700 hover:text-neutral-900 transition-all flex items-center gap-2.5 shadow-2xs"
              >
                <span className="text-[#EB4604] flex items-center shrink-0">
                  <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <span>{siteConfig.contact.phone}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#EB4604] hover:bg-[#D93D00] text-white text-xs font-mono transition-all flex items-center justify-between shadow-2xs group"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <span className="flex items-center shrink-0">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.86 7.03L5 22l4.18-1.57C10.07 20.72 11.02 21 12 21c5.52 0 10-4.03 10-9s-4.48-9-10-9z" />
                    </svg>
                  </span>
                  <span>WhatsApp Direct</span>
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <LegalPageLayout
      tag="Mentions & Conditions Légales"
      title="Conditions d'utilisation"
      pillImage="/images/heroes/services.webp"
      highlight="du studio."
      subtitle="Consultez les termes régissant l'utilisation de nos plateformes numériques, nos créations logicielles et l'accès à nos prestations de services."
      breadcrumbs={[{ label: "Conditions d'utilisation", shortLabel: 'CGU', href: '/terms' }]}
      metaItems={[
        { label: 'Dernière MAJ', shortLabel: 'MAJ', value: lastUpdated },
        { label: 'Droit Applicable', shortLabel: 'OHADA', value: 'OHADA & Droit Sénégalais' },
        { label: 'Tribunal compétent', shortLabel: 'Dakar', value: 'Dakar, Sénégal' },
      ]}
      badgeLabel="Cadre Contractuel & Propriété"
      documentVersion={lastUpdated}
      highlights={highlights}
      sections={sections}
      ctaTag="Démarrer une collaboration"
      ctaTitle="PRÊT À LANCER VOTRE PROJET NUMÉRIQUE ?"
      ctaSubtitle="Bénéficiez d’un accompagnement technique d’élite et d’un cadre d’intervention clair, agile et sécurisé."
      ctaPrimaryLabel="Planifier un échange"
      ctaPrimaryHref="/contact"
      ctaSecondaryLabel="Explorer nos projets"
      ctaSecondaryHref="/projects"
    />
  )
}
