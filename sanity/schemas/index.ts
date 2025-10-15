// Import all document schemas
import project from "./documents/project";
import section from "./documents/section";
import member from "./documents/member";
import cardContent from "./documents/cardContent";
import category from "./documents/category";
import missionCard from "./documents/missionCard";

// Import all singleton schemas
import elsTogoSettings from "./singletons/elsTogoSettings";
import websiteSections from "./singletons/websiteSections";

// Export all schemas as an array
export const elsTogoSchemas = [
  // Document schemas
  project,
  section,
  member,
  cardContent,
  category,
  missionCard,

  // Singleton schemas
  elsTogoSettings,
  websiteSections,
];
