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
                  <p className="mx-auto text-center">
                    {sectionText.title || 'Une équipe engagée pour rendre le monde meilleur'}
                  </p>
                  <p className="text-center">{sectionText.text || ''}</p>
                </div>
              ))}
          </div>

          <div className="text-cards-horizon__cardsWrapper col-12">
            {members.length > 0 &&
              members.map((member, index) => {
                const teamMember = MemberMapper.toTeamMember(member);
                return (
                <div key={index} data-typebtn="team-btn" className="box modal-open-btn">
                  <div className="top-bar"></div>
                  <div className="content">
                    <Image
                      src={teamMember.memberImage.src}
                      alt={teamMember.memberImage.alt}
                      width={150}
                      height={150}
                      priority={index < 3} // Priority for first 3 members
                    />
                    <strong>{teamMember.displayName}</strong>
                    <p>{teamMember.email}</p>
                  </div>
                  <div className="box-footer">
                    <p>{teamMember.role}</p>
                  </div>
                </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
