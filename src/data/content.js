// ============================================================
// UBUMWE — Content Data
//
// This file holds all seed content (mock data for the prototype).
// When a CMS or backend is connected, replace these exports with
// API calls returning the same shape. The rest of the app won't
// need to change.
//
// Field naming conventions:
//   - Bilingual text fields use _fr / _en suffixes
//   - minRole: undefined = all members | 'editor' | 'admin'
//   - type: 'upcoming' | 'past'
// ============================================================

// ── BLOG POSTS ────────────────────────────────────────────────
export const FEATURED_POST = {
  id: 1,
  category: 'cat_local_act',
  imgText: 'GALA',
  minRole: undefined,
  title_fr: 'Grande Soirée de Gala — Une Nuit Inoubliable à Québec',
  title_en: 'Grand Gala Evening — An Unforgettable Night in Quebec City',
  excerpt_fr: 'Plus de 180 membres de notre communauté se sont réunis au Château Frontenac pour célébrer nos racines, notre culture et notre avenir commun. Une soirée marquée par la musique live, la danse et l\'émotion pure.',
  excerpt_en: 'Over 180 community members gathered at Château Frontenac to celebrate our roots, culture and shared future. An evening filled with live music, dance and pure emotion.',
  date_fr: '8 Mars 2025',
  date_en: 'March 8, 2025',
  author_fr: 'Comité Éditorial',
  author_en: 'Editorial Committee',
}

// Secondary posts grid (displayed as cards below the featured post)
export const SECONDARY_POSTS = [
  {
    id: 2,
    category: 'cat_future_act',
    color: 'green',
    emoji: '🌟',
    minRole: undefined,
    title_fr: 'Journée Culturelle du Printemps 2025',
    title_en: 'Spring Cultural Day 2025',
    excerpt_fr: 'Venez célébrer nos traditions avec musique live, cuisine authentique et artisanat burundais dans la Haute-Ville.',
    excerpt_en: 'Come celebrate our traditions with live music, authentic cuisine and Burundian crafts in the Old City.',
    date_fr: '15 Avr 2025',
    date_en: 'Apr 15, 2025',
  },
  {
    id: 3,
    category: 'cat_local_news',
    color: 'red',
    emoji: '📰',
    minRole: undefined,
    title_fr: 'Inauguration du Nouveau Local Communautaire — Limoilou',
    title_en: 'Opening of the New Community Space — Limoilou',
    excerpt_fr: 'Un espace dédié à l\'accueil et à l\'intégration de nos nouveaux arrivants dans la région de Québec.',
    excerpt_en: 'A dedicated space for welcoming and integrating newcomers in the Quebec City region.',
    date_fr: '22 Fév 2025',
    date_en: 'Feb 22, 2025',
  },
  {
    id: 4,
    category: 'cat_bdi_biz',
    color: 'gold',
    emoji: '🌍',
    minRole: undefined,
    title_fr: 'Boom Agricole : Le Burundi Mise sur l\'Exportation du Café',
    title_en: 'Agricultural Boom: Burundi Bets on Coffee Exports',
    excerpt_fr: 'Le secteur agricole burundais connaît une expansion historique grâce aux nouvelles politiques d\'exportation.',
    excerpt_en: 'Burundi\'s agricultural sector is experiencing historic expansion thanks to new export policies.',
    date_fr: '1 Mar 2025',
    date_en: 'Mar 1, 2025',
  },
  {
    id: 5,
    category: 'cat_diaspora',
    color: 'teal',
    emoji: '🇨🇦',
    minRole: undefined,
    title_fr: 'Rencontre Inter-Communautés — Montréal, Ottawa & Québec',
    title_en: 'Inter-Community Meeting — Montreal, Ottawa & Quebec City',
    excerpt_fr: 'Les trois grandes communautés burundaises du Canada se sont retrouvées à Ottawa pour consolider les liens et coordonner les initiatives pancanadiennes.',
    excerpt_en: 'The three major Burundian communities in Canada met in Ottawa to strengthen bonds and coordinate pan-Canadian initiatives.',
    date_fr: '5 Mar 2025',
    date_en: 'Mar 5, 2025',
  },
]

