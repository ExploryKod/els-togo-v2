import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export default defineType({
  name: 'legalMatters',
  title: 'Conformité',
  icon: DocumentTextIcon,
  type: 'document',
  description: 'Gestion des informations légales et de conformité pour la politique de confidentialité. Ce singleton alimente uniquement la page /confidentiality. Pour les mentions légales, utilisez le singleton "Mentions Légales".',
  fields: [
    // Association Information
    defineField({
      name: 'associationInfo',
      title: 'Informations de l\'Association',
      type: 'object',
      description: 'Informations légales de l\'association utilisées dans la politique de confidentialité (/confidentiality)',
      fields: [
        defineField({
          name: 'associationName',
          title: 'Nom de l\'Association',
          type: 'string',
          description: 'Nom légal complet de l\'association',
          validation: (rule) => rule.required().max(200),
        }),
        defineField({
          name: 'legalRepresentative',
          title: 'Représentant Légal',
          type: 'string',
          description: 'Nom du représentant légal (ex: Koffi Azanli)',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'address',
          title: 'Adresse',
          type: 'object',
          fields: [
            defineField({
              name: 'street',
              title: 'Adresse Postale',
              type: 'string',
              description: 'Adresse postale de l\'association',
              validation: (rule) => rule.required().max(200),
            }),
            defineField({
              name: 'city',
              title: 'Ville',
              type: 'string',
              description: 'Ville où se trouve l\'association',
              validation: (rule) => rule.required().max(100),
            }),
            defineField({
              name: 'country',
              title: 'Pays',
              type: 'string',
              description: 'Pays où se trouve l\'association',
              validation: (rule) => rule.required().max(100),
            }),
          ],
        }),
        defineField({
          name: 'contactEmail',
          title: 'Email de Contact',
          type: 'string',
          description: 'Adresse email pour les questions légales et de protection des données',
          validation: (rule) => rule.required().email().max(100),
        }),
        defineField({
          name: 'contactPhone',
          title: 'Téléphone de Contact',
          type: 'string',
          description: 'Numéro de téléphone pour les questions légales (optionnel)',
          validation: (rule) => rule.max(50),
        }),
      ],
    }),

    // Technical Information
    defineField({
      name: 'technicalInfo',
      title: 'Informations Techniques',
      type: 'object',
      description: 'Informations techniques utilisées dans la politique de confidentialité (/confidentiality)',
      fields: [
        defineField({
          name: 'hostingProvider',
          title: 'Fournisseur d\'Hébergement',
          type: 'string',
          description: 'Nom du fournisseur d\'hébergement (ex: Vercel)',
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: 'lastUpdated',
          title: 'Date de Dernière Mise à Jour',
          type: 'date',
          description: 'Date de la dernière mise à jour de la politique de confidentialité',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // Data Protection Authority
    defineField({
      name: 'dataProtectionAuthority',
      title: 'Autorité de Protection des Données',
      type: 'object',
      description: 'Informations sur l\'autorité de protection des données utilisées dans la politique de confidentialité (/confidentiality)',
      fields: [
        defineField({
          name: 'authorityName',
          title: 'Nom de l\'Autorité',
          type: 'string',
          description: 'Nom de l\'autorité de protection des données (ex: APDP - Autorité de protection des données du Togo)',
          validation: (rule) => rule.required().max(200),
        }),
        defineField({
          name: 'authorityWebsite',
          title: 'Site Web de l\'Autorité',
          type: 'url',
          description: 'URL du site web de l\'autorité de protection des données',
          validation: (rule) => rule.uri({
            allowRelative: false,
            scheme: ['http', 'https']
          }),
        }),
      ],
    }),

    // Legal References
    defineField({
      name: 'legalReferences',
      title: 'Références Légales',
      type: 'object',
      description: 'Références légales utilisées dans la politique de confidentialité (/confidentiality)',
      fields: [
        defineField({
          name: 'rgpdReference',
          title: 'Référence RGPD',
          type: 'string',
          description: 'Référence au règlement RGPD',
          initialValue: 'Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'togoleseLawReference',
          title: 'Référence Loi Togolaise',
          type: 'string',
          description: 'Référence à la loi togolaise sur la protection des données',
          initialValue: 'Loi togolaise n°2019-014 relative à la protection des données à caractère personnel',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'associationInfo.associationName',
      subtitle: 'associationInfo.legalRepresentative',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Conformité',
        subtitle: subtitle || 'Gérer les informations légales et les données de politique de confidentialité',
      };
    },
  },
});
