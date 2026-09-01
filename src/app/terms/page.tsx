import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { SectionCTA } from '@/components/layout/SectionCTA'

export const metadata: Metadata = {
  title: 'Conditions Générales d’Utilisation | SPARKLINE',
  description: 'Consultez les conditions régissant l’accès et l’utilisation des services, plateformes et créations numériques de SPARKLINE Digital Studio.',
}

export default function TermsPage() {
  const lastUpdated = '1er Septembre 2026'

  const sections = [
    {
      id: 'objet',
      number: '01',
      title: 'Objet & Champ d’Application',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>
            Les présentes Conditions Générales d’Utilisation (les « CGU ») ont pour objet d’encadrer l’accès et les modalités d’utilisation du site web <a href="https://sparklinesn.com" className="text-[#EB4604] hover:underline font-medium">sparklinesn.com</a>, édité par <strong>SPARKLINE</strong>, studio de stratégie, design et ingénierie logicielle basé à Dakar, Sénégal.
          </p>
          <p>
            Toute navigation sur le site ou recours à nos prestations implique l’acceptation pleine, entière et sans réserve des présentes conditions par l’utilisateur.
          </p>
        </div>
      ),
    },
    {
      id: 'propriete',
      number: '02',
      title: 'Propriété Intellectuelle & Droits Réservés',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>
            L’ensemble des contenus présents sur le site (incluant sans limitation : logos, charte graphique, iconographie SPARKLINE, typographies, code source, animations interactives, photographies, études de cas et méthodologies) sont protégés par le droit de la propriété intellectuelle en vigueur au Sénégal et par les traités internationaux de l'OAPI (Organisation Africaine de la Propriété Intellectuelle).
          </p>
          <p>
            Toute reproduction, représentation, diffusion, extraction ou modification, totale ou partielle, sans l’autorisation écrite préalable de SPARKLINE est strictement interdite et constituerait une contrefaçon susceptible d'engager la responsabilité civile et pénale de son auteur.
          </p>
        </div>
      ),
    },
    {
      id: 'services',
      number: '03',
      title: 'Prestations de Services & Engagements',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>
            SPARKLINE délivre des prestations d’ingénierie web & mobile, de conception UI/UX, d’infrastructures Cloud & DevOps, d’identité de marque et de formations spécialisées via SPARKlearn.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Cahier des charges & Devis :</strong> Toute collaboration contractuelle fait l’objet d’une proposition commerciale ou d'un devis préalable validé par les deux parties.
            </li>
            <li>
              <strong>Obligation de moyens :</strong> SPARKLINE s’engage à mobiliser ses meilleures compétences, outils et ressources d’ingénierie logicielle pour mener à bien les missions confiées selon les règles de l’art.
            </li>
            <li>
              <strong>Confidentialité des projets clients :</strong> Toutes les informations confidentielles partagées dans le cadre de consultations ou développements font l’objet d’un engagement de non-divulgation strict (NDA).
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'disponibilite',
      number: '04',
      title: 'Accès au Site & Disponibilité',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>
            Nous nous efforçons de maintenir un accès continu et performant à notre plateforme 24h/24 et 7j/7. Toutefois, l’accès peut être ponctuellement suspendu ou restreint sans préavis pour des raisons de maintenance technique, d'optimisation d'infrastructures ou en cas de force majeure.
          </p>
          <p>
            SPARKLINE ne saurait être tenue responsable des éventuelles interruptions de réseau, incompatibilités de matériel tiers ou dysfonctionnements liés à des prestataires d'accès internet.
          </p>
        </div>
      ),
    },
    {
      id: 'responsabilite',
      number: '05',
      title: 'Limitation de Responsabilité',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>
            Les informations, analyses et articles publiés sur ce site sont fournis à titre informatif. Bien que SPARKLINE veille à l’exactitude et à l’actualité des contenus diffusés, elle ne peut garantir l’absence totale d’erreurs ou d’omissions.
          </p>
          <p>
            L’utilisateur demeure seul responsable de l’usage qu’il fait des contenus et informations disponibles sur le site.
          </p>
        </div>
      ),
    },
    {
      id: 'juridiction',
      number: '06',
      title: 'Droit Applicable & Juridiction Compétente',
      content: (
        <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
          <p>
            Les présentes Conditions Générales d’Utilisation sont régies et interprétées conformément au droit sénégalais.
          </p>
          <p>
            En cas de litige relatif à l’interprétation, l’exécution ou la validité des présentes, les parties s’engagent à rechercher prioritairement une solution amiable. À défaut d’accord amiable dans un délai de 30 jours, le litige sera soumis à la compétence exclusive des tribunaux compétents de <strong>Dakar, Sénégal</strong>.
          </p>
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2 text-sm text-neutral-800">
            <p><strong>SPARKLINE Digital Studio</strong></p>
            <p>Dakar, Sénégal</p>
            <p>Contact juridique : <a href="mailto:legal@sparklinesn.com" className="text-[#EB4604] hover:underline font-medium">legal@sparklinesn.com</a></p>
            <p>Téléphone : <span className="font-mono text-neutral-900">+221 78 597 86 53</span></p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <PageHero
        tag="Mentions & Règles"
        title="Conditions d'utilisation"
        highlight="du studio."
        subtitle="Consultez les termes régissant l'utilisation de nos plateformes numériques, nos créations et l'accès à nos prestations de services."
        breadcrumbs={[{ label: "Conditions d'utilisation", href: '/terms' }]}
        metaItems={[
          { label: 'Dernière mise à jour', value: lastUpdated },
          { label: 'Réglementation', value: 'Droit Sénégalais (OHADA / OAPI)' },
          { label: 'Tribunal compétent', value: 'Dakar, Sénégal' },
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
        tag="Démarrer une Collaboration"
        title="Prêt à donner une nouvelle dimension à vos produits numériques ?"
        primaryLabel="Parlons de votre projet"
        primaryHref="/contact"
        secondaryLabel="Voir nos réalisations"
        secondaryHref="/projects"
      />
    </main>
  )
}
