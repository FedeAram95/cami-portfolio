export type Locale = 'es' | 'en';

export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      works: 'Trabajos',
      about: 'Sobre Mí',
      contact: 'Contacto',
    },
    home: {
      greeting: 'Hola, soy',
      name: 'Cami Piana',
      title: 'Diseñadora Gráfica & Estratega Visual',
      subtitle: '+7 años creando identidades visuales que conectan marcas con personas',
      cta: 'Ver trabajos',
      ctaContact: 'Contactame',
      scrollDown: 'Scroll para descubrir',
    },
    works: {
      title: 'Trabajos',
      archive: 'Portfolio',
      viewProject: 'Ver proyecto',
      backToWorks: 'Ver todos los trabajos',
    },
    about: {
      title: 'Sobre',
      titleAccent: 'Mí',
      profile: 'Perfil',
      experience: 'Experiencia',
      skills: 'Herramientas',
      education: 'Formación',
      languages: 'Idiomas',
      downloadResume: 'Descargar CV',
    },
    contact: {
      title: 'Hablemos',
      subtitle: '¿Tenés un proyecto en mente? Me encantaría escucharte.',
      email: 'Email',
      social: 'Redes',
      location: 'Argentina',
    },
    footer: {
      rights: 'Todos los derechos reservados',
      madeWith: 'Hecho con',
    },
  },
  en: {
    nav: {
      home: 'Home',
      works: 'Works',
      about: 'About',
      contact: 'Contact',
    },
    home: {
      greeting: "Hi, I'm",
      name: 'Cami Piana',
      title: 'Graphic Designer & Visual Strategist',
      subtitle: '+7 years creating visual identities that connect brands with people',
      cta: 'View works',
      ctaContact: 'Contact me',
      scrollDown: 'Scroll to discover',
    },
    works: {
      title: 'Works',
      archive: 'Portfolio',
      viewProject: 'View project',
      backToWorks: 'See all works',
    },
    about: {
      title: 'About',
      titleAccent: 'Me',
      profile: 'Profile',
      experience: 'Experience',
      skills: 'Tools',
      education: 'Education',
      languages: 'Languages',
      downloadResume: 'Download Resume',
    },
    contact: {
      title: "Let's Talk",
      subtitle: 'Have a project in mind? I would love to hear from you.',
      email: 'Email',
      social: 'Social',
      location: 'Argentina',
    },
    footer: {
      rights: 'All rights reserved',
      madeWith: 'Made with',
    },
  },
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}
