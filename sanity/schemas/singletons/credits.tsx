import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export default defineType({
  name: 'credits',
  title: 'Crédits',
  icon: DocumentTextIcon,
  type: 'document',
  description: 'Gestion des crédits d\'images et ressources utilisées sur le site. Ce singleton alimente la page /credits.',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Titre de la page',
      type: 'string',
      description: 'Titre principal de la page de crédits',
      initialValue: 'Crédits',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageDescription',
      title: 'Description de la page',
      type: 'text',
      description: 'Description courte de la page de crédits',
      initialValue: 'Remerciements et crédits pour les images et ressources utilisées sur ce site.',
    }),
    defineField({
      name: 'imageCredits',
      title: 'Crédits d\'Images',
      type: 'array',
      description: 'Liste des crédits pour les images utilisées',
      of: [
        defineField({
          name: 'imageCredit',
          title: 'Crédit d\'Image',
          type: 'object',
          fields: [
            defineField({
              name: 'imageName',
              title: 'Nom de l\'image',
              type: 'string',
              description: 'Nom ou description de l\'image',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'source',
              title: 'Source',
              type: 'string',
              description: 'Plateforme source (ex: Unsplash, Pexels, etc.)',
              options: {
                list: [
                  { title: 'Unsplash', value: 'unsplash' },
                  { title: 'Pexels', value: 'pexels' },
                  { title: 'Pixabay', value: 'pixabay' },
                  { title: 'Freepik', value: 'freepik' },
                  { title: 'Autre', value: 'other' },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'authorName',
              title: 'Nom de l\'auteur',
              type: 'string',
              description: 'Nom de l\'auteur de l\'image',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'authorUrl',
              title: 'Lien vers l\'auteur',
              type: 'url',
              description: 'URL du profil de l\'auteur (ex: https://unsplash.com/@username)',
              validation: (rule) => rule.uri({
                allowRelative: false,
                scheme: ['http', 'https'],
              }),
            }),
            defineField({
              name: 'imageUrl',
              title: 'Lien vers l\'image',
              type: 'url',
              description: 'URL directe vers l\'image',
              validation: (rule) => rule.uri({
                allowRelative: false,
                scheme: ['http', 'https'],
              }),
            }),
            defineField({
              name: 'license',
              title: 'Licence',
              type: 'string',
              description: 'Type de licence (ex: Unsplash License, Creative Commons, etc.)',
              initialValue: 'Unsplash License',
            }),
            defineField({
              name: 'usedOn',
              title: 'Utilisée sur',
              type: 'string',
              description: 'Page ou section où l\'image est utilisée',
              placeholder: 'ex: Page d\'accueil, Section équipe, etc.',
            }),
          ],
          preview: {
            select: {
              title: 'imageName',
              subtitle: 'authorName',
              source: 'source',
            },
            prepare(selection) {
              const { title, subtitle, source } = selection;
              return {
                title: title || 'Image sans nom',
                subtitle: `${subtitle || 'Auteur inconnu'} • ${source || 'Source inconnue'}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'otherCredits',
      title: 'Autres Crédits',
      type: 'array',
      description: 'Autres crédits (icônes, polices, etc.)',
      of: [
        defineField({
          name: 'otherCredit',
          title: 'Autre Crédit',
          type: 'object',
          fields: [
            defineField({
              name: 'resourceName',
              title: 'Nom de la ressource',
              type: 'string',
              description: 'Nom de la ressource (ex: Icône, Police, etc.)',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'authorName',
              title: 'Auteur/Créateur',
              type: 'string',
              description: 'Nom de l\'auteur ou créateur',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'authorUrl',
              title: 'Lien vers l\'auteur',
              type: 'url',
              description: 'URL du profil de l\'auteur',
            }),
            defineField({
              name: 'resourceUrl',
              title: 'Lien vers la ressource',
              type: 'url',
              description: 'URL de la ressource',
            }),
            defineField({
              name: 'license',
              title: 'Licence',
              type: 'string',
              description: 'Type de licence',
            }),
            defineField({
              name: 'usedOn',
              title: 'Utilisée sur',
              type: 'string',
              description: 'Page ou section où la ressource est utilisée',
            }),
          ],
          preview: {
            select: {
              title: 'resourceName',
              subtitle: 'authorName',
            },
            prepare(selection) {
              const { title, subtitle } = selection;
              return {
                title: title || 'Ressource sans nom',
                subtitle: subtitle || 'Auteur inconnu',
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'footerNote',
      title: 'Note de pied de page',
      type: 'text',
      description: 'Note générale en bas de page (optionnel)',
      placeholder: 'ex: Tous les crédits sont respectés selon les licences respectives.',
    }),
  ],
  preview: {
    select: {
      title: 'pageTitle',
      subtitle: 'pageDescription',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Crédits',
        subtitle: subtitle || 'Gestion des crédits d\'images et ressources',
      };
    },
  },
});
