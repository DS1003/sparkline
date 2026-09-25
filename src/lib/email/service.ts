import { Resend } from 'resend'
import { siteConfig } from '@/config/site'

/**
 * Initialize Resend client.
 * If RESEND_API_KEY is not configured in .env, service gracefully falls back to mock logging.
 */
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[RESEND WARNING] RESEND_API_KEY is not defined in process.env!')
    return null
  }
  return new Resend(apiKey)
}

function getFromEmail() {
  const from = process.env.RESEND_FROM_EMAIL
  if (!from || from.includes('onboarding@resend.dev') || from.includes('resend.dev')) {
    return 'SPARKLINE <contact@sparkline.sn>'
  }
  return from
}

function getNotificationEmail() {
  return process.env.NOTIFICATION_EMAIL || siteConfig.contact.email
}

const LOGO_URL = `${siteConfig.url}/images/brand/sparkline-logo.png`

// ─────────────────────────────────────────────────────────────────────────────
// Shared layout helpers (email-client–safe, table-based)
// ─────────────────────────────────────────────────────────────────────────────

/** Wraps the entire email in a background table + shared footer */
function emailShell(bodyRows: string) {
  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>SPARKLINE</title>
</head>
<body style="margin:0;padding:0;background-color:#EBEBEB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EBEBEB;padding:48px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
          ${bodyRows}
          <!-- Shared Footer -->
          <tr>
            <td style="padding:28px 0 0;text-align:center;font-size:12px;color:#999999;line-height:1.8;">
              <strong style="color:#555555;">SPARKLINE</strong> — Studio Technologique &amp; Stratégie Digitale<br>
              Dakar, Sénégal &nbsp;·&nbsp;
              <a href="tel:${siteConfig.contact.phone}" style="color:#EB4604;text-decoration:none;">${siteConfig.contact.phone}</a>
              &nbsp;·&nbsp;
              <a href="mailto:${siteConfig.contact.email}" style="color:#EB4604;text-decoration:none;">${siteConfig.contact.email}</a><br>
              <span style="font-size:11px;color:#BBBBBB;">
                © ${new Date().getFullYear()} SPARKLINE. Tous droits réservés.
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** Dark hero header card */
function heroBlock(badge: string, title: string, subtitle: string) {
  return `<tr>
  <td>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      style="background-color:#000000;border-radius:16px 16px 0 0;overflow:hidden;">
      <tr>
        <td style="height:3px;background:linear-gradient(90deg,#EB4604 0%,#FF8C00 50%,#FFB901 100%);font-size:0;line-height:0;">&nbsp;</td>
      </tr>
      <tr>
        <td style="padding:36px 40px 20px;text-align:center;">
          <img src="${LOGO_URL}" alt="SPARKLINE" width="130"
            style="display:inline-block;height:auto;border:0;max-width:130px;filter:brightness(0) invert(1);" />
        </td>
      </tr>
      <tr>
        <td style="text-align:center;padding:0 40px 18px;">
          <span style="display:inline-block;padding:5px 16px;border-radius:999px;border:1px solid rgba(235,70,4,0.4);background-color:rgba(235,70,4,0.08);font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#FF8C51;">
            ${badge}
          </span>
        </td>
      </tr>
      <tr>
        <td style="text-align:center;padding:0 40px 14px;">
          <h1 style="margin:0;font-size:28px;font-weight:800;line-height:1.2;color:#FFFFFF;letter-spacing:-0.03em;">${title}</h1>
        </td>
      </tr>
      <tr>
        <td style="text-align:center;padding:0 48px 44px;">
          <p style="margin:0;font-size:15px;line-height:1.65;color:#94A3B8;">${subtitle}</p>
        </td>
      </tr>
    </table>
  </td>
</tr>`
}

/** White content card */
function contentCard(inner: string) {
  return `<tr>
  <td>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      style="background-color:#FFFFFF;border-radius:0 0 16px 16px;overflow:hidden;">
      <tr><td style="padding:40px 40px 36px;">${inner}</td></tr>
    </table>
  </td>
</tr>`
}

/** Uppercase section label */
function label(text: string) {
  return `<p style="margin:0 0 16px;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#EB4604;">${text}</p>`
}

/** Thin divider */
function divider() {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
  <tr><td style="height:1px;background-color:#F1F5F9;font-size:0;line-height:0;">&nbsp;</td></tr>
</table>`
}

/** Orange CTA button */
function ctaButton(href: string, text: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 0;">
  <tr>
    <td align="center" style="border-radius:10px;background-color:#EB4604;box-shadow:0 4px 20px rgba(235,70,4,0.35);">
      <a href="${href}"
        style="display:inline-block;padding:15px 36px;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;letter-spacing:0.01em;border-radius:10px;">
        ${text} &rarr;
      </a>
    </td>
  </tr>
</table>`
}

/** Green WhatsApp CTA button */
function whatsappButton(cleanPhone: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 0;">
  <tr>
    <td align="center" style="border-radius:10px;background-color:#25D366;box-shadow:0 4px 20px rgba(37,211,102,0.3);">
      <a href="https://wa.me/${cleanPhone}"
        style="display:inline-block;padding:15px 36px;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;letter-spacing:0.01em;border-radius:10px;">
        Discutons sur WhatsApp &#8594;
      </a>
    </td>
  </tr>
</table>`
}

/** Numbered step row */
function stepRow(num: number, title: string, desc: string, isLast = false) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${isLast ? '' : 'margin-bottom:18px;'}">
  <tr>
    <td style="width:36px;vertical-align:top;padding-right:14px;padding-top:2px;">
      <div style="width:32px;height:32px;border-radius:8px;background-color:#000000;text-align:center;line-height:32px;font-size:13px;font-weight:800;color:#FFFFFF;">${num}</div>
    </td>
    <td>
      <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#0A0D14;">${title}</p>
      <p style="margin:0;font-size:13px;line-height:1.55;color:#64748B;">${desc}</p>
    </td>
  </tr>
</table>`
}

/**
 * Feature benefit row — uses a reliable HTML-entity check icon in an orange circle.
 * (inline SVG is blocked by Gmail/Outlook; this approach works in all mail clients)
 */
function featureRow(title: string, desc: string, isLast = false) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${isLast ? '' : 'margin-bottom:18px;'}">
  <tr>
    <td style="width:28px;vertical-align:top;padding-right:14px;padding-top:1px;">
      <div style="width:24px;height:24px;border-radius:50%;background-color:#EB4604;text-align:center;line-height:26px;font-size:13px;font-weight:700;color:#FFFFFF;">&#10003;</div>
    </td>
    <td>
      <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#0A0D14;">${title}</p>
      <p style="margin:0;font-size:13px;line-height:1.55;color:#64748B;">${desc}</p>
    </td>
  </tr>
</table>`
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. LEAD RECEIPT — Accusé de réception prospect / client
// ─────────────────────────────────────────────────────────────────────────────
export async function sendLeadReceiptEmail(lead: {
  name: string
  email: string
  services: string[]
  budget?: string | null
  message: string
}) {
  const cleanPhone = siteConfig.contact.phone.replace(/[^0-9]/g, '')

  const servicesPills =
    lead.services && lead.services.length > 0
      ? lead.services
          .map(
            (s) =>
              `<span style="display:inline-block;margin:3px 4px 3px 0;padding:4px 12px;background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;font-size:12px;font-weight:600;color:#334155;">${s}</span>`
          )
          .join('')
      : `<span style="font-size:13px;color:#94A3B8;">Projet Digital Sur-Mesure</span>`

  const briefSection = `
    ${label('Récapitulatif de votre brief')}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-bottom:16px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;">Services demandés</p>
          <div>${servicesPills}</div>
        </td>
      </tr>
      ${lead.budget ? `<tr><td style="padding-bottom:16px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;">Budget estimé</p>
        <p style="margin:0;font-size:17px;font-weight:800;color:#EB4604;">${lead.budget}</p>
      </td></tr>` : ''}
      <tr>
        <td>
          <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;">Votre message</p>
          <div style="padding:16px;background-color:#F8FAFC;border-left:3px solid #EB4604;border-radius:0 8px 8px 0;">
            <p style="margin:0;font-size:13px;font-style:italic;line-height:1.65;color:#475569;">« ${lead.message} »</p>
          </div>
        </td>
      </tr>
    </table>
  `

  const stepsSection = `
    ${label('Ce qui va se passer ensuite')}
    ${stepRow(1, 'Analyse technique', "Étude de la faisabilité et sélection de l'équipe la mieux adaptée à votre projet.")}
    ${stepRow(2, 'Contact sous 24h ouvrées', 'Un Tech Lead vous contactera pour convenir d\'un cadrage visio ou présentiel.')}
    ${stepRow(3, 'Proposition stratégique', 'Devis détaillé, roadmap opérationnelle et planning de livraison.', true)}
  `

  const html = emailShell(`
    ${heroBlock(
      'Demande prise en compte ✓',
      `Votre projet est entre de bonnes mains.`,
      `Merci, <strong style="color:#FFFFFF;">${lead.name}</strong>. Notre équipe analyse votre demande avec le plus grand intérêt.`
    )}
    ${contentCard(`
      ${briefSection}
      ${divider()}
      ${stepsSection}
      ${divider()}
      <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#0A0D14;text-align:center;">Une question urgente ?</p>
      <p style="margin:0;font-size:13px;color:#64748B;text-align:center;">Nous sommes disponibles directement sur WhatsApp.</p>
      ${whatsappButton(cleanPhone)}
    `)}
  `)

  const resend = getResendClient()
  if (!resend) {
    console.warn(`[RESEND MOCK] Lead receipt email prepared for ${lead.email} (RESEND_API_KEY missing)`)
    return
  }

  try {
    const res = await resend.emails.send({
      from: getFromEmail(),
      to: lead.email,
      subject: `Votre projet avec SPARKLINE — Accusé de réception`,
      html,
    })
    if (res.error) {
      console.error('[RESEND API ERROR - LEAD RECEIPT]', res.error)
    } else {
      console.log('[RESEND SUCCESS - LEAD RECEIPT]', res.data?.id)
    }
  } catch (error) {
    console.error('[RESEND ERROR] Failed to send lead receipt email:', error)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. NEWSLETTER WELCOME — Bienvenue (Agence ou SPARKlearn selon source)
// ─────────────────────────────────────────────────────────────────────────────
export async function sendNewsletterWelcomeEmail(toEmail: string, source: string = 'footer') {
  const isSparklearn = source === 'sparklearn'

  const subject = isSparklearn
    ? 'Bienvenue sur SPARKlearn — Votre accès prioritaire aux Masterclasses'
    : 'Bienvenue chez SPARKLINE — Spark the change, illuminate success'

  const html = isSparklearn
    ? emailShell(`
        ${heroBlock(
          'Initiative Éducative · Accès Prioritaire',
          "Bienvenue dans l'Académie SPARKlearn.",
          'Vous faites partie du cercle restreint notifié en avant-première pour chaque masterclass.'
        )}
        ${contentCard(`
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#475569;text-align:center;">
            Merci pour votre inscription à la liste prioritaire de <strong style="color:#0A0D14;">SPARKlearn</strong>. Voici vos avantages en tant que membre.
          </p>
          ${label('Vos privilèges membre')}
          ${featureRow('Places Réservées', "Accès garanti 48h avant l'ouverture publique pour chaque masterclass.")}
          ${featureRow('Projets & Cas Réels', 'Pratique intensive sur des frameworks modernes — Next.js, IA appliquée, Tailwind CSS.')}
          ${featureRow('Réseau & Mentorat', 'Connexion directe avec les développeurs et designers seniors du studio SPARKLINE.', true)}
          ${divider()}
          <p style="margin:0;font-size:13px;color:#94A3B8;text-align:center;">
            Les premières sessions seront annoncées très prochainement dans votre boîte mail.
          </p>
          ${ctaButton(`${siteConfig.url}/sparklearn`, 'Découvrir le programme')}
        `)}
      `)
    : emailShell(`
        ${heroBlock(
          "Bienvenue dans l'écosystème",
          'Spark The Change, Illuminate Success.',
          'Merci pour votre inscription à la newsletter officielle de SPARKLINE.'
        )}
        ${contentCard(`
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#475569;text-align:center;">
            Chaque mois, nous décryptons les coulisses de la transformation digitale,<br>l'IA appliquée et les architectures web de demain.
          </p>
          ${label('Ce que vous découvrirez')}
          ${featureRow('Études de cas concrètes', 'Comment nous transformons des concepts en succès digitaux scalables.')}
          ${featureRow('Veille & Technologies', "Architectures Next.js, designs UI/UX d'avant-garde et automatisation.")}
          ${featureRow('SPARKlearn', 'Accès privilégié et places prioritaires à nos masterclasses immersives.', true)}
          ${divider()}
          <p style="margin:0;font-size:13px;color:#94A3B8;text-align:center;">
            Pas de spam. Rien que des contenus de haute précision pour accélérer votre vision.
          </p>
          ${ctaButton(siteConfig.url, 'Explorer nos réalisations')}
        `)}
      `)

  const resend = getResendClient()
  if (!resend) {
    console.warn(`[RESEND MOCK] Newsletter welcome email (${source}) prepared for ${toEmail} (RESEND_API_KEY missing)`)
    return
  }

  try {
    const res = await resend.emails.send({
      from: getFromEmail(),
      to: toEmail,
      subject,
      html,
    })
    if (res.error) {
      console.error('[RESEND API ERROR - NEWSLETTER]', res.error)
    } else {
      console.log('[RESEND SUCCESS - NEWSLETTER]', res.data?.id)
    }
  } catch (error) {
    console.error('[RESEND ERROR] Failed to send newsletter welcome email:', error)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ADMIN ALERT — Notification interne nouveau lead
// ─────────────────────────────────────────────────────────────────────────────
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
  const timestamp = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  function dataRow(lbl: string, val: string) {
    return `<tr>
      <td style="padding:10px 0;font-size:12px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #F1F5F9;width:110px;vertical-align:top;">${lbl}</td>
      <td style="padding:10px 0 10px 16px;font-size:14px;color:#0A0D14;font-weight:600;border-bottom:1px solid #F1F5F9;">${val}</td>
    </tr>`
  }

  const phoneCell = lead.phone
    ? `<a href="tel:${lead.phone}" style="color:#0A0D14;text-decoration:none;">${lead.phone}</a>${cleanPhone ? `&nbsp;<a href="https://wa.me/${cleanPhone}" style="display:inline-block;padding:2px 9px;border-radius:5px;background-color:#DCFCE7;color:#15803D;font-size:11px;font-weight:700;text-decoration:none;vertical-align:middle;">WhatsApp</a>` : ''}`
    : '—'

  const rows = [
    dataRow('Prospect', lead.name),
    dataRow('E-mail', `<a href="mailto:${lead.email}" style="color:#EB4604;text-decoration:none;font-weight:700;">${lead.email}</a>`),
    dataRow('Téléphone', phoneCell),
    ...(lead.company ? [dataRow('Entreprise', lead.company)] : []),
    dataRow('Services', lead.services.join(', ') || 'Non spécifié'),
    ...(lead.budget ? [dataRow('Budget', `<span style="color:#059669;font-weight:800;">${lead.budget}</span>`)] : []),
    dataRow('Source', lead.source),
  ].join('')

  // Admin email has its own shell (no shared footer branding)
  const html = `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau Lead — Console SPARKLINE</title>
</head>
<body style="margin:0;padding:0;background-color:#EBEBEB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EBEBEB;padding:48px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
          <!-- Hero (dark) -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="background-color:#000000;border-radius:16px 16px 0 0;overflow:hidden;">
                <tr>
                  <td style="height:3px;background:linear-gradient(90deg,#EB4604 0%,#FF8C00 50%,#FFB901 100%);font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:28px 40px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <img src="${LOGO_URL}" alt="SPARKLINE" width="110"
                            style="display:block;height:auto;border:0;filter:brightness(0) invert(1);" />
                        </td>
                        <td style="text-align:right;vertical-align:middle;">
                          <span style="display:inline-block;padding:6px 14px;border-radius:6px;background-color:#EB4604;font-size:11px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:#FFFFFF;">
                            Nouveau Lead
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 40px 36px;">
                    <h1 style="margin:0 0 6px;font-size:24px;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em;">
                      ${lead.name}${lead.company ? ` <span style="font-size:16px;font-weight:400;color:#64748B;">— ${lead.company}</span>` : ''}
                    </h1>
                    <p style="margin:0;font-size:13px;color:#475569;">
                      Soumis le <strong style="color:#94A3B8;">${timestamp}</strong> via ${lead.source}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- White content -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="background-color:#FFFFFF;border-radius:0 0 16px 16px;overflow:hidden;">
                <tr>
                  <td style="padding:36px 40px;">
                    <p style="margin:0 0 16px;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#EB4604;">Informations du prospect</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      ${rows}
                    </table>
                    <p style="margin:0 0 12px;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#EB4604;">Message</p>
                    <div style="padding:20px;background-color:#F8FAFC;border-left:4px solid #EB4604;border-radius:0 10px 10px 0;margin-bottom:32px;">
                      <p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">${lead.message}</p>
                    </div>
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                      <tr>
                        <td align="center" style="border-radius:10px;background-color:#EB4604;box-shadow:0 4px 20px rgba(235,70,4,0.35);">
                          <a href="${siteConfig.url}/admin/leads?search=${encodeURIComponent(lead.email)}"
                            style="display:inline-block;padding:15px 36px;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;letter-spacing:0.01em;border-radius:10px;">
                            Ouvrir dans la Console Admin &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Admin footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;font-size:12px;color:#999999;">
              Notification interne générée par la <strong style="color:#666666;">Console SPARKLINE</strong> · ${timestamp}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const resend = getResendClient()
  if (!resend) {
    console.warn(`[RESEND MOCK] Admin alert email prepared for ${getNotificationEmail()} regarding ${lead.name} (RESEND_API_KEY missing)`)
    return
  }

  try {
    const res = await resend.emails.send({
      from: getFromEmail(),
      to: getNotificationEmail(),
      subject: `[Nouveau Lead] ${lead.name}${lead.company ? ` (${lead.company})` : ''} — ${lead.budget || 'Projet Digital'}`,
      html,
    })
    if (res.error) {
      console.error('[RESEND API ERROR - ADMIN ALERT]', res.error)
    } else {
      console.log('[RESEND SUCCESS - ADMIN ALERT]', res.data?.id)
    }
  } catch (error) {
    console.error('[RESEND ERROR] Failed to send admin notification email:', error)
  }
}
