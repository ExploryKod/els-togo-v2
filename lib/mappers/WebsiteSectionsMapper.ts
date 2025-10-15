import { WebsiteSectionsDto, WebsiteSectionsDisplayDto, SectionText, ContactInfo } from '@/lib/dto/WebsiteSectionsDto';

/**
 * Mapper service for transforming website sections data between different sources and DTOs
 * Follows the Single Responsibility Principle - only handles data transformation
 */
export class WebsiteSectionsMapper {
  /**
   * Maps Sanity website sections data to WebsiteSectionsDto
   */
  static fromSanity(sanitySections: any): WebsiteSectionsDto {
    return {
      id: sanitySections._id || sanitySections.id || 'website-sections',
      heroSection: sanitySections.heroSection ? [sanitySections.heroSection] : [],
      projectSection: sanitySections.projectSection ? [sanitySections.projectSection] : [],
      missionSection: sanitySections.missionSection ? [sanitySections.missionSection] : [],
      teamSection: sanitySections.teamSection ? [sanitySections.teamSection] : [],
      contactSection: sanitySections.contactSection ? [sanitySections.contactSection] : [],
      contactInfo: sanitySections.contactInfo ? [sanitySections.contactInfo] : [],
    };
  }

  /**
   * Maps JSON website sections data to WebsiteSectionsDto
   */
  static fromJson(jsonSections: any): WebsiteSectionsDto {
    return {
      id: jsonSections.id || 'website-sections',
      heroSection: jsonSections.heroSection || jsonSections.intro || [],
      projectSection: jsonSections.projectSection || jsonSections.project || [],
      missionSection: jsonSections.missionSection || jsonSections.mission || [],
      teamSection: jsonSections.teamSection || jsonSections.members || [],
      contactSection: jsonSections.contactSection || jsonSections.contact || [],
      contactInfo: jsonSections.contactInfo || jsonSections.contacts || [],
    };
  }

  /**
   * Transforms a WebsiteSectionsDto into a WebsiteSectionsDisplayDto for display
   */
  static toDisplay(sections: WebsiteSectionsDto): WebsiteSectionsDisplayDto {
    return {
      ...sections,
      hasHeroData: sections.heroSection.length > 0,
      hasProjectData: sections.projectSection.length > 0,
      hasMissionData: sections.missionSection.length > 0,
      hasTeamData: sections.teamSection.length > 0,
      hasContactData: sections.contactSection.length > 0,
      hasContactInfo: sections.contactInfo.length > 0,
    };
  }

  /**
   * Creates fallback sections data when no data is available
   */
  static createFallback(): WebsiteSectionsDto {
    return {
      id: 'fallback-sections',
      heroSection: [
        {
          pretitle: 'Association ELS - Togo',
          title: 'Nous promouvons l\'éducation, les loisirs et la santé',
          text: 'Nous pensons que chacun a le droit d\'être éduqué, soigné et protégé. Nous apportons notre pierre pour que chacun puisse vivre dans un environnement sain.',
          buttonData: {
            url: '#contact',
            text: 'S\'engager avec nous',
          },
        },
      ],
      projectSection: [
        {
          pretitle: 'Nos projets',
          text: 'Découvrez nos projets communautaires axés sur l\'autonomisation, l\'éducation et l\'environnement.',
        },
      ],
      missionSection: [
        {
          pretitle: 'Notre Mission & nos valeurs',
          text: 'Nous pensons que chacun a le droit d\'être éduqué, soigné et protégé.',
        },
      ],
      teamSection: [
        {
          pretitle: 'Notre équipe',
          title: 'Une équipe engagée pour rendre le monde meilleur',
          text: 'Voici notre équipe dynamique et engagée qui travaille chaque jour pour faire une différence dans le monde.',
        },
      ],
      contactSection: [
        {
          title: 'Nous contacter',
          text: 'Si vous voulez vous engager avec nous, nous serons très heureux de vous accueillir: contactez-nous par email ou téléphone.',
        },
      ],
      contactInfo: [
        {
          address: '123 Rue de Exemple, Lomé, Togo',
          schedules: 'Lundi - Vendredi: 8h - 17h',
          phone: '(+228) 90 00 00 00',
          email: 'contact@example.com',
        },
      ],
    };
  }
}
