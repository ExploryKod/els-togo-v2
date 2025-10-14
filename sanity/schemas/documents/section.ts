import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section",
  title: "Section",
  icon: DocumentIcon,
  type: "document",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sectionText",
      title: "Section Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "sectionImage",
      title: "Section Image",
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
      name: "order",
      title: "Order",
      type: "number",
      description: "Order in which this section should appear",
      validation: (rule) => rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: "sectionTitle",
      subtitle: "order",
      media: "sectionImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `Order: ${subtitle}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
