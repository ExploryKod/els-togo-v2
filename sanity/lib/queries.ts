import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "elsTogoSettings"][0]`;

// Els Togo specific queries
export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  description,
  projectCategory,
  projectImage,
  projectStatus,
  startDate,
  endDate,
  location,
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
