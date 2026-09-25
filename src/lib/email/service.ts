import { Resend } from 'resend'
import { siteConfig } from '@/config/site'

/**
 * Initialize Resend client.
 * If RESEND_API_KEY is not configured in .env, service gracefully falls back to mock logging.
 */
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'SPARKLINE <onboarding@resend.dev>'
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || siteConfig.contact.email
const LOGO_URL = `${siteConfig.url}/images/brand/sparkline-logo.png`

/**
 * Shared Email Style Components
 */
function getEmailStyles() {
  return `
    body {
      margin: 0;
      padding: 0;
      background-color: #F4F5F7;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #111827;
    }
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    .wrapper {
      width: 100%;
      background-color: #F4F5F7;
      padding: 40px 16px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid #E5E7EB;
      box-shadow: 0 12px 40px -10px rgba(0, 0, 0, 0.05);
    }
    .top-accent {
      height: 4px;
      background: linear-gradient(90deg, #EB4604 0%, #FFB901 50%, #EB4604 100%);
    }
    .header {
      padding: 36px 36px 20px;
      text-align: center;
    }
    .body-content {
      padding: 0 36px 36px;
    }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 20px;
    }
    .badge-orange {
      background-color: #FFF2EC;
      border: 1px solid #FFD3C2;
      color: #EB4604;
    }
    .badge-dark {
      background-color: #0A0D14;
      color: #FFFFFF;
    }
    .badge-green {
      background-color: #ECFDF5;
      border: 1px solid #A7F3D0;
      color: #059669;
    }
    h1 {
      margin: 0 0 16px;
      font-size: 26px;
      font-weight: 700;
      line-height: 1.25;
      color: #0A0D14;
      letter-spacing: -0.02em;
    }
    p {
      margin: 0 0 16px;
      font-size: 15px;
      line-height: 1.6;
      color: #4B5563;
    }
    .card-box {
      background-color: #F8F9FA;
      border: 1px solid #EAECEF;
      border-radius: 16px;
      padding: 20px;
      margin: 24px 0;
    }
    .btn-primary {
      display: inline-block;
      background-color: #EB4604;
      color: #FFFFFF !important;
      font-weight: 700;
      font-size: 14px;
      padding: 14px 32px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(235, 70, 4, 0.3);
      transition: all 0.2s ease;
    }
    .btn-whatsapp {
      display: inline-block;
      background-color: #25D366;
      color: #FFFFFF !important;
      font-weight: 700;
      font-size: 14px;
      padding: 14px 32px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
    }
    .footer {
      background-color: #FAFAFB;
      border-top: 1px solid #EAECEF;
      padding: 28px 36px;
      text-align: center;
      font-size: 12px;
      color: #6B7280;
      line-height: 1.6;
    }
    .footer a {
      color: #EB4604;
      text-decoration: none;
      font-weight: 600;
    }
  `
}

/**
 * 1. Accusé de Réception Prospect / Client (Demande de devis & contact)
 */
