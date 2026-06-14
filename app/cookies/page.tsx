import { Metadata } from 'next'
import LegalLayout, { LegalContent } from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Política de Cookies – El Racó del Pantà',
  description: 'Política de cookies del sitio web El Racó del Pantà.',
}

const cookieTable = `| Cookie | Titular | Finalitat | Duración |
|---|---|---|---|
| raco_consent | Propi | Guardar preferències de galetes | 1 any |
| _vercel_* | Vercel | Analítica sense cookies | Sessió |
| trustindex-* | Trustindex | Mostrar ressenyes | 1 any |
| Google Maps | Google | Mostrar mapa interactiu | Sessió |`

const cookieTableEs = `| Cookie | Titular | Finalidad | Duración |
|---|---|---|---|
| raco_consent | Propio | Guardar preferencias de cookies | 1 año |
| _vercel_* | Vercel | Analítica sin cookies | Sesión |
| trustindex-* | Trustindex | Mostrar reseñas | 1 año |
| Google Maps | Google | Mostrar mapa interactivo | Sesión |`

const cookieTableEn = `| Cookie | Owner | Purpose | Duration |
|---|---|---|---|
| raco_consent | Own | Save cookie preferences | 1 year |
| _vercel_* | Vercel | Cookieless analytics | Session |
| trustindex-* | Trustindex | Display reviews | 1 year |
| Google Maps | Google | Display interactive map | Session |`

const ca: LegalContent = {
  title: 'Política de Galetes',
  updated: 'Última actualització: 14 de juny de 2025',
  sections: [
    {
      heading: '1. Què són les galetes?',
      body: "Les galetes (cookies) són fitxers de text petits que els llocs web emmagatzemen al teu dispositiu per recordar preferències i millorar la teva experiència de navegació.",
    },
    {
      heading: '2. Galetes que utilitza aquest lloc',
      body: cookieTable,
    },
    {
      heading: '3. Galetes estrictament necessàries',
      body: "La galeta raco_consent s'utilitza per recordar les teves preferències de consentiment. No requereix el teu consentiment previ perquè és estrictament necessària per al funcionament del sistema de gestió de galetes.",
    },
    {
      heading: '4. Galetes de tercers',
      body: "Google Maps i Trustindex poden establir galetes quan accepts les galetes de tercers. Per a més informació, consulta les polítiques de privacitat de Google (policies.google.com/privacy) i Trustindex (trustindex.io/privacy-policy).",
    },
    {
      heading: '5. Com gestionar les galetes',
      body: "Pots gestionar les teves preferències de galetes en qualsevol moment fent clic a «Gestionar galetes» al peu de pàgina. També pots configurar el teu navegador per bloquejar o eliminar galetes, però això pot afectar la funcionalitat del lloc.",
    },
    {
      heading: '6. Actualitzacions',
      body: "Podem actualitzar aquesta política per reflectir canvis en les galetes que utilitzem. Et recomanem revisar-la periòdicament.",
    },
  ],
}

const es: LegalContent = {
  title: 'Política de Cookies',
  updated: 'Última actualización: 14 de junio de 2025',
  sections: [
    {
      heading: '1. ¿Qué son las cookies?',
      body: "Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo para recordar preferencias y mejorar tu experiencia de navegación.",
    },
    {
      heading: '2. Cookies que utiliza este sitio',
      body: cookieTableEs,
    },
    {
      heading: '3. Cookies estrictamente necesarias',
      body: "La cookie raco_consent se utiliza para recordar tus preferencias de consentimiento. No requiere tu consentimiento previo porque es estrictamente necesaria para el funcionamiento del sistema de gestión de cookies.",
    },
    {
      heading: '4. Cookies de terceros',
      body: "Google Maps y Trustindex pueden establecer cookies cuando aceptas las cookies de terceros. Para más información, consulta las políticas de privacidad de Google (policies.google.com/privacy) y Trustindex (trustindex.io/privacy-policy).",
    },
    {
      heading: '5. Cómo gestionar las cookies',
      body: "Puedes gestionar tus preferencias de cookies en cualquier momento haciendo clic en «Gestionar cookies» en el pie de página. También puedes configurar tu navegador para bloquear o eliminar cookies, aunque esto puede afectar la funcionalidad del sitio.",
    },
    {
      heading: '6. Actualizaciones',
      body: "Podemos actualizar esta política para reflejar cambios en las cookies que utilizamos. Te recomendamos revisarla periódicamente.",
    },
  ],
}

const en: LegalContent = {
  title: 'Cookie Policy',
  updated: 'Last updated: 14 June 2025',
  sections: [
    {
      heading: '1. What are cookies?',
      body: "Cookies are small text files that websites store on your device to remember preferences and improve your browsing experience.",
    },
    {
      heading: '2. Cookies used on this site',
      body: cookieTableEn,
    },
    {
      heading: '3. Strictly necessary cookies',
      body: "The raco_consent cookie is used to remember your consent preferences. It does not require your prior consent because it is strictly necessary for the cookie management system to function.",
    },
    {
      heading: '4. Third-party cookies',
      body: "Google Maps and Trustindex may set cookies when you accept third-party cookies. For more information, see Google's privacy policy (policies.google.com/privacy) and Trustindex's privacy policy (trustindex.io/privacy-policy).",
    },
    {
      heading: '5. How to manage cookies',
      body: "You can manage your cookie preferences at any time by clicking «Manage cookies» in the footer. You can also configure your browser to block or delete cookies, although this may affect site functionality.",
    },
    {
      heading: '6. Updates',
      body: "We may update this policy to reflect changes in the cookies we use. We recommend reviewing it periodically.",
    },
  ],
}

export default function CookiesPage() {
  return <LegalLayout ca={ca} es={es} en={en} />
}
