import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "elsTogoSettings"][0] {
  _id,
  title,
  description,
  footer,
  ogImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt,
    metadataBase
  }
}`;

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

// sectionsQuery removed: legacy 'section' document no longer used

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

// cardContentQuery removed: legacy 'cardContent' document no longer used

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
  projectsPageSection,
  missionSection,
  teamSection,
  contactSection,
  contactInfo
}`;

export const legalMattersQuery = groq`*[_type == "legalMatters"] | order(_updatedAt desc)[0] {
  _id,
  associationInfo,
  technicalInfo,
  dataProtectionAuthority,
  legalReferences
}`;
