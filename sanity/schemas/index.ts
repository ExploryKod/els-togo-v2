// Import all document schemas
import project from "./documents/project";
import section from "./documents/section";
import member from "./documents/member";
import cardContent from "./documents/cardContent";

// Import all singleton schemas
import elsTogoSettings from "./singletons/elsTogoSettings";

// Export all schemas as an array
export const elsTogoSchemas = [
  // Document schemas
  project,
  section,
  member,
  cardContent,
  
  // Singleton schemas
  elsTogoSettings,
];
