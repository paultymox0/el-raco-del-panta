import { Metadata } from 'next'
import LegalLayout, { LegalContent } from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Política de Privacidad – El Racó del Pantà',
  description: 'Política de privacidad y protección de datos de El Racó del Pantà.',
}

const ca: LegalContent = {
  title: 'Política de Privacitat',
  updated: 'Última actualització: 14 de juny de 2025',
  sections: [
    {
      heading: '1. Responsable del tractament',
      body: `Titular: [NOMBRE FISCAL PENDIENTE]
NIF/CIF: [PENDIENTE]
Domicili: C-13, 91, 25630 Talarn, Lleida, España
Correu electrònic: info@elracodelpanta.cat`,
    },
    {
      heading: '2. Finalitats i base jurídica',
      body: `Les dades personals que ens facilites es tractaran per a les finalitats següents:

• Gestió de reserves i consultes via WhatsApp o formulari web (base jurídica: execució d'un contracte o mesures precontractuals).
• Analítica web anònima a través de Vercel Analytics (base jurídica: interès legítim; no utilitza cookies).`,
    },
    {
      heading: '3. Destinataris',
      body: `Les teves dades podran ser comunicades a:

• Vercel Inc. (allotjament web i analítica) — transferència a EUA emparada en les Clàusules Contractuals Tipus de la UE.
• Google LLC (Google Maps) — transferència a EUA emparada en les Clàusules Contractuals Tipus de la UE.
• Trustindex (widget de ressenyes) — transferència a EUA emparada en les Clàusules Contractuals Tipus de la UE.
• Meta Platforms Ireland Ltd. (WhatsApp) — transferència a EUA emparada en les Clàusules Contractuals Tipus de la UE.`,
    },
    {
      heading: '4. Termini de conservació',
      body: 'Les dades de reserves i consultes es conservaran durant un màxim d\'1 any des de la darrera interacció, tret que hi hagi una obligació legal que exigeixi un termini superior.',
    },
    {
      heading: '5. Drets dels interessats (ARSULIPO)',
      body: `Pots exercir els drets d'Accés, Rectificació, Supressió, Limitació, Portabilitat i Oposició enviant un correu electrònic a info@elracodelpanta.cat, adjuntant còpia del teu DNI o document equivalent.

Si consideres que el tractament no s'ajusta a la normativa vigent, tens dret a presentar una reclamació davant l'Agència Espanyola de Protecció de Dades (AEPD): www.aepd.es`,
    },
  ],
}

const es: LegalContent = {
  title: 'Política de Privacidad',
  updated: 'Última actualización: 14 de junio de 2025',
  sections: [
    {
      heading: '1. Responsable del tratamiento',
      body: `Titular: [NOMBRE FISCAL PENDIENTE]
NIF/CIF: [PENDIENTE]
Domicilio: C-13, 91, 25630 Talarn, Lleida, España
Correo electrónico: info@elracodelpanta.cat`,
    },
    {
      heading: '2. Finalidades y base jurídica',
      body: `Los datos personales que nos facilitas se tratarán para las siguientes finalidades:

• Gestión de reservas y consultas vía WhatsApp o formulario web (base jurídica: ejecución de un contrato o medidas precontractuales).
• Analítica web anónima a través de Vercel Analytics (base jurídica: interés legítimo; no utiliza cookies).`,
    },
    {
      heading: '3. Destinatarios',
      body: `Tus datos podrán ser comunicados a:

• Vercel Inc. (alojamiento web y analítica) — transferencia a EE. UU. amparada en las Cláusulas Contractuales Tipo de la UE.
• Google LLC (Google Maps) — transferencia a EE. UU. amparada en las Cláusulas Contractuales Tipo de la UE.
• Trustindex (widget de reseñas) — transferencia a EE. UU. amparada en las Cláusulas Contractuales Tipo de la UE.
• Meta Platforms Ireland Ltd. (WhatsApp) — transferencia a EE. UU. amparada en las Cláusulas Contractuales Tipo de la UE.`,
    },
    {
      heading: '4. Plazo de conservación',
      body: 'Los datos de reservas y consultas se conservarán durante un máximo de 1 año desde la última interacción, salvo que exista una obligación legal que exija un plazo superior.',
    },
    {
      heading: '5. Derechos de los interesados (ARSULIPO)',
      body: `Puedes ejercer los derechos de Acceso, Rectificación, Supresión, Limitación, Portabilidad y Oposición enviando un correo electrónico a info@elracodelpanta.cat, adjuntando copia de tu DNI o documento equivalente.

Si consideras que el tratamiento no se ajusta a la normativa vigente, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD): www.aepd.es`,
    },
  ],
}

const en: LegalContent = {
  title: 'Privacy Policy',
  updated: 'Last updated: 14 June 2025',
  sections: [
    {
      heading: '1. Data controller',
      body: `Owner: [FISCAL NAME PENDING]
Tax ID: [PENDING]
Address: C-13, 91, 25630 Talarn, Lleida, Spain
Email: info@elracodelpanta.cat`,
    },
    {
      heading: '2. Purposes and legal basis',
      body: `Your personal data will be processed for the following purposes:

• Managing reservations and enquiries via WhatsApp or web form (legal basis: performance of a contract or pre-contractual measures).
• Anonymous web analytics via Vercel Analytics (legal basis: legitimate interest; no cookies used).`,
    },
    {
      heading: '3. Recipients',
      body: `Your data may be shared with:

• Vercel Inc. (web hosting and analytics) — transfer to the USA under EU Standard Contractual Clauses.
• Google LLC (Google Maps) — transfer to the USA under EU Standard Contractual Clauses.
• Trustindex (reviews widget) — transfer to the USA under EU Standard Contractual Clauses.
• Meta Platforms Ireland Ltd. (WhatsApp) — transfer to the USA under EU Standard Contractual Clauses.`,
    },
    {
      heading: '4. Retention period',
      body: 'Reservation and enquiry data will be kept for a maximum of 1 year from the last interaction, unless a legal obligation requires a longer period.',
    },
    {
      heading: '5. Your rights (GDPR Article 15–22)',
      body: `You may exercise your rights of Access, Rectification, Erasure, Restriction, Portability and Objection by emailing info@elracodelpanta.cat with a copy of your ID document.

If you believe your data is being processed unlawfully, you have the right to lodge a complaint with the Spanish Data Protection Authority (AEPD): www.aepd.es`,
    },
  ],
}

export default function PrivacidadPage() {
  return <LegalLayout ca={ca} es={es} en={en} />
}
