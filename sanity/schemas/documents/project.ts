import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  icon: DocumentIcon,
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Project ID",
      type: "string",
      description: "Unique identifier for the project (e.g., project-1)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accroche",
      title: "Accroche (Hook)",
      type: "text",
      rows: 2,
      description: "Short catchy description or tagline",
    }),
    defineField({
      name: "description",
      title: "Project Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "goal",
      title: "Project Goal",
      type: "text",
      rows: 4,
      description: "What was the main goal of this project?",
    }),
    defineField({
      name: "howWeDo",
      title: "How We Do It",
      type: "text",
      rows: 4,
      description: "Describe the process and approach used for this project.",
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "text",
      rows: 3,
      description: "What were the outcomes and results of this project?",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: "Project date (e.g., 'Date 1', '2024', etc.)",
    }),
    defineField({
      name: "place",
      title: "Place",
      type: "string",
      description: "Location or place of the project",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Project category",
    }),
    defineField({
      name: "projectImg",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
        },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "projectImg",
    },
  },
});