export async function sendLeadReceiptEmail(lead: {
  name: string
  email: string
  services: string[]
  budget?: string | null
  message: string
}) {
  const cleanPhone = siteConfig.contact.phone.replace(/[^0-9]/g, '')
  const servicesFormatted = lead.services && lead.services.length > 0
    ? lead.services.map((s) => `<span style="display:inline-block; margin: 3px 4px 3px 0; padding: 4px 10px; background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 999px; font-size: 12px; font-weight: 600; color: #1F2937;">${s}</span>`).join('')
    : '<span style="font-size: 13px; color: #6B7280;">Projet Digital Sur-Mesure</span>'

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="top-accent"></div>
          
          <div class="header">
            <img src="${LOGO_URL}" alt="SPARKLINE" width="140" style="margin-bottom: 24px; display: inline-block;" />
            <div>
              <span class="badge badge-orange">Demande prise en compte</span>
            </div>
          </div>

          <div class="body-content">
            <h1>Votre projet est entre de bonnes mains, ${lead.name} !</h1>
            
            <p>
              Merci d'avoir initié cet échange avec <strong>SPARKLINE</strong>. Notre équipe d'architectes, designers et stratèges analyse actuellement votre demande avec le plus grand intérêt.
            </p>

            <div class="card-box">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #EB4604; margin-bottom: 14px;">
                Récapitulatif de votre brief
              </div>

              <div style="margin-bottom: 12px;">
                <div style="font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 6px;">Services demandés :</div>
                <div>${servicesFormatted}</div>
              </div>

              ${lead.budget ? `
              <div style="margin-bottom: 12px;">
                <div style="font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 4px;">Fourchette budgétaire :</div>
                <div style="font-size: 14px; font-weight: 700; color: #111827;">${lead.budget}</div>
              </div>` : ''}

              <div style="margin-top: 14px; padding-top: 14px; border-top: 1px solid #EAECEF;">
                <div style="font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 6px;">Votre message :</div>
                <div style="font-size: 13px; font-style: italic; color: #374151; line-height: 1.5; background: #FFFFFF; padding: 12px; border-radius: 8px; border: 1px solid #EDEEF2;">
                  « ${lead.message} »
                </div>
              </div>
            </div>

            <!-- Prochaines étapes -->
            <div style="margin: 28px 0;">
              <div style="font-size: 13px; font-weight: 700; color: #111827; margin-bottom: 12px;">
                Ce qui va se passer ensuite :
              </div>
              <table style="width: 100%;">
                <tr>
                  <td style="width: 28px; vertical-align: top; padding-right: 12px;">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #EB4604; color: #FFF; font-size: 11px; font-weight: 800; text-align: center; line-height: 24px;">1</div>
                  </td>
                  <td style="padding-bottom: 14px;">
                    <div style="font-size: 13px; font-weight: 700; color: #111827;">Analyse technique</div>
                    <div style="font-size: 12px; color: #6B7280;">Étude de la faisabilité et sélection de l'équipe adaptée.</div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 28px; vertical-align: top; padding-right: 12px;">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #0A0D14; color: #FFF; font-size: 11px; font-weight: 800; text-align: center; line-height: 24px;">2</div>
                  </td>
                  <td style="padding-bottom: 14px;">
                    <div style="font-size: 13px; font-weight: 700; color: #111827;">Contact sous 24h ouvrées</div>
                    <div style="font-size: 12px; color: #6B7280;">Un Tech Lead vous contactera pour convenir d'un cadrage visio ou présentiel.</div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 28px; vertical-align: top; padding-right: 12px;">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #0A0D14; color: #FFF; font-size: 11px; font-weight: 800; text-align: center; line-height: 24px;">3</div>
                  </td>
                  <td>
                    <div style="font-size: 13px; font-weight: 700; color: #111827;">Proposition stratégique</div>
                    <div style="font-size: 12px; color: #6B7280;">Devis détaillé, roadmap opérationnelle et planning de livraison.</div>
                  </td>
                </tr>
              </table>
            </div>

            <p style="font-size: 14px; margin-top: 24px;">
              Une question urgente ou besoin d'un échange immédiat ?
            </p>

            <div style="text-align: center; margin: 24px 0 10px;">
              <a href="https://wa.me/${cleanPhone}" class="btn-whatsapp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: -2px; display: inline-block; margin-right: 8px;">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.54c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.02 2.58c.13.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/>
                </svg>
                <span>Échanger en direct sur WhatsApp</span>
              </a>
            </div>
          </div>

          <div class="footer">
            <strong>SPARKLINE</strong> — Studio Technologique & Stratégie Digitale<br>
            Dakar, Sénégal • <a href="tel:${siteConfig.contact.phone}">${siteConfig.contact.phone}</a> • <a href="mailto:${siteConfig.contact.email}">${siteConfig.contact.email}</a><br>
            <span style="font-size: 11px; color: #9CA3AF; margin-top: 8px; display: inline-block;">
              © ${new Date().getFullYear()} SPARKLINE. Tous droits réservés.
            </span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  if (!resend) {
    console.log(`[RESEND MOCK] Lead receipt email prepared for ${lead.email}`)
    return
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: lead.email,
      subject: `Votre projet avec SPARKLINE — Accusé de réception`,
      html,
    })
  } catch (error) {
    console.error('[RESEND ERROR] Failed to send lead receipt email:', error)
  }
}