// ── EVENTS ────────────────────────────────────────────────────
export const EVENTS = [
  {
    id: 1,
    day: '15', month_fr: 'Avr', month_en: 'Apr',
    type: 'upcoming',
    title_fr: 'Journée Culturelle du Printemps',
    title_en: 'Spring Cultural Day',
    loc_fr: 'Parc de la Francophonie, Québec',
    loc_en: 'Parc de la Francophonie, Quebec City',
    desc_fr: 'Musique, danse, cuisine et artisanat burundais',
    desc_en: 'Music, dance, Burundian cuisine and crafts',
  },
  {
    id: 2,
    day: '28', month_fr: 'Avr', month_en: 'Apr',
    type: 'upcoming',
    title_fr: 'Conférence : Investir au Burundi',
    title_en: 'Conference: Investing in Burundi',
    loc_fr: 'Université Laval, Pavillon Desjardins',
    loc_en: 'Université Laval, Desjardins Pavilion',
    desc_fr: 'Panel d\'experts et d\'entrepreneurs de la diaspora',
    desc_en: 'Expert panel and diaspora entrepreneurs',
  },
  {
    id: 3,
    day: '10', month_fr: 'Mai', month_en: 'May',
    type: 'upcoming',
    title_fr: 'Tournoi de Football Communautaire',
    title_en: 'Community Soccer Tournament',
    loc_fr: 'Complexe sportif de Sainte-Foy',
    loc_en: 'Sainte-Foy Sports Complex',
    desc_fr: '3ème édition annuelle — toutes les familles bienvenues',
    desc_en: '3rd annual edition — all families welcome',
  },
  {
    id: 4,
    day: '8', month_fr: 'Mar', month_en: 'Mar',
    type: 'past',
    title_fr: 'Soirée de Gala 2025',
    title_en: 'Gala Evening 2025',
    loc_fr: 'Château Frontenac, Québec',
    loc_en: 'Château Frontenac, Quebec City',
    desc_fr: '180+ membres — une soirée historique',
    desc_en: '180+ members — a historic evening',
  },
  {
    id: 5,
    day: '14', month_fr: 'Fév', month_en: 'Feb',
    type: 'past',
    title_fr: 'Saint-Valentin Communautaire',
    title_en: 'Community Valentine\'s Day',
    loc_fr: 'Salle des Fêtes — Limoilou',
    loc_en: 'Community Hall — Limoilou',
    desc_fr: 'Soirée rencontre pour jeunes adultes de la communauté',
    desc_en: 'Social evening for young adults in the community',
  },
]

// Days in March 2025 that have events (for calendar widget)
export const CAL_EVENT_DAYS = [4, 15, 28]

// ── EVENT DETAIL (shared across events as placeholder) ────────
export const EVENT_COMMITTEE = [
  { name: 'Celestine Niyonkuru', role_fr: 'Présidente du comité',   role_en: 'Committee Chair',      color: '#1B4332' },
  { name: 'Faustin Havyarimana', role_fr: 'Logistique & Sécurité',  role_en: 'Logistics & Security',  color: '#9B1D20' },
  { name: 'Aline Bukuru',        role_fr: 'Programme & Animation',   role_en: 'Program & Entertainment', color: '#8B6914' },
  { name: 'Patrick Nshimirimana',role_fr: 'Communications',          role_en: 'Communications',         color: '#2D6A4F' },
]

export const EVENT_PROJECTS = [
  { name_fr: 'Saveurs de Bujumbura', name_en: 'Flavors of Bujumbura', desc_fr: 'Traiteur officiel',     desc_en: 'Official caterer'      },
  { name_fr: 'BurundArt Studio',     name_en: 'BurundArt Studio',     desc_fr: 'Exposition d\'art',     desc_en: 'Art exhibition'         },
  { name_fr: 'Africa Travel Québec', name_en: 'Africa Travel Quebec', desc_fr: 'Partenaire voyage',     desc_en: 'Travel partner'         },
  { name_fr: 'TechBurundi',          name_en: 'TechBurundi',          desc_fr: 'Startup diaspora',      desc_en: 'Diaspora startup'       },
]

