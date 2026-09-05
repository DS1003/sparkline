import React from 'react'
import { Metadata } from 'next'
import { LegalPageLayout } from '@/features/legal/components/LegalPageLayout'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | SPARKLINE',
  description:
    'Découvrez comment SPARKLINE protège vos données personnelles, conformément à la réglementation sénégalaise (Loi 2008-12) et aux standards internationaux de protection de la vie privée (RGPD).',
}

export default function PrivacyPage() {
  const lastUpdated = '01/09/2026'

  const highlights = [
    {
      label: 'Engagement Éthique',
      value: '0 Donnée Commercialisée',
      description:
        'Vos données ne sont jamais vendues, louées ou cédées à des tiers à des fins publicitaires.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      label: 'Sécurité & Infrastructure',
      value: 'Chiffrement TLS 256-bit',
      description:
        'Flux chiffrés de bout en bout, hébergement cloud sécurisé et accès strictement cloisonné.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
    },
    {
      label: 'Conformité & Maîtrise',
      value: 'Droit d’Accès & Oubli',
      description:
        'Suppression ou rectification de vos données sur simple demande par email ou WhatsApp.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
  ]

  const sections = [
    {
      id: 'engagement',
      number: '01',
      title: 'Engagement & Transparence',
      summary: 'Respect strict de la vie privée, zéro revente et conformité Loi 2008-12 & RGPD.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>
            Chez <strong className="text-neutral-900 font-semibold">SPARKLINE</strong> (ci-après « nous », « notre » ou « SPARKLINE »), studio de design d’expérience, d’ingénierie logicielle et de transformation numérique basé à Dakar, Sénégal, nous attachons une importance capitale à la confidentialité, l'intégrité et la protection de vos données personnelles.
          </p>
          <p>
            La présente politique de confidentialité définit la manière dont nous collectons, traitons et protégeons les informations transmises lorsque vous parcourez notre site web, sollicitez nos services digitaux ou rejoignez nos programmes éducatifs <strong className="text-[#EB4604] font-semibold">SPARKlearn</strong>.
          </p>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F9FB] border border-neutral-200/80 text-neutral-700 text-xs sm:text-sm">
            <span className="text-[#EB4604] font-mono font-bold mr-2">PRINCIPE DIRECTEUR :</span>
            Nous appliquons le principe de minimisation des données : seules les données strictement indispensables à la réalisation de nos missions sont collectées et conservées.
          </div>
        </div>
      ),
    },
    {
      id: 'collecte',
      number: '02',
      title: 'Données Collectées',
      summary: 'Collecte minimale limitée aux coordonnées de projet, sans traçage intrusif.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>
            Nous ne collectons que les informations pertinentes et nécessaires aux finalités convenues :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604]" />
                <h4 className="text-sm font-semibold text-neutral-900">Échanges & Projets</h4>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Nom, prénom, email professionnel, téléphone / WhatsApp, entreprise et périmètre de projet communiqués via nos formulaires de contact.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB901]" />
                <h4 className="text-sm font-semibold text-neutral-900">Newsletter & Veille</h4>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Adresse e-mail fournie volontairement pour recevoir nos retours d'expérience, articles d'ingénierie et actualités tech.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EB4604]" />
                <h4 className="text-sm font-semibold text-neutral-900">Recrutement & Carrières</h4>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Curriculum Vitae, lettre de motivation, profil LinkedIn / GitHub et portfolio soumis dans le cadre d'une candidature.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB901]" />
                <h4 className="text-sm font-semibold text-neutral-900">Navigation Technique</h4>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Mesures de performance et données anonymisées relatives à l'expérience utilisateur (type d'appareil, résolution, navigateur).
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'finalites',
      number: '03',
      title: 'Finalités & Utilisation des Données',
      summary: 'Traitement exclusif de vos demandes, devis et programmes SPARKlearn.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>Vos informations sont traitées exclusivement pour répondre aux objectifs suivants :</p>
          <ul className="space-y-2.5">
            {[
              'Instruire et calibrer avec précision vos demandes de devis et cadrages stratégiques.',
              'Concevoir, développer et déployer vos plateformes web, applications mobiles et architectures cloud.',
              'Gérer les sessions de formation, bootcamps et ateliers pratiques dispensés par SPARKlearn.',
              'Assurer un support technique proactif et maintenir la continuité des services contractuels.',
              'Améliorer constamment la réactivité, l’ergonomie et la sécurité de nos interfaces numériques.',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/20 flex items-center justify-center text-[#EB4604] text-xs shrink-0 mt-0.5 font-mono font-bold">
                  ✓
                </span>
                <span className="text-neutral-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
          <div className="p-4 rounded-xl bg-[#EB4604]/10 border border-[#EB4604]/20 text-neutral-900 text-xs sm:text-sm font-medium flex items-center gap-3">
            <span className="w-6 h-6 rounded-lg bg-[#EB4604]/20 text-[#EB4604] flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </span>
            <span>Garantie SPARKLINE : En aucun cas vos données ne font l'objet d'une exploitation commerciale auprès de courtiers de données.</span>
          </div>
        </div>
      ),
    },
    {
      id: 'securite',
      number: '04',
      title: 'Stockage & Sécurité des Informations',
      summary: 'Chiffrement TLS 1.3 de bout en bout, hébergement sécurisé et purge sous 3 ans.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>
            SPARKLINE met en place des protocoles stricts de protection conformes aux meilleures pratiques internationales :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 text-center space-y-1">
              <span className="font-mono text-xs text-[#EB4604] font-bold">HTTPS / TLS 1.3</span>
              <p className="text-xs text-neutral-500">Chiffrement systématique de l'ensemble des requêtes et transferts.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 text-center space-y-1">
              <span className="font-mono text-xs text-[#FFB901] font-bold">ACCÈS RESTREINT</span>
              <p className="text-xs text-neutral-500">Accès cloisonné aux seuls collaborateurs soumis au secret professionnel.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 text-center space-y-1">
              <span className="font-mono text-xs text-[#EB4604] font-bold">RÉTENTION CALIBRÉE</span>
              <p className="text-xs text-neutral-500">Conservation des prospects limitée à 3 ans maximum avant purge.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'droits',
      number: '05',
      title: 'Vos Droits & Contrôle de vos Données',
      summary: 'Accès, rectification et droit à l’oubli garantis sur simple demande écrite.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>
            Conformément à la législation sénégalaise (<strong className="text-neutral-900 font-semibold">Loi n° 2008-12</strong> relative à la protection des données à caractère personnel) et aux standards internationaux du RGPD, vous disposez des prérogatives suivantes :
          </p>
          <div className="space-y-2.5">
            <div className="p-3.5 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 flex items-start gap-3">
              <span className="text-[#EB4604] font-mono text-xs font-bold shrink-0 mt-0.5">01</span>
              <div>
                <h4 className="text-sm font-semibold text-neutral-900">Droit d'accès et d'information</h4>
                <p className="text-xs text-neutral-500">Obtenir confirmation que des données vous concernant sont traitées et en recevoir un extrait complet.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 flex items-start gap-3">
              <span className="text-[#EB4604] font-mono text-xs font-bold shrink-0 mt-0.5">02</span>
              <div>
                <h4 className="text-sm font-semibold text-neutral-900">Droit de rectification</h4>
                <p className="text-xs text-neutral-500">Demander l'actualisation ou la correction immédiate de toute donnée inexacte ou incomplète.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 flex items-start gap-3">
              <span className="text-[#EB4604] font-mono text-xs font-bold shrink-0 mt-0.5">03</span>
              <div>
                <h4 className="text-sm font-semibold text-neutral-900">Droit à l'effacement (« Droit à l'oubli »)</h4>
                <p className="text-xs text-neutral-500">Exiger la suppression définitive de vos données personnelles de l'ensemble de nos serveurs actifs.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8F9FB] border border-neutral-200/70 flex items-start gap-3">
              <span className="text-[#EB4604] font-mono text-xs font-bold shrink-0 mt-0.5">04</span>
              <div>
                <h4 className="text-sm font-semibold text-neutral-900">Droit d'opposition</h4>
                <p className="text-xs text-neutral-500">Vous désabonner à tout moment de nos publications via le lien présent en bas de chaque e-mail.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'contact',
      number: '06',
      title: 'Contact & Délégué à la Protection',
      summary: 'Ligne directe et prise en charge juridique de vos demandes sous 48h ouvrées.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-neutral-600">
          <p>
            Pour exercer l’un de vos droits ou pour toute interrogation d'ordre juridique ou éthique, notre délégué à la protection des données vous répond sous 48h ouvrées :
          </p>
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F8F9FB] border border-neutral-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-neutral-900 tracking-tight">SPARKLINE Digital Studio</h4>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">Dakar, Sénégal • Pôle Conformité & Éthique</p>
              </div>
              <span className="font-mono text-xs text-[#EB4604] px-3 py-1 rounded-full bg-[#EB4604]/10 border border-[#EB4604]/20 font-bold self-start sm:self-auto">
                RÉPONSE SOUS 48H
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
      tag="Cadre Légal & Vie Privée"
      title="Politique de"
      pillImage="/images/heroes/insights.webp"
      highlight="confidentialité."
      subtitle="Découvrez notre engagement strict envers la transparence, la protection de vos données personnelles et le respect de votre vie privée numérique."
      breadcrumbs={[
        { label: 'Politique de confidentialité', shortLabel: 'Confidentialité', href: '/privacy' },
      ]}
      metaItems={[
        { label: 'Dernière MAJ', shortLabel: 'MAJ', value: lastUpdated },
        { label: 'Juridiction', shortLabel: 'Dakar', value: 'Dakar, Sénégal' },
        { label: 'Conformité', shortLabel: 'RGPD', value: 'Loi 2008-12 & RGPD' },
      ]}
      badgeLabel="Engagement Confidentialité & Données"
      documentVersion={lastUpdated}
      highlights={highlights}
      sections={sections}
      ctaTag="Une question sur vos données ?"
      ctaTitle="NOUS SOMMES À VOTRE ÉCOUTE."
      ctaSubtitle="Notre équipe est disponible pour vous accompagner et clarifier tout point concernant la gestion de vos informations."
      ctaPrimaryLabel="Contacter le délégué"
      ctaPrimaryHref="/contact"
      ctaSecondaryLabel="Explorer nos services"
      ctaSecondaryHref="/services"
    />
  )
}
