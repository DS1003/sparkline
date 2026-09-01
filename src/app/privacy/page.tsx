import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SectionCTA } from '@/components/layout/SectionCTA'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | SPARKLINE',
  description: 'Découvrez comment SPARKLINE protège vos données personnelles, conformément à la réglementation sénégalaise et aux standards internationaux de protection de la vie privée.',
}

export default function PrivacyPage() {
  const lastUpdated = '1er Septembre 2026'

  const sections = [
    {
      id: 'engagement',
      number: '01',
      title: 'Engagement & Transparence',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>
            Chez <strong>SPARKLINE</strong> (ci-après « nous », « notre » ou « SPARKLINE »), studio de design, d’ingénierie logicielle et de transformation digitale basé à Dakar, Sénégal, nous attachons une importance capitale à la confidentialité et à la sécurité de vos données personnelles.
          </p>
          <p>
            Cette politique décrit la manière dont nous collectons, utilisons, traitons et protégeons les informations que vous nous transmettez lorsque vous naviguez sur notre site internet, utilisez nos services ou souscrivez à nos programmes Sparklearn.
          </p>
        </div>
      ),
    },
    {
      id: 'collecte',
      number: '02',
      title: 'Données Collectées',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>
            Nous ne collectons que les données strictement nécessaires à l’accomplissement des finalités pour lesquelles elles sont recueillies :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Données de contact et d’échanges :</strong> Nom, prénom, adresse e-mail professionnelle, numéro de téléphone (WhatsApp), entreprise et description de projet communiqués via nos formulaires de contact.
            </li>
            <li>
              <strong>Abonnement Newsletter :</strong> Adresse e-mail transmise pour recevoir nos publications et actualités technologiques.
            </li>
            <li>
              <strong>Candidatures & Recrutement :</strong> CV, lettre de motivation, portfolio et informations professionnelles soumis pour rejoindre notre équipe.
            </li>
            <li>
              <strong>Données techniques de navigation :</strong> Données anonymisées relatives aux performances de navigation (type d’appareil, navigateur, pages consultées) sans traçage intrusif.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'finalites',
      number: '03',
      title: 'Finalités & Utilisation des Données',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>Vos informations sont utilisées exclusivement pour :</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Répondre précisément à vos demandes de projets, devis et consultations stratégiques.</li>
            <li>Exécuter et gérer les contrats de prestation de services digitaux.</li>
            <li>Gérer les inscriptions à nos ateliers et masterclasses Sparklearn.</li>
            <li>Vous transmettre notre veille stratégique et nos actualités si vous y avez consenti.</li>
            <li>Améliorer en continu la fluidité, l’accessibilité et la sécurité de notre plateforme web.</li>
          </ul>
          <p className="pt-2 font-medium text-neutral-900">
            En aucun cas vos données ne sont vendues, louées ou cédées à des tiers à des fins commerciales.
          </p>
        </div>
      ),
    },
    {
      id: 'securite',
      number: '04',
      title: 'Stockage & Sécurité des Informations',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>
            SPARKLINE met en œuvre des mesures techniques et organisationnelles conformes aux standards de l'industrie (chiffrement TLS/SSL de bout en bout, hébergement sécurisé, accès restreint aux seuls collaborateurs autorisés) pour protéger vos données contre toute perte, altération, divulgation non autorisée ou accès illicite.
          </p>
          <p>
            Les données de contact liées aux devis et échanges commerciaux sont conservées pour une durée maximale de 3 ans à compter du dernier contact, avant archivage ou suppression définitive.
          </p>
        </div>
      ),
    },
    {
      id: 'droits',
      number: '05',
      title: 'Vos Droits & Contrôle de vos Données',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>
            Conformément à la loi sénégalaise n° 2008-12 relative à la protection des données à caractère personnel et aux standards internationaux (RGPD), vous bénéficiez des droits suivants :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Droit d'accès et de rectification :</strong> Vous pouvez demander une copie de vos données et exiger leur mise à jour.</li>
            <li><strong>Droit à l'effacement (« droit à l'oubli ») :</strong> Vous pouvez demander la suppression complète de vos données personnelles.</li>
            <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer à tout moment à l'envoi de nos communications ou révoquer votre consentement via le lien de désinscription présent dans nos e-mails.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'contact',
      number: '06',
      title: 'Contact & Délégué à la Protection',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>
            Pour toute question relative à cette politique ou pour exercer l'un de vos droits, vous pouvez contacter directement notre équipe :
          </p>
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2 text-sm text-neutral-800">
            <p><strong>SPARKLINE Digital Studio</strong></p>
            <p>Dakar, Sénégal</p>
            <p>E-mail : <a href="mailto:privacy@sparklinesn.com" className="text-[#EB4604] hover:underline font-medium">privacy@sparklinesn.com</a> ou <a href="mailto:contact@sparklinesn.com" className="text-[#EB4604] hover:underline font-medium">contact@sparklinesn.com</a></p>
            <p>WhatsApp & Téléphone : <span className="font-mono text-neutral-900">+221 78 597 86 53</span></p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Cadre Légal"
        title="Politique de"
        highlight="confidentialité."
        subtitle="Découvrez notre engagement strict envers la transparence, la protection de vos données et le respect de votre vie privée."
        breadcrumbs={[{ label: 'Politique de confidentialité', href: '/privacy' }]}
        metaItems={[
          { label: 'Dernière mise à jour', value: lastUpdated },
          { label: 'Juridiction', value: 'Dakar, Sénégal' },
          { label: 'Conformité', value: 'Loi 2008-12 & RGPD' },
        ]}
      />

      {/* Main Content Section */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
            {sections.map((sec, idx) => (
              <RevealOnScroll key={sec.id} delay={idx * 0.05}>
                <div className="p-8 sm:p-10 rounded-[28px] sm:rounded-[32px] bg-white border border-[#E5E7EB] shadow-[0_2px_16px_rgba(0,0,0,0.02)] space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#EB4604] px-2.5 py-1 rounded-full bg-[#EB4604]/10">
                      {sec.number}
                    </span>
                    <h2
                      className="text-xl sm:text-2xl font-semibold text-[#0A0A0A] tracking-tight"
                      style={{ fontFamily: 'var(--font-family--primary-font)' }}
                    >
                      {sec.title}
                    </h2>
                  </div>
                  <div className="pt-2 border-t border-neutral-100">
                    {sec.content}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* Direct CTA */}
      <SectionCTA
        tag="Une Question Juridique ou Technique ?"
        title="Nous sommes à votre écoute pour échanger sur vos projets."
        primaryLabel="Contactez l'équipe"
        primaryHref="/contact"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />
    </main>
  )
}
