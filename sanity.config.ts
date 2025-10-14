"use client";
/**
 * This config uses the shared studio schemas for els-togo
 * The schemas are now managed in the shared studio
 */
import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import { assistWithPresets } from "@/sanity/plugins/assist";

// Import schemas from local schemas
import { elsTogoSchemas } from "./sanity/schemas";

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: elsTogoSchemas,
  },
  plugins: [
    structureTool({ 
      structure: pageStructure(elsTogoSchemas.filter(schema => schema.name === 'elsTogoSettings')) 
    }),
    singletonPlugin(elsTogoSchemas.filter(schema => schema.name === 'elsTogoSettings').map(schema => schema.name)),
    unsplashImageAsset(),
    assistWithPresets(),
    process.env.NODE_ENV === "development" &&
      visionTool({ defaultApiVersion: apiVersion }),
  ].filter(Boolean),
});
