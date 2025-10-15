import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons';

export default defineType({
  name: 'missionCard',
  title: 'Mission Card',
  icon: TagIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the mission card (e.g., "Dignité", "Amour")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'The description text for this mission card',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'iconImage',
      title: 'Icon Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
      description: 'Icon or image for this mission card',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this card should appear (lower numbers appear first)',
      validation: (rule) => rule.min(0).integer(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text',
      media: 'iconImage',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No description',
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