// ── GALLERY ───────────────────────────────────────────────────
export const GALLERY_ITEMS = [
  { id: 1, colorClass: 'g1', emoji: '📸', type: 'event',
    title_fr: 'Gala 2025 — Cérémonie d\'ouverture',    title_en: 'Gala 2025 — Opening Ceremony',
    date_fr:  '8 Mar 2025',                             date_en:  'Mar 8, 2025' },
  { id: 2, colorClass: 'g2', emoji: '🎵', type: 'event',
    title_fr: 'Soirée Musicale — Groupe Kigali Sound',  title_en: 'Music Night — Kigali Sound Band',
    date_fr:  '8 Mar 2025',                             date_en:  'Mar 8, 2025' },
  { id: 3, colorClass: 'g3', emoji: '🎨', type: 'promo',
    title_fr: 'Flyer Officiel — Journée Culturelle 2025', title_en: 'Official Flyer — Cultural Day 2025',
    date_fr:  '1 Mar 2025',                              date_en:  'Mar 1, 2025' },
  { id: 4, colorClass: 'g4', emoji: '📸', type: 'event',
    title_fr: 'Remise de Prix — Entrepreneurs 2024',    title_en: 'Awards Ceremony — Entrepreneurs 2024',
    date_fr:  '15 Déc 2024',                            date_en:  'Dec 15, 2024' },
  { id: 5, colorClass: 'g1', emoji: '🎤', type: 'event',
    title_fr: 'Discours du Président — Assemblée 2024', title_en: 'President\'s Address — Assembly 2024',
    date_fr:  '10 Déc 2024',                            date_en:  'Dec 10, 2024' },
  { id: 6, colorClass: 'g3', emoji: '📄', type: 'promo',
    title_fr: 'Paroles — Hymne de la Communauté',       title_en: 'Lyrics — Community Anthem',
    date_fr:  '1 Jan 2025',                             date_en:  'Jan 1, 2025' },
]

// ── BUSINESSES ────────────────────────────────────────────────
export const BUSINESSES = [
  {
    id: 1, icon: '🍽️', iconColor: 'green',
    name_fr: 'Saveurs de Bujumbura',      name_en: 'Flavors of Bujumbura',
    type_fr: 'Restaurant',                type_en: 'Restaurant',
    desc_fr: 'Cuisine authentique burundaise et africaine. Traiteur pour événements communautaires. Service de livraison dans la région de Québec.',
    desc_en: 'Authentic Burundian and African cuisine. Catering for community events. Delivery available in the Quebec City area.',
    location_fr: 'Saint-Roch, Québec',   location_en: 'Saint-Roch, Quebec City',
    owner: 'Famille Nkurunziza',
  },
  {
    id: 2, icon: '✈️', iconColor: 'red',
    name_fr: 'Africa Travel Québec',      name_en: 'Africa Travel Quebec',
    type_fr: 'Voyage & Transport',        type_en: 'Travel & Transport',
    desc_fr: 'Spécialistes des vols Québec–Montréal–Bujumbura. Conseils visa et documents officiels. 15 ans d\'expérience.',
    desc_en: 'Specialists in Quebec–Montreal–Bujumbura flights. Visa advice and official documents. 15 years of experience.',
    location_fr: 'Haute-Ville, Québec',  location_en: 'Upper Town, Quebec City',
    owner: 'Jean-Pierre Hakizimana',
  },
  {
    id: 3, icon: '✂️', iconColor: 'gold',
    name_fr: 'Coiffure Afrique Limoilou', name_en: 'Africa Hairstyle Limoilou',
    type_fr: 'Beauté & Bien-être',        type_en: 'Beauty & Wellness',
    desc_fr: 'Salon spécialisé en coiffures africaines. Tresses, tissages, locs. Accueil chaleureux garanti.',
    desc_en: 'Salon specializing in African hairstyles. Braids, weaves, locs. Warm welcome guaranteed.',
    location_fr: 'Limoilou, Québec',     location_en: 'Limoilou, Quebec City',
    owner: 'Marie-Claire Ndayishimiye',
  },
  {
    id: 4, icon: '📊', iconColor: 'green',
    name_fr: 'Cabinet Diaspora Finance',  name_en: 'Diaspora Finance Office',
    type_fr: 'Services Financiers',       type_en: 'Financial Services',
    desc_fr: 'Comptabilité, fiscalité et conseils financiers pour nouveaux arrivants et entrepreneurs burundais.',
    desc_en: 'Accounting, taxes and financial advice for newcomers and Burundian entrepreneurs.',
    location_fr: 'Sainte-Foy, Québec',   location_en: 'Sainte-Foy, Quebec City',
    owner: 'Emmanuel Bigirimana',
  },
  {
    id: 5, icon: '🏠', iconColor: 'red',
    name_fr: 'Immo Capital-Nationale',    name_en: 'Capital-Nationale Realty',
    type_fr: 'Immobilier',                type_en: 'Real Estate',
    desc_fr: 'Achat, vente et location. Experts du marché immobilier de la région de Québec pour la communauté africaine.',
    desc_en: 'Buying, selling and renting. Real estate experts for the African community in the Quebec City region.',
    location_fr: 'Ste-Foy/Sillery',      location_en: 'Ste-Foy/Sillery',
    owner: 'Consolate Manirakiza',
  },
  {
    id: 6, icon: '💻', iconColor: 'gold',
    name_fr: 'TechBurundi Solutions',     name_en: 'TechBurundi Solutions',
    type_fr: 'Technologie',               type_en: 'Technology',
    desc_fr: 'Développement web et mobile, consultation IT. Pont technologique entre la diaspora et Bujumbura.',
    desc_en: 'Web and mobile development, IT consulting. Tech bridge between the diaspora and Bujumbura.',
    location_fr: 'Télétravail',           location_en: 'Remote',
    owner: 'Patrick Ntamakiriro',
  },
]

