import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export default defineType({
  name: 'websiteSections',
  title: 'Website Sections',
  icon: DocumentTextIcon,
  type: 'document',
  // Singleton configuration - only one instance can exist
  __experimental_actions: [
    'update',
    'publish',
  ],
  fields: [
    // Hero/Intro Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'pretitle',
          title: 'Pre-title',
          type: 'string',
          description: 'Small text above the main title (e.g., "Association ELS - Togo")',
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          description: 'The main headline of the hero section',
          validation: (rule) => rule.required().max(200),
        }),
        defineField({
          name: 'text',
          title: 'Description Text',
          type: 'text',
          rows: 4,
          description: 'The main description text for the hero section',
          validation: (rule) => rule.required().max(500),
        }),
        defineField({
          name: 'buttonData',
          title: 'Call-to-Action Button',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'Button URL',
              type: 'string',
              description: 'The URL the button should link to (e.g., "#contact")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              description: 'The text displayed on the button',
              validation: (rule) => rule.required().max(50),
            }),
          ],
        }),
      ],
    }),

    // Project Section
    defineField({
      name: 'projectSection',
      title: 'Project Section',
      type: 'object',
      fields: [
        defineField({
          name: 'pretitle',
          title: 'Pre-title',
          type: 'string',
          description: 'Small text above the main content (e.g., "Nos projets")',
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: 'text',
          title: 'Description Text',
          type: 'text',
          rows: 3,
          description: 'Description text for the project section',
          validation: (rule) => rule.max(300),
        }),
      ],
    }),

    // Mission Section
    defineField({
      name: 'missionSection',
      title: 'Mission Section',
      type: 'object',
      fields: [
        defineField({
          name: 'pretitle',
          title: 'Pre-title',
          type: 'string',
          description: 'Small text above the main content (e.g., "Notre Mission & nos valeurs")',
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: 'text',
          title: 'Description Text',
          type: 'text',
          rows: 3,
          description: 'Description text for the mission section',
          validation: (rule) => rule.max(300),
        }),
      ],
    }),

    // Team/Members Section
    defineField({
      name: 'teamSection',
      title: 'Team Section',
      type: 'object',
      fields: [
        defineField({
          name: 'pretitle',
          title: 'Pre-title',
          type: 'string',
          description: 'Small text above the main content (e.g., "Notre équipe")',
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          description: 'The main headline for the team section',
          validation: (rule) => rule.max(200),
        }),
        defineField({
          name: 'text',
          title: 'Description Text',
          type: 'text',
          rows: 3,
          description: 'Description text for the team section',
          validation: (rule) => rule.max(300),
        }),
      ],
    }),

    // Contact Section
    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          description: 'The main headline for the contact section',
          validation: (rule) => rule.required().max(200),
        }),
        defineField({
          name: 'text',
          title: 'Description Text',
          type: 'text',
          rows: 4,
          description: 'Description text for the contact section',
          validation: (rule) => rule.required().max(500),
        }),
      ],
    }),

    // Contact Information
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
          description: 'Physical address of the organization',
          validation: (rule) => rule.required().max(200),
        }),
        defineField({
          name: 'schedules',
          title: 'Opening Hours',
          type: 'string',
          description: 'Business hours or schedules (e.g., "Lundi - Vendredi: 8h - 17h")',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          description: 'Contact phone number with country code',
          validation: (rule) => rule.required().max(50),
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          description: 'Contact email address',
          validation: (rule) => rule.required().email().max(100),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroSection.title',
      subtitle: 'heroSection.pretitle',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Website Sections',
        subtitle: subtitle || 'Manage all website section content',
      };
    },
  },
});
