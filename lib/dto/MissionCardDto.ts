export interface MissionCardImage {
  src: string;
  alt: string;
}

export interface MissionCardDto {
  id: string;
  title: string;
  text: string;
  iconImage: MissionCardImage;
  order: number;
}

export interface MissionCardDisplayDto extends MissionCardDto {
  displayOrder: number;
  hasImage: boolean;
}
