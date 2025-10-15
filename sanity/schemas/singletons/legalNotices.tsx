import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export default defineType({
  name: 'legalNotices',
  title: 'Mentions Légales',
  icon: DocumentTextIcon,
  type: 'document',
  description: 'Gestion des mentions légales du site. Ce singleton alimente uniquement la page /legal-notices. Pour la politique de confidentialité, utilisez le singleton "Conformité".',
  fields: [
    // Site Information
    defineField({
      name: 'siteInfo',
      title: 'Informations du Site',
      type: 'object',
      fields: [
        defineField({
          name: 'siteUrl',
          title: 'URL du Site',
          type: 'url',
          description: 'URL complète du site web',
          validation: (rule) => rule.required().uri({
            allowRelative: false,
            scheme: ['http', 'https']
          }),
        }),
        defineField({
          name: 'siteDescription',
          title: 'Description du Site',
          type: 'text',
          rows: 3,
          description: 'Description du site et de ses activités',
          validation: (rule) => rule.required().max(500),
        }),
      ],
    }),

    // Organization Information
    defineField({
      name: 'organizationInfo',
      title: 'Informations de l\'Organisation',
      type: 'object',
      fields: [
        defineField({
          name: 'organizationName',
          title: 'Nom de l\'Organisation',
          type: 'string',
          description: 'Nom légal complet de l\'organisation',
          validation: (rule) => rule.required().max(200),
        }),
        defineField({
          name: 'legalForm',
          title: 'Forme Juridique',
          type: 'string',
          description: 'Ex: Association, SAS, SARL, etc.',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'capital',
          title: 'Capital Social',
          type: 'string',
          description: 'Capital social (si applicable)',
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: 'registrationNumber',
          title: 'Numéro d\'Immatriculation',
          type: 'string',
          description: 'Numéro RCS, RNA, ou autre numéro d\'immatriculation',
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: 'registrationOffice',
          title: 'Greffe d\'Immatriculation',
          type: 'string',
          description: 'Ville du greffe d\'immatriculation',
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: 'address',
          title: 'Adresse du Siège Social',
          type: 'object',
          fields: [
            defineField({
              name: 'street',
              title: 'Adresse',
              type: 'string',
              description: 'Adresse complète du siège social',
              validation: (rule) => rule.required().max(200),
            }),
            defineField({
              name: 'city',
              title: 'Ville',
              type: 'string',
              description: 'Ville du siège social',
              validation: (rule) => rule.required().max(100),
            }),
            defineField({
              name: 'country',
              title: 'Pays',
              type: 'string',
              description: 'Pays du siège social',
              validation: (rule) => rule.required().max(100),
            }),
          ],
        }),
        defineField({
          name: 'contactPhone',
          title: 'Téléphone de Contact',
          type: 'string',
          description: 'Numéro de téléphone principal',
          validation: (rule) => rule.max(50),
        }),
      ],
    }),

    // Publication Director
    defineField({
      name: 'publicationDirector',
      title: 'Directeur de Publication',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Nom du Directeur',
          type: 'string',
          description: 'Nom complet du directeur de publication',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'position',
          title: 'Poste/Fonction',
          type: 'string',
          description: 'Fonction du directeur de publication',
          validation: (rule) => rule.required().max(100),
        }),
      ],
    }),

    // Hosting Information
    defineField({
      name: 'hostingInfo',
      title: 'Informations d\'Hébergement',
      type: 'object',
      fields: [
        defineField({
          name: 'providerName',
          title: 'Nom du Fournisseur',
          type: 'string',
          description: 'Nom de la société d\'hébergement',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'providerAddress',
          title: 'Adresse du Fournisseur',
          type: 'object',
          fields: [
            defineField({
              name: 'street',
              title: 'Adresse',
              type: 'string',
              description: 'Adresse complète du fournisseur',
              validation: (rule) => rule.required().max(200),
            }),
            defineField({
              name: 'city',
              title: 'Ville',
              type: 'string',
              description: 'Ville du fournisseur',
              validation: (rule) => rule.required().max(100),
            }),
            defineField({
              name: 'country',
              title: 'Pays',
              type: 'string',
              description: 'Pays du fournisseur',
              validation: (rule) => rule.required().max(100),
            }),
          ],
        }),
        defineField({
          name: 'providerPhone',
          title: 'Téléphone du Fournisseur',
          type: 'string',
          description: 'Numéro de téléphone du fournisseur',
          validation: (rule) => rule.max(50),
        }),
        defineField({
          name: 'providerWebsite',
          title: 'Site Web du Fournisseur',
          type: 'url',
          description: 'URL du site web du fournisseur',
          validation: (rule) => rule.uri({
            allowRelative: false,
            scheme: ['http', 'https']
          }),
        }),
      ],
    }),

    // Legal Disclaimers
    defineField({
      name: 'disclaimers',
      title: 'Avertissements Légaux',
      type: 'object',
      fields: [
        defineField({
          name: 'contentDisclaimer',
          title: 'Avertissement sur le Contenu',
          type: 'text',
          rows: 4,
          description: 'Avertissement sur l\'exactitude du contenu',
          validation: (rule) => rule.required().max(1000),
        }),
        defineField({
          name: 'copyrightNotice',
          title: 'Avis de Droits d\'Auteur',
          type: 'text',
          rows: 3,
          description: 'Avis sur les droits de reproduction',
          validation: (rule) => rule.required().max(500),
        }),
        defineField({
          name: 'liabilityDisclaimer',
          title: 'Limitation de Responsabilité',
          type: 'text',
          rows: 4,
          description: 'Avertissement sur la limitation de responsabilité',
          validation: (rule) => rule.required().max(1000),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'organizationInfo.organizationName',
      subtitle: 'organizationInfo.legalForm',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Mentions Légales',
        subtitle: subtitle || 'Gérer les mentions légales du site',
      };
    },
  },
});
