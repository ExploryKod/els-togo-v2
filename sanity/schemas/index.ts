// Import all document schemas
import project from "./documents/project";
import member from "./documents/member";
import category from "./documents/category";
import missionCard from "./documents/missionCard";

// Import all singleton schemas
import elsTogoSettings from "./singletons/elsTogoSettings";
import websiteSections from "./singletons/websiteSections";
import legalMatters from "./singletons/legalMatters";
import legalNotices from "./singletons/legalNotices";
import credits from "./singletons/credits";

// Export all schemas as an array
export const elsTogoSchemas = [
  // Document schemas
  project,
  member,
  category,
  missionCard,

  // Singleton schemas
  elsTogoSettings,
  websiteSections,
  legalMatters,
  legalNotices,
  credits,
];
