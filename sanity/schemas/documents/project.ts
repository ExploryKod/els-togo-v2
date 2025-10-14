import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  icon: DocumentIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Project Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "projectCategory",
      title: "Project Category",
      type: "string",
      options: {
        list: [
          { title: "Web Development", value: "web-development" },
          { title: "Mobile App", value: "mobile-app" },
          { title: "Design", value: "design" },
          { title: "Consulting", value: "consulting" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "projectImage",
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
      name: "projectStatus",
      title: "Project Status",
      type: "string",
      options: {
        list: [
          { title: "Planning", value: "planning" },
          { title: "In Progress", value: "in-progress" },
          { title: "Completed", value: "completed" },
          { title: "On Hold", value: "on-hold" },
        ],
      },
      initialValue: "planning",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
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
      subtitle: "projectCategory",
      media: "projectImage",
    },
  },
});
