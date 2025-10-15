import Image from 'next/image';
import { MissionCardDto } from '@/lib/dto/MissionCardDto';
import { MissionCardMapper } from '@/lib/mappers/MissionCardMapper';

interface SectionText {
  pretitle?: string;
  title?: string;
  text?: string;
  button?: {
    url: string;
    text: string;
  };
}

interface Card {
  imgSource: string;
  imgAltText: string;
  title: string;
  text: string;
}

interface MissionProps {
  sections: {
    mission: SectionText[];
  };
  cards: {
    mission: Card[];
  };
  missionCards?: MissionCardDto[];
}

const Mission: React.FC<MissionProps> = ({ sections, cards, missionCards }) => {
  return (
    <section id="mission" className="mission-section">
      <div className="container">
        <div className="row">
          {sections.mission.length > 0 &&
            sections.mission.map((sectionText, index) => (
              <div key={index} className="text-center col-md-12">
                <h2 className="pre-title pre-title--centered pre-title--light">
                  {sectionText.pretitle || 'Notre Mission & nos valeurs'}
                </h2>
                <div className="my-5 text-white">{sectionText.text || 'Découvrez nos valeurs'}</div>
              </div>
            ))}
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {missionCards && missionCards.length > 0 ? (
            missionCards.map((missionCard, index) => {
              const displayCard = MissionCardMapper.toDisplay(missionCard);
              return (
                <div key={missionCard.id} className="mission-card group relative bg-white rounded-xl transition-all duration-500 overflow-hidden group-hover:scale-105">
                  <div 
                    className="mission-card-content"
                    style={{
                      boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                      background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.85) 50%, rgba(226, 232, 240, 0.75) 100%)'
                    }}
                  >
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-b-lg"></div>
                    
                    {/* Card content */}
                    <div className="p-6 flex flex-col items-center text-center h-full">
                      {/* Icon/Image */}
                      <div className="relative mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-primary transition-all duration-500 ease-out group-hover:shadow-lg bg-white p-2">
                          <Image
                            src={displayCard.iconImage.src}
                            alt={displayCard.iconImage.alt}
                            width={64}
                            height={64}
                            priority={index === 0}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                          />
                        </div>
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out"></div>
                      </div>
                      
                      {/* Card info */}
                      <div className="space-y-3 flex-grow flex flex-col justify-center">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-500 ease-out">
                          {displayCard.title}
                        </h3>
                        
                        <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-500 ease-out">
                          {displayCard.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : cards.mission.length > 0 ? (
            cards.mission.map((card, index) => (
              <div key={index} className="mission-card group relative bg-white rounded-xl transition-all duration-500 overflow-hidden group-hover:scale-105">
                <div 
                  className="mission-card-content"
                  style={{
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.85) 50%, rgba(226, 232, 240, 0.75) 100%)'
                  }}
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-b-lg"></div>
                  
                  {/* Card content */}
                  <div className="p-6 flex flex-col items-center text-center h-full">
                    {/* Icon/Image */}
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-primary transition-all duration-500 ease-out group-hover:shadow-lg bg-white p-2">
                        <Image
                          src={card.imgSource || '/assets/img/icons/5236.jpg'}
                          alt={card.imgAltText || 'Personnes tenant des feuilles'}
                          width={64}
                          height={64}
                          priority={index === 0}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      </div>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out"></div>
                    </div>
                    
                    {/* Card info */}
                    <div className="space-y-3 flex-grow flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-500 ease-out">
                        {card.title}
                      </h3>
                      
                      <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-500 ease-out">
                        {card.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Default cards if no cards data is provided */}
              <div className="mission-card group relative bg-white rounded-xl transition-all duration-500 overflow-hidden group-hover:scale-105">
                <div 
                  className="mission-card-content"
                  style={{
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.85) 50%, rgba(226, 232, 240, 0.75) 100%)'
                  }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-b-lg"></div>
                  <div className="p-6 flex flex-col items-center text-center h-full">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-primary transition-all duration-500 ease-out group-hover:shadow-lg bg-white p-2">
                        <Image src="/assets/img/icons/5236.jpg" alt="personnes tenant des feuilles" width={64} height={64} priority />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out"></div>
                    </div>
                    <div className="space-y-3 flex-grow flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-500 ease-out">Dignité</h3>
                      <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-500 ease-out">
                        Nous respectons chaque personne et groupe que nous aidons. Nous préférons ainsi accompagner plutôt qu'assister au nom de la dignité.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mission-card group relative bg-white rounded-xl transition-all duration-500 overflow-hidden group-hover:scale-105">
                <div 
                  className="mission-card-content"
                  style={{
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.85) 50%, rgba(226, 232, 240, 0.75) 100%)'
                  }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-b-lg"></div>
                  <div className="p-6 flex flex-col items-center text-center h-full">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-primary transition-all duration-500 ease-out group-hover:shadow-lg bg-white p-2">
                        <Image src="/assets/img/icons/5236.jpg" alt="mains assemblant un puzzle" width={64} height={64} />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out"></div>
                    </div>
                    <div className="space-y-3 flex-grow flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-500 ease-out">Amour</h3>
                      <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-500 ease-out">
                        Nos engagements se font grâce à la formidable force que nous donne l'amour.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mission-card group relative bg-white rounded-xl transition-all duration-500 overflow-hidden group-hover:scale-105">
                <div 
                  className="mission-card-content"
                  style={{
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.85) 50%, rgba(226, 232, 240, 0.75) 100%)'
                  }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-b-lg"></div>
                  <div className="p-6 flex flex-col items-center text-center h-full">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-primary transition-all duration-500 ease-out group-hover:shadow-lg bg-white p-2">
                        <Image src="/assets/img/icons/5236.jpg" alt="mains assemblant un puzzle" width={64} height={64} />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out"></div>
                    </div>
                    <div className="space-y-3 flex-grow flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-500 ease-out">Franchise</h3>
                      <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-500 ease-out">
                        Nous valorisons l'authenticité et l'intégrité. Nous mettons un point d'honneur à être transparent avec nos bénévoles, nos donateurs et nos parties prenantes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mission-card group relative bg-white rounded-xl transition-all duration-500 overflow-hidden group-hover:scale-105">
                <div 
                  className="mission-card-content"
                  style={{
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
                    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.85) 50%, rgba(226, 232, 240, 0.75) 100%)'
                  }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-b-lg"></div>
                  <div className="p-6 flex flex-col items-center text-center h-full">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-primary transition-all duration-500 ease-out group-hover:shadow-lg bg-white p-2">
                        <Image src="/assets/img/icons/5236.jpg" alt="mains assemblant un puzzle" width={64} height={64} />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out"></div>
                    </div>
                    <div className="space-y-3 flex-grow flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-500 ease-out">Partage</h3>
                      <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-500 ease-out">
                        Chaque mission est l'occasion de partager des choses ou des mots avec autrui peu importe d'où il vient. Ce partage s'incarne dans l'échange, la rencontre, le don.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Mission;