/**
 * 2. Bienvenue Newsletter (Adapté SPARKlearn ou Agence selon la source)
 */
export async function sendNewsletterWelcomeEmail(toEmail: string, source: string = 'footer') {
  const isSparklearn = source === 'sparklearn'

  const subject = isSparklearn
    ? 'Bienvenue sur SPARKlearn — Votre accès prioritaire aux Masterclasses'
    : 'Bienvenue chez SPARKLINE — Spark the change, illuminate success'

  const html = isSparklearn
    ? `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="top-accent"></div>

          <div class="header">
            <img src="${LOGO_URL}" alt="SPARKLINE" width="140" style="margin-bottom: 24px; display: inline-block;" />
            <div>
              <span class="badge badge-orange">Initiative Éducative • Accès Prioritaire</span>
            </div>
          </div>

          <div class="body-content">
            <h1>Bienvenue dans l'Académie SPARKlearn !</h1>
            
            <p>
              Merci pour votre inscription à la liste prioritaire de <strong>SPARKlearn</strong>.
            </p>
            <p>
              Vous faites désormais partie du cercle restreint qui sera notifié en avant-première lors de l'ouverture des réservations pour nos prochaines masterclasses gratuites et nos bootcamps technologiques intensifs.
            </p>

            <div class="card-box">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #EB4604; margin-bottom: 16px;">
                Vos privilèges membre prioritaire :
              </div>
              
              <table style="width: 100%;">
                <tr>
                  <td style="width: 32px; vertical-align: top; padding: 6px 12px 10px 0;">
                    <div style="width: 26px; height: 26px; border-radius: 6px; background-color: #FFF2EC; border: 1px solid #FFD3C2; text-align: center; line-height: 26px;">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EB4604" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block;">
                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                        <path d="M13 5v2"/><path d="M13 17v2"/>
                      </svg>
                    </div>
                  </td>
                  <td style="padding: 6px 0 10px; font-size: 13px; color: #374151; vertical-align: middle;">
                    <strong style="color: #111827;">Places Réservées :</strong> Accès garanti 48h avant l'ouverture publique pour chaque masterclass.
                  </td>
                </tr>
                <tr>
                  <td style="width: 32px; vertical-align: top; padding: 6px 12px 10px 0;">
                    <div style="width: 26px; height: 26px; border-radius: 6px; background-color: #FFF2EC; border: 1px solid #FFD3C2; text-align: center; line-height: 26px;">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EB4604" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block;">
                        <polyline points="4 17 10 11 4 5"/>
                        <line x1="12" y1="19" x2="20" y2="19"/>
                      </svg>
                    </div>
                  </td>
                  <td style="padding: 6px 0 10px; font-size: 13px; color: #374151; vertical-align: middle;">
                    <strong style="color: #111827;">Projets & Cas Réels :</strong> Pratique intensive sur des frameworks modernes (Next.js, Tailwind, IA appliquée).
                  </td>
                </tr>
                <tr>
                  <td style="width: 32px; vertical-align: top; padding: 6px 12px 6px 0;">
                    <div style="width: 26px; height: 26px; border-radius: 6px; background-color: #FFF2EC; border: 1px solid #FFD3C2; text-align: center; line-height: 26px;">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EB4604" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block;">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                  </td>
                  <td style="padding: 6px 0 6px; font-size: 13px; color: #374151; vertical-align: middle;">
                    <strong style="color: #111827;">Réseau & Mentorat :</strong> Connexion directe avec les développeurs et designers seniors du studio SPARKLINE.
                  </td>
                </tr>
              </table>
            </div>

            <p style="font-size: 14px; text-align: center; color: #6B7280; margin-top: 24px;">
              Les premières sessions seront annoncées très prochainement dans votre boîte mail.
            </p>

            <div style="text-align: center; margin: 28px 0 10px;">
              <a href="${siteConfig.url}/sparklearn/masterclasses" class="btn-primary">
                <span>Découvrir le programme des Masterclasses</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block; margin-left: 6px;">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer">
            <strong>SPARKlearn par SPARKLINE</strong> — Écosystème Éducatif Numérique<br>
            Dakar, Sénégal • <a href="mailto:${siteConfig.contact.email}">${siteConfig.contact.email}</a><br>
            <span style="font-size: 11px; color: #9CA3AF; margin-top: 8px; display: inline-block;">
              Vous recevez cet email suite à votre inscription sur la page SPARKlearn.
            </span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
    : `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="top-accent"></div>

          <div class="header">
            <img src="${LOGO_URL}" alt="SPARKLINE" width="140" style="margin-bottom: 24px; display: inline-block;" />
            <div>
              <span class="badge badge-orange">Bienvenue dans l'écosystème</span>
            </div>
          </div>

          <div class="body-content">
            <h1>Spark The Change, Illuminate Success.</h1>
            
            <p>
              Merci pour votre inscription à la newsletter officielle de <strong>SPARKLINE</strong>.
            </p>
            <p>
              Chaque mois, nous décryptons pour vous les coulisses de la transformation digitale, l'impact de l'IA appliquée aux produits réels, et les architectures web/mobiles de demain.
            </p>

            <div class="card-box">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #EB4604; margin-bottom: 16px;">
                Ce que vous découvrirez dans nos éditions :
              </div>
              
              <table style="width: 100%;">
                <tr>
                  <td style="width: 32px; vertical-align: top; padding: 6px 12px 10px 0;">
                    <div style="width: 26px; height: 26px; border-radius: 6px; background-color: #FFF2EC; border: 1px solid #FFD3C2; text-align: center; line-height: 26px;">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EB4604" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block;">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                    </div>
                  </td>
                  <td style="padding: 6px 0 10px; font-size: 13px; color: #374151; vertical-align: middle;">
                    <strong style="color: #111827;">Études de cas concrètes :</strong> Comment nous transformons des concepts en succès digitaux scalables.
                  </td>
                </tr>
                <tr>
                  <td style="width: 32px; vertical-align: top; padding: 6px 12px 10px 0;">
                    <div style="width: 26px; height: 26px; border-radius: 6px; background-color: #FFF2EC; border: 1px solid #FFD3C2; text-align: center; line-height: 26px;">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EB4604" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block;">
                        <rect x="4" y="4" width="16" height="16" rx="2"/>
                        <rect x="9" y="9" width="6" height="6"/>
                        <line x1="9" y1="1" x2="9" y2="4"/>
                        <line x1="15" y1="1" x2="15" y2="4"/>
                        <line x1="9" y1="20" x2="9" y2="23"/>
                        <line x1="15" y1="20" x2="15" y2="23"/>
                        <line x1="20" y1="9" x2="23" y2="9"/>
                        <line x1="20" y1="14" x2="23" y2="14"/>
                        <line x1="1" y1="9" x2="4" y2="9"/>
                        <line x1="1" y1="14" x2="4" y2="14"/>
                      </svg>
                    </div>
                  </td>
                  <td style="padding: 6px 0 10px; font-size: 13px; color: #374151; vertical-align: middle;">
                    <strong style="color: #111827;">Veille & Technologies :</strong> Architectures Next.js, designs UI/UX d'avant-garde et automatisation.
                  </td>
                </tr>
                <tr>
                  <td style="width: 32px; vertical-align: top; padding: 6px 12px 6px 0;">
                    <div style="width: 26px; height: 26px; border-radius: 6px; background-color: #FFF2EC; border: 1px solid #FFD3C2; text-align: center; line-height: 26px;">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EB4604" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block;">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                      </svg>
                    </div>
                  </td>
                  <td style="padding: 6px 0 6px; font-size: 13px; color: #374151; vertical-align: middle;">
                    <strong style="color: #111827;">SPARKlearn :</strong> Accès privilégié et places prioritaires à nos masterclasses immersives.
                  </td>
                </tr>
              </table>
            </div>

            <p style="font-size: 14px; text-align: center; color: #6B7280; margin-top: 24px;">
              Pas de spam. Rien que des contenus de haute précision conçus pour accélérer votre vision.
            </p>

            <div style="text-align: center; margin: 28px 0 10px;">
              <a href="${siteConfig.url}" class="btn-primary">
                <span>Explorer nos réalisations</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block; margin-left: 6px;">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer">
            <strong>SPARKLINE</strong> — Agence de Transformation Digitale<br>
            Dakar, Sénégal • <a href="mailto:${siteConfig.contact.email}">${siteConfig.contact.email}</a><br>
            <span style="font-size: 11px; color: #9CA3AF; margin-top: 8px; display: inline-block;">
              Vous recevez cet email car vous vous êtes inscrit sur notre site public.
            </span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  if (!resend) {
    console.log(`[RESEND MOCK] Newsletter welcome email (${source}) prepared for ${toEmail}`)
    return
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
      subject,
      html,
    })
  } catch (error) {
    console.error('[RESEND ERROR] Failed to send newsletter welcome email:', error)
  }
}