// ── TRAVEL RESOURCES ──────────────────────────────────────────
export const TRAVEL_RESOURCES = [
  {
    icon: '✈️',
    name_fr: 'Compagnies Aériennes',    name_en: 'Airlines',
    desc_fr: 'Brussels Airlines, Ethiopian Airlines, Kenya Airways — via Montréal-Trudeau vers Bujumbura (BJM)',
    desc_en: 'Brussels Airlines, Ethiopian Airlines, Kenya Airways — via Montreal-Trudeau to Bujumbura (BJM)',
  },
  {
    icon: '📋',
    name_fr: 'Visas & Documents',       name_en: 'Visas & Documents',
    desc_fr: 'Conseil visa burundais et canadien. Authentification de documents à Québec et Montréal.',
    desc_en: 'Burundian and Canadian visa advice. Document authentication in Quebec City and Montreal.',
  },
  {
    icon: '💱',
    name_fr: 'Transfert d\'Argent',     name_en: 'Money Transfers',
    desc_fr: 'Wave, Western Union et services fiables recommandés par nos membres pour envois vers le Burundi.',
    desc_en: 'Wave, Western Union and trusted services recommended by our members for sending to Burundi.',
  },
  {
    icon: '🏥',
    name_fr: 'Santé & Vaccinations',    name_en: 'Health & Vaccinations',
    desc_fr: 'Vaccins recommandés et cliniques de voyage partenaires dans la région de Québec.',
    desc_en: 'Recommended vaccines and partner travel clinics in the Quebec City region.',
  },
  {
    icon: '📱',
    name_fr: 'Connectivité au Burundi', name_en: 'Connectivity in Burundi',
    desc_fr: 'Guides SIM locales, opérateurs télécom et accès internet pour votre séjour à Bujumbura.',
    desc_en: 'Local SIM guides, telecom operators and internet access for your stay in Bujumbura.',
  },
  {
    icon: '🏨',
    name_fr: 'Hébergement à Bujumbura', name_en: 'Accommodation in Bujumbura',
    desc_fr: 'Hôtels et contacts recommandés par des membres de la communauté de Québec.',
    desc_en: 'Hotels and contacts recommended by community members from Quebec City.',
  },
]

// ── PARTNERS ──────────────────────────────────────────────────
export const PARTNERS = [
  'Diaspora Canada',
  'Africa Business QC',
  'BanqueAfrique+',
  'Radio Ubumwe 104.3',
  'Église Communautaire',
]

// ── CONTRIBUTORS ──────────────────────────────────────────────
export const CONTRIBUTORS = [
  { name_fr: 'Association Ubumwe Québec',       name_en: 'Association Ubumwe Quebec',      role_fr: 'Fondateur & Principal',      role_en: 'Founder & Principal',      badge: 'Or / Gold'    },
  { name_fr: 'Diaspora Burundaise Canada',       name_en: 'Burundian Diaspora Canada',      role_fr: 'Partenaire Stratégique',     role_en: 'Strategic Partner',        badge: 'Or / Gold'    },
  { name_fr: 'Famille Hakizimana',               name_en: 'Hakizimana Family',              role_fr: 'Mécène Culturel',            role_en: 'Cultural Patron',          badge: 'Argent/Silver'},
  { name_fr: 'Groupe Africa Business QC',        name_en: 'Africa Business Group QC',       role_fr: 'Partenaire Commercial',      role_en: 'Business Partner',         badge: 'Argent/Silver'},
  { name_fr: 'Jean-Baptiste Niyonzima',          name_en: 'Jean-Baptiste Niyonzima',        role_fr: 'Contributeur Individuel',    role_en: 'Individual Contributor',   badge: 'Bronze'       },
  { name_fr: 'Église Communautaire Bujumbura QC',name_en: 'Community Church Bujumbura QC', role_fr: 'Partenaire Communautaire',   role_en: 'Community Partner',        badge: 'Bronze'       },
]
