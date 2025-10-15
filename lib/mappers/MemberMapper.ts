import { MemberDto, TeamMemberDto, MemberDetailDto, MemberImage, SocialLinks } from '@/lib/dto/MemberDto';

/**
 * Mapper service for transforming member data between different sources and DTOs
 * Follows the Single Responsibility Principle - only handles data transformation
 */
export class MemberMapper {
  /**
   * Maps Sanity member data to MemberDto
   */
  static fromSanity(sanityMember: any): MemberDto {
    // Handle both old (single name) and new (firstname + name) structures
    const fullName = sanityMember.firstname && sanityMember.name 
      ? `${sanityMember.firstname} ${sanityMember.name}`.trim()
      : sanityMember.name || '';
    
    return {
      id: sanityMember._id || sanityMember.id || '',
      name: fullName,
      role: sanityMember.role || '',
      bio: sanityMember.bio || '',
      email: sanityMember.email || '',
      phone: sanityMember.phone || '',
        memberImage: MemberMapper.getMemberImage(sanityMember.memberImage),
      socialLinks: MemberMapper.getSocialLinks(sanityMember.socialLinks),
    };
  }

  /**
   * Maps JSON member data to MemberDto
   */
  static fromJson(jsonMember: any): MemberDto {
    // Handle the actual JSON structure with name, firstname, img fields
    const fullName = `${jsonMember.firstname || ''} ${jsonMember.name || ''}`.trim();
    
    return {
      id: jsonMember.id || `${jsonMember.firstname || ''}-${jsonMember.name || ''}`.toLowerCase().replace(/\s+/g, '-'),
      name: fullName,
      role: jsonMember.role || '',
      bio: jsonMember.bio || jsonMember.presentation || '',
      email: jsonMember.email || '',
      phone: jsonMember.phone || '',
      memberImage: {
        src: jsonMember.img?.src || jsonMember.memberImage?.src || '/assets/img/default.jpg',
        alt: jsonMember.img?.alt || jsonMember.memberImage?.alt || fullName,
      },
      socialLinks: MemberMapper.getSocialLinks(jsonMember.socialLinks),
    };
  }

  /**
   * Maps Supabase member data to MemberDto
   */
  static fromSupabase(supabaseMember: any): MemberDto {
    return {
      id: supabaseMember.id || '',
      name: supabaseMember.name || '',
      role: supabaseMember.role || '',
      bio: supabaseMember.bio || '',
      email: supabaseMember.email || '',
      phone: supabaseMember.phone || '',
      memberImage: {
        src: supabaseMember.memberImage?.src || '/assets/img/default.jpg',
        alt: supabaseMember.memberImage?.alt || supabaseMember.name || '',
      },
      socialLinks: MemberMapper.getSocialLinks(supabaseMember.socialLinks),
    };
  }

  /**
   * Transforms MemberDto to TeamMemberDto for team display
   */
  static toTeamMember(member: MemberDto): TeamMemberDto {
    const nameParts = member.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    return {
      ...member,
      displayName: member.name,
      initials: this.getInitials(member.name),
      hasImage: member.memberImage.src !== '/assets/img/default.jpg' && member.memberImage.src !== '',
      hasSocialLinks: this.hasSocialLinks(member.socialLinks),
    };
  }

  /**
   * Transforms MemberDto to MemberDetailDto for detail pages
   */
  static toDetail(member: MemberDto): MemberDetailDto {
    return {
      ...member,
      fullBio: member.bio,
      contactInfo: {
        email: member.email,
        phone: member.phone,
      },
      socialProfiles: member.socialLinks || {},
    };
  }

  /**
   * Generates Sanity image URL from image reference
   */
  private static getMemberImage(memberImage: any): MemberImage {
    if (!memberImage?.asset?._ref) {
      return {
        src: '/assets/img/default.jpg',
        alt: 'Default member image',
      };
    }

    try {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ds7w4i35';
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
      
      // Extract the image ID from the reference
      const imageId = memberImage.asset._ref.replace('image-', '').replace(/-jpg$/, '').replace(/-png$/, '').replace(/-webp$/, '');
      
      // Determine file extension
      let extension = 'jpg';
      if (memberImage.asset._ref.includes('-png')) extension = 'png';
      if (memberImage.asset._ref.includes('-webp')) extension = 'webp';
      
      return {
        src: `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}.${extension}`,
        alt: memberImage.alt || 'Member profile image',
      };
    } catch (error) {
      console.error('Error generating Sanity member image URL:', error);
      return {
        src: '/assets/img/default.jpg',
        alt: 'Default member image',
      };
    }
  }

  /**
   * Extracts social links from various formats
   */
  private static getSocialLinks(socialLinks: any): SocialLinks | undefined {
    if (!socialLinks) return undefined;

    return {
      linkedin: socialLinks.linkedin || '',
      twitter: socialLinks.twitter || '',
      github: socialLinks.github || '',
      website: socialLinks.website || '',
    };
  }

  /**
   * Generates initials from full name
   */
  private static getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  }

  /**
   * Checks if member has any social links
   */
  private static hasSocialLinks(socialLinks?: SocialLinks): boolean {
    if (!socialLinks) return false;
    
    return !!(
      socialLinks.linkedin ||
      socialLinks.twitter ||
      socialLinks.github ||
      socialLinks.website
    );
  }
}