/**
 * 3. Notification interne / Alerte d'équipe Nouveau Lead
 */
export async function sendAdminNewLeadNotification(lead: {
  id: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  services: string[]
  budget?: string | null
  inquiryType?: string | null
  message: string
  source: string
}) {
  const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : null

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="top-accent"></div>

          <div class="header" style="text-align: left; padding-bottom: 16px;">
            <table style="width: 100%;">
              <tr>
                <td>
                  <img src="${LOGO_URL}" alt="SPARKLINE" width="120" style="display: block;" />
                </td>
                <td style="text-align: right;">
                  <span class="badge badge-dark">Alerte Lead</span>
                </td>
              </tr>
            </table>
          </div>

          <div class="body-content">
            <h1 style="font-size: 22px; margin-bottom: 8px;">
              Nouvelle opportunité : ${lead.name}
            </h1>
            <p style="font-size: 13px; color: #6B7280; margin-bottom: 20px;">
              Un prospect vient de soumettre un projet depuis le formulaire <strong>${lead.source}</strong>.
            </p>

            <div class="card-box" style="margin: 16px 0;">
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #6B7280; width: 120px;">Prospect :</td>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #111827;">${lead.name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #6B7280;">E-mail :</td>
                  <td style="padding: 6px 0; font-size: 13px;"><a href="mailto:${lead.email}" style="color: #EB4604; font-weight: 600; text-decoration: none;">${lead.email}</a></td>
                </tr>
                ${lead.phone ? `
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #6B7280;">Téléphone :</td>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #111827;">
                    <a href="tel:${lead.phone}" style="color: #111827; text-decoration: none;">${lead.phone}</a>
                    ${cleanPhone ? `&nbsp; <a href="https://wa.me/${cleanPhone}" style="display: inline-block; padding: 2px 8px; border-radius: 4px; background-color: #E8F8EE; color: #059669; font-size: 11px; font-weight: 700; text-decoration: none; vertical-align: middle;">WhatsApp</a>` : ''}
                  </td>
                </tr>` : ''}
                ${lead.company ? `
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #6B7280;">Entreprise :</td>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #111827;">${lead.company}</td>
                </tr>` : ''}
                ${lead.budget ? `
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #6B7280;">Budget estimé :</td>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #059669;">${lead.budget}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #6B7280;">Services :</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #111827;">${lead.services.join(', ') || 'Non spécifié'}</td>
                </tr>
              </table>

              <div style="margin-top: 14px; padding-top: 14px; border-top: 1px solid #EAECEF;">
                <div style="font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 6px;">Message du client :</div>
                <div style="font-size: 13px; color: #1F2937; line-height: 1.6; background-color: #FFFFFF; padding: 12px; border-radius: 8px; border: 1px solid #EDEEF2;">
                  ${lead.message}
                </div>
              </div>
            </div>

            <div style="text-align: center; margin: 28px 0 10px;">
              <a href="${siteConfig.url}/admin/leads?search=${encodeURIComponent(lead.email)}" class="btn-primary">
                <span>Ouvrir la fiche dans la Console Admin</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block; margin-left: 6px;">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer">
            Notification interne générée par la <strong>Console SPARKLINE</strong> • ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  if (!resend) {
    console.log(`[RESEND MOCK] Admin alert email prepared for ${NOTIFICATION_EMAIL} regarding ${lead.name}`)
    return
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `[Nouveau Lead] ${lead.name} ${lead.company ? `(${lead.company})` : ''} — ${lead.budget || 'Projet'}`,
      html,
    })
  } catch (error) {
    console.error('[RESEND ERROR] Failed to send admin notification email:', error)
  }
}
