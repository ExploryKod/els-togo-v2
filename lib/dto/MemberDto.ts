/**
 * Data Transfer Object for Member data
 * This DTO represents the standardized member structure used throughout the application
 */

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface MemberImage {
  src: string;
  alt: string;
}

export interface MemberDto {
  id: string;
  name: string;
  role: string;
  bio?: string;
  email?: string;
  phone?: string;
  memberImage: MemberImage;
  socialLinks?: SocialLinks;
}

/**
 * DTO for Team-specific member data
 * Extends the base MemberDto with team-specific properties
 */
export interface TeamMemberDto extends MemberDto {
  displayName: string;
  initials: string;
  hasImage: boolean;
  hasSocialLinks: boolean;
}

/**
 * DTO for Member detail page
 * Extends the base MemberDto with additional detail properties
 */
export interface MemberDetailDto extends MemberDto {
  fullBio?: string;
  contactInfo: {
    email?: string;
    phone?: string;
  };
  socialProfiles: SocialLinks;
}
