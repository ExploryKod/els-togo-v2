import Image from 'next/image';
import { MemberDto, TeamMemberDto } from '@/lib/dto/MemberDto';
import { MemberMapper } from '@/lib/mappers/MemberMapper';

interface SectionText {
  pretitle?: string;
  title?: string;
  text?: string;
}

interface TeamProps {
  sections: {
    members: SectionText[];
  };
  members: MemberDto[];
}

const Team: React.FC<TeamProps> = ({ sections, members }) => {
  return (
    <section id="qui-sommes-nous" className="team-section my-5 text-cards-horizon">
      <div className="container">
        <div className="mainRow row">
          <div className="text-cards-horizon__textWrapper col-12">
            {sections.members.length > 0 &&
              sections.members.map((sectionText, index) => (
                <div key={index}>
                  <div className="pre-title pre-title--centered">
                    {sectionText.pretitle || 'Notre équipe'}
                  </div>
                  <h2 className="mx-auto text-center">
                    {sectionText.title || 'Une équipe engagée pour rendre le monde meilleur'}
                  </h2>
                  <p className="text-center">{sectionText.text || ''}</p>
                </div>
              ))}
          </div>

          <div className="col-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center items-stretch">
              {members.length > 0 &&
                members.map((member, index) => {
                  const teamMember = MemberMapper.toTeamMember(member);
                  return (
                    <div 
                      key={index} 
                      className="team-card group relative bg-white rounded-xl transition-all duration-500 overflow-hidden group-hover:scale-105 h-full flex flex-col"
                      style={{
                        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                        background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.85) 50%, rgba(226, 232, 240, 0.75) 100%)'
                      }}
                    >
                      {/* RECTO - Front Side */}
                      <div className="team-card-recto absolute inset-0 w-full h-full transition-opacity duration-500 group-hover:opacity-0 flex flex-col">
                        {/* Top accent bar */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-b-lg"></div>
                        
                        {/* Card content */}
                        <div className="p-6 flex flex-col items-center text-center h-full flex-grow">
                          {/* Profile image */}
                          <div className="relative mb-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-primary transition-all duration-500 ease-out group-hover:shadow-lg">
                              <Image
                                src={teamMember.memberImage.src}
                                alt={teamMember.memberImage.alt}
                                width={96}
                                height={96}
                                priority={index < 4}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                              />
                            </div>
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out"></div>
                          </div>
                          
                          {/* Member info */}
                          <div className="space-y-2 flex-grow flex flex-col justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-500 ease-out">
                              {teamMember.displayName}
                            </h3>
                            
                            <p className="text-sm font-medium text-primary group-hover:text-primary-600 transition-colors duration-500 ease-out">
                              {teamMember.role}
                            </p>
                            
                            {teamMember.email && (
                              <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-500 ease-out">
                                {teamMember.email}
                              </p>
                            )}
                          </div>
                          
                          {/* Social links */}
                          {teamMember.hasSocialLinks && teamMember.socialLinks && (
                            <div className="mt-4 flex space-x-3 justify-center">
                              {teamMember.socialLinks.linkedin && (
                                <a 
                                  href={teamMember.socialLinks.linkedin} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-primary transition-all duration-500 ease-out hover:scale-110 hover:rotate-3 transform"
                                >
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                  </svg>
                                </a>
                              )}
                              {teamMember.socialLinks.twitter && (
                                <a 
                                  href={teamMember.socialLinks.twitter} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-primary transition-all duration-500 ease-out hover:scale-110 hover:-rotate-3 transform"
                                >
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                  </svg>
                                </a>
                              )}
                              {teamMember.socialLinks.github && (
                                <a 
                                  href={teamMember.socialLinks.github} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-primary transition-all duration-500 ease-out hover:scale-110 hover:rotate-3 transform"
                                >
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                  </svg>
                                </a>
                              )}
                              {teamMember.socialLinks.website && (
                                <a 
                                  href={teamMember.socialLinks.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-primary transition-all duration-500 ease-out hover:scale-110 hover:-rotate-3 transform"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* VERSO - Back Side */}
                      <div className="team-card-verso absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col">
                        {/* Top accent bar */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-b-lg"></div>
                        
                        {/* Description content */}
                        <div className="p-6 flex flex-col items-center justify-center text-center h-full flex-grow">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-500 ease-out">
                              {teamMember.displayName}
                            </h3>
                            
                            <div className="w-16 h-1 bg-primary mx-auto rounded group-hover:w-20 transition-all duration-500 ease-out"></div>
                            
                            <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-500 ease-out">
                              {teamMember.bio || "A passionate team member dedicated to making a difference."}
                            </p>
                            
                            {teamMember.email && (
                              <p className="text-xs text-gray-500 mt-4 group-hover:text-gray-700 transition-colors duration-500 ease-out">
                                {teamMember.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
