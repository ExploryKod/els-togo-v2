import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "cardContent",
  title: "Content Card",
  icon: DocumentIcon,
  type: "document",
  fields: [
    defineField({
      name: "cardTitle",
      title: "Card Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cardDescription",
      title: "Card Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cardImage",
      title: "Card Image",
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
      name: "cardCategory",
      title: "Card Category",
      type: "string",
      options: {
        list: [
          { title: "Service", value: "service" },
          { title: "Feature", value: "feature" },
          { title: "Testimonial", value: "testimonial" },
          { title: "News", value: "news" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "cardLink",
      title: "Card Link",
      type: "object",
      fields: [
        {
          name: "url",
          title: "URL",
          type: "url",
        },
        {
          name: "text",
          title: "Link Text",
          type: "string",
        },
        {
          name: "openInNewTab",
          title: "Open in New Tab",
          type: "boolean",
          initialValue: false,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "cardTitle",
      subtitle: "cardCategory",
      media: "cardImage",
    },
  },
});
