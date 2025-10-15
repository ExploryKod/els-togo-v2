import { MissionCardDto, MissionCardDisplayDto, MissionCardImage } from '@/lib/dto/MissionCardDto';
import { getSanityImageUrl } from '@/sanity/lib/imageUrl';

/**
 * Mapper service for transforming mission card data between different sources and DTOs
 * Follows the Single Responsibility Principle - only handles data transformation
 */
export class MissionCardMapper {
  /**
   * Maps Sanity mission card data to MissionCardDto
   */
  static fromSanity(sanityMissionCard: any): MissionCardDto {
    return {
      id: sanityMissionCard._id || sanityMissionCard.id || '',
      title: sanityMissionCard.title || '',
      text: sanityMissionCard.text || '',
      iconImage: MissionCardMapper.getMissionCardImage(sanityMissionCard.iconImage),
      order: sanityMissionCard.order || 0,
    };
  }

  /**
   * Maps JSON mission card data to MissionCardDto
   */
  static fromJson(jsonMissionCard: any): MissionCardDto {
    return {
      id: jsonMissionCard.id || `${jsonMissionCard.title || ''}-${Date.now()}`,
      title: jsonMissionCard.title || '',
      text: jsonMissionCard.text || '',
      iconImage: {
        src: jsonMissionCard.imgSource || jsonMissionCard.iconImage?.src || '/assets/img/icons/5236.jpg',
        alt: jsonMissionCard.imgAltText || jsonMissionCard.iconImage?.alt || jsonMissionCard.title || 'Mission card icon',
      },
      order: jsonMissionCard.order || 0,
    };
  }

  /**
   * Transforms a MissionCardDto into a MissionCardDisplayDto for display
   */
  static toDisplay(missionCard: MissionCardDto): MissionCardDisplayDto {
    const hasImage = !!missionCard.iconImage.src && missionCard.iconImage.src !== '/assets/img/icons/5236.jpg';

    return {
      ...missionCard,
      displayOrder: missionCard.order,
      hasImage,
    };
  }

  /**
   * Helper to get mission card image with fallback
   */
  private static getMissionCardImage(image: any): MissionCardImage {
    if (!image) {
      return { 
        src: '/assets/img/icons/5236.jpg', 
        alt: 'Default mission card icon' 
      };
    }
    
    const src = image.asset?._ref ? getSanityImageUrl(image.asset._ref) : image.src || '/assets/img/icons/5236.jpg';
    const alt = image.alt || 'Mission card icon';
    
    return { src, alt };
  }
}
