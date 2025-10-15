import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Project Category",
  icon: TagIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (rule) => rule.required().min(1).max(100),
      description: "The name of the project category (e.g., 'Education', 'Health', 'Environment')",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Optional description of what this category represents",
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: "Optional color code for this category (e.g., '#FF5733')",
      validation: (rule) => rule.regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color code"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Untitled Category",
        subtitle: subtitle || "No description",
      };
    },
  },
});
