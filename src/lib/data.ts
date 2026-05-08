// Static data - This will be replaced by Google Sheets API later
// For now, Cami can edit this file or we connect Google Sheets

export interface Project {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  image: string;
  description: string;
  descriptionEn: string;
  behanceUrl?: string;
  year: string;
}

export interface Experience {
  company: string;
  position: string;
  positionEn: string;
  period: string;
  current?: boolean;
}

export interface Tool {
  name: string;
  category: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export const profile = {
  name: 'Camila Piana',
  nickname: 'Cami',
  email: 'camipiana24@gmail.com',
  location: 'Argentina',
  title: 'Diseñadora Gráfica & Estratega Visual',
  titleEn: 'Graphic Designer & Visual Strategist',
  yearsOfExperience: 7,
  bio: 'Soy Cami, diseñadora gráfica con más de 7 años de experiencia. Me especializo en branding, UX/UI, diseño para paid media y email marketing. Creo identidades visuales que no solo se ven bien, sino que generan resultados. Combino creatividad con estrategia para ayudar a marcas a conectar con su audiencia.',
  bioEn: "I'm Cami, a graphic designer with over 7 years of experience. I specialize in branding, UX/UI, paid media design, and email marketing. I create visual identities that not only look great but deliver results. I combine creativity with strategy to help brands connect with their audience.",
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'Behance',
    url: 'https://www.behance.net/camipiana',
    label: 'behance.net/camipiana',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/camila-piana-a79854284/',
    label: 'linkedin.com/in/camila-piana',
  },
  {
    platform: 'Email',
    url: 'mailto:camipiana24@gmail.com',
    label: 'camipiana24@gmail.com',
  },
];

export const categories = [
  { id: 'branding', name: 'Branding', nameEn: 'Branding', number: '01' },
  { id: 'ux-ui', name: 'UX / UI', nameEn: 'UX / UI', number: '02' },
  { id: 'paid-media', name: 'Paid Media', nameEn: 'Paid Media', number: '03' },
  { id: 'social-media', name: 'Social Media', nameEn: 'Social Media', number: '04' },
  { id: 'email-marketing', name: 'Email Marketing', nameEn: 'Email Marketing', number: '05' },
];

export const projects: Project[] = [
  {
    id: 'boreal',
    title: 'Boreal - Agencia Creativa',
    titleEn: 'Boreal - Creative Agency',
    category: 'branding',
    image: '/images/placeholder-project.jpg',
    description: 'Identidad visual y branding para agencia de diseño y publicidad.',
    descriptionEn: 'Visual identity and branding for a design and advertising agency.',
    behanceUrl: 'https://www.behance.net/camipiana',
    year: '2024',
  },
  {
    id: 'volando-alto',
    title: 'Volando Alto',
    titleEn: 'Volando Alto',
    category: 'branding',
    image: '/images/placeholder-project.jpg',
    description: 'Branding, redes sociales y piezas gráficas para evento de mujeres emprendedoras en la Patagonia.',
    descriptionEn: 'Branding, social media, and graphic pieces for a women entrepreneurs event in Patagonia.',
    behanceUrl: 'https://www.behance.net/camipiana',
    year: '2024',
  },
  {
    id: 'boccone',
    title: 'Boccone Pizzeria',
    titleEn: 'Boccone Pizzeria',
    category: 'branding',
    image: '/images/placeholder-project.jpg',
    description: 'Identidad visual completa para pizzería artesanal.',
    descriptionEn: 'Complete visual identity for artisan pizzeria.',
    behanceUrl: 'https://www.behance.net/camipiana',
    year: '2024',
  },
  {
    id: 'growth-path',
    title: 'Growth Path',
    titleEn: 'Growth Path',
    category: 'paid-media',
    image: '/images/placeholder-project.jpg',
    description: 'Branding y marca personal para especialista en paid media.',
    descriptionEn: 'Branding and personal brand for a paid media specialist.',
    behanceUrl: 'https://www.behance.net/camipiana',
    year: '2024',
  },
];

export const experiences: Experience[] = [
  {
    company: 'Boreal (Agencia propia)',
    position: 'Co-fundadora & Directora de Diseño',
    positionEn: 'Co-founder & Design Director',
    period: '2023 - Presente',
    current: true,
  },
  {
    company: 'Freelance',
    position: 'Diseñadora Gráfica Senior',
    positionEn: 'Senior Graphic Designer',
    period: '2017 - Presente',
    current: true,
  },
];

export const tools: Tool[] = [
  { name: 'Figma', category: 'Design' },
  { name: 'Adobe Photoshop', category: 'Design' },
  { name: 'Adobe Illustrator', category: 'Design' },
  { name: 'Adobe Premiere Pro', category: 'Design' },
  { name: 'Canva', category: 'Design' },
  { name: 'CapCut', category: 'Design' },
  { name: 'MidJourney', category: 'AI' },
  { name: 'ChatGPT', category: 'AI' },
  { name: 'HubSpot', category: 'Marketing' },
  { name: 'Jira', category: 'Management' },
  { name: 'Asana', category: 'Management' },
  { name: 'Trello', category: 'Management' },
  { name: 'ClickUp', category: 'Management' },
  { name: 'Notion', category: 'Management' },
];

export const specialties = [
  { name: 'Branding', nameEn: 'Branding' },
  { name: 'UX / UI', nameEn: 'UX / UI' },
  { name: 'Paid Media', nameEn: 'Paid Media' },
  { name: 'Email Marketing', nameEn: 'Email Marketing' },
  { name: 'Inbound Marketing', nameEn: 'Inbound Marketing' },
  { name: 'Lead Nurturing', nameEn: 'Lead Nurturing' },
];
