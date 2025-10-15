import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "elsTogoSettings"][0]`;

// Els Togo specific queries
export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  id,
  title,
  accroche,
  description,
  goal,
  howWeDo,
  results,
  date,
  place,
  category->{
    _id,
    title,
    description,
    color
  },
  projectImg,
  "slug": slug.current
}`;

export const sectionsQuery = groq`*[_type == "section"] | order(order asc) {
  _id,
  sectionTitle,
  sectionText,
  sectionImage,
  "sectionOrder": order
}`;

export const membersQuery = groq`*[_type == "member"] | order(_createdAt desc) {
  _id,
  firstname,
  name,
  role,
  bio,
  memberImage,
  email,
  phone,
  socialLinks
}`;

export const cardContentQuery = groq`*[_type == "cardContent"] | order(_createdAt desc) {
  _id,
  cardTitle,
  cardDescription,
  cardImage,
  cardCategory,
  cardLink
}`;

export const categoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  description,
  color
}`;

export const missionCardsQuery = groq`*[_type == "missionCard"] | order(order asc, title asc) {
  _id,
  title,
  text,
  iconImage,
  order
}`;

export const websiteSectionsQuery = groq`*[_type == "websiteSections"] | order(_updatedAt desc)[0] {
  _id,
  heroSection,
  projectSection,
  missionSection,
  teamSection,
  contactSection,
  contactInfo
}`;
