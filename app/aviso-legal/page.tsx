import { Metadata } from 'next'
import LegalLayout, { LegalContent } from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Aviso Legal – El Racó del Pantà',
  description: 'Aviso legal e información del titular del sitio web El Racó del Pantà.',
}

const ca: LegalContent = {
  title: 'Avís Legal',
  updated: 'Última actualització: 14 de juny de 2025',
  sections: [
    {
      heading: '1. Dades identificatives del titular',
      body: `En compliment de l'article 10 de la Llei 34/2002, d'11 de juliol, de Serveis de la Societat de la Informació i Comerç Electrònic (LSSICE), s'informa:

Titular: [NOMBRE FISCAL PENDIENTE]
NIF/CIF: [PENDIENTE]
Domicili: C-13, 91, 25630 Talarn, Lleida, España
Telèfon: +34 633 04 30 77
Correu electrònic: info@elracodelpanta.cat
Lloc web: https://www.elracodelpanta.cat`,
    },
    {
      heading: '2. Objecte',
      body: "El present avís legal regula l'ús del lloc web www.elracodelpanta.cat, titularitat de l'empresa indicada anteriorment. La utilització del lloc web atribueix la condició d'usuari i implica l'acceptació d'aquest avís legal.",
    },
    {
      heading: '3. Propietat intel·lectual i industrial',
      body: "Tots els continguts d'aquest lloc web (textos, fotografies, logotips, imatges, vídeos i dissenys) són titularitat del titular o dels seus llicenciants i estan protegits per les lleis de propietat intel·lectual i industrial. Queda prohibida la seva reproducció, distribució o transformació sense autorització expressa.",
    },
    {
      heading: '4. Responsabilitat',
      body: "El titular no es fa responsable dels danys i perjudicis que poguessin derivar-se de la interrupció, errors o desconnexions del lloc web, ni de continguts de tercers als quals es pogués accedir per mitjà d'enllaços.",
    },
    {
      heading: '5. Llei aplicable i jurisdicció',
      body: "Les presents condicions es regeixen per la legislació espanyola. Per a la resolució de qualsevol controvèrsia, les parts se sotmeten als Jutjats i Tribunals corresponents al domicili del titular, renunciant a qualsevol altre fur que pogués correspondre'ls.",
    },
  ],
}

const es: LegalContent = {
  title: 'Aviso Legal',
  updated: 'Última actualización: 14 de junio de 2025',
  sections: [
    {
      heading: '1. Datos identificativos del titular',
      body: `En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa:

Titular: [NOMBRE FISCAL PENDIENTE]
NIF/CIF: [PENDIENTE]
Domicilio: C-13, 91, 25630 Talarn, Lleida, España
Teléfono: +34 633 04 30 77
Correo electrónico: info@elracodelpanta.cat
Sitio web: https://www.elracodelpanta.cat`,
    },
    {
      heading: '2. Objeto',
      body: 'El presente aviso legal regula el uso del sitio web www.elracodelpanta.cat, titularidad de la empresa indicada anteriormente. La utilización del sitio web atribuye la condición de usuario e implica la aceptación de este aviso legal.',
    },
    {
      heading: '3. Propiedad intelectual e industrial',
      body: 'Todos los contenidos de este sitio web (textos, fotografías, logotipos, imágenes, vídeos y diseños) son titularidad del titular o de sus licenciantes y están protegidos por las leyes de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o transformación sin autorización expresa.',
    },
    {
      heading: '4. Responsabilidad',
      body: 'El titular no se hace responsable de los daños y perjuicios que pudieran derivarse de la interrupción, errores o desconexiones del sitio web, ni de contenidos de terceros a los que se pudiera acceder mediante enlaces.',
    },
    {
      heading: '5. Ley aplicable y jurisdicción',
      body: 'Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales correspondientes al domicilio del titular, renunciando a cualquier otro fuero que pudiera corresponderles.',
    },
  ],
}

const en: LegalContent = {
  title: 'Legal Notice',
  updated: 'Last updated: 14 June 2025',
  sections: [
    {
      heading: '1. Website owner details',
      body: `In compliance with Article 10 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE):

Owner: [FISCAL NAME PENDING]
Tax ID: [PENDING]
Address: C-13, 91, 25630 Talarn, Lleida, Spain
Phone: +34 633 04 30 77
Email: info@elracodelpanta.cat
Website: https://www.elracodelpanta.cat`,
    },
    {
      heading: '2. Purpose',
      body: 'This legal notice governs the use of www.elracodelpanta.cat. Using the website constitutes acceptance of this legal notice.',
    },
    {
      heading: '3. Intellectual and industrial property',
      body: "All content on this website (texts, photographs, logos, images, videos and designs) belongs to the owner or its licensors and is protected by intellectual and industrial property laws. Reproduction, distribution or transformation without express authorisation is prohibited.",
    },
    {
      heading: '4. Liability',
      body: 'The owner is not liable for damages arising from interruptions, errors or disconnections of the website, or from third-party content accessible via links.',
    },
    {
      heading: '5. Applicable law and jurisdiction',
      body: "These conditions are governed by Spanish law. Any disputes shall be submitted to the courts of the owner's domicile.",
    },
  ],
}

export default function AvisoLegalPage() {
  return <LegalLayout ca={ca} es={es} en={en} />
}
