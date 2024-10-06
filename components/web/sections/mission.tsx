import Image from 'next/image';

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
}

const Mission: React.FC<MissionProps> = ({ sections, cards }) => {
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

        <div className="row value-cards">
          {cards.mission.length > 0 ? (
            cards.mission.map((card, index) => (
              <div key={index} className="col-lg-4">
                <div className="card">
                  <div className="card-image">
                    <Image
                      src={card.imgSource || '/assets/img/icons/5236.jpg'}
                      alt={card.imgAltText || 'Personnes tenant des feuilles'}
                      width={300}
                      height={200} // Adjust dimensions as needed
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <div className="my-3">{card.text}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Default cards if no cards data is provided */}
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-image">
                    <Image src="/assets/img/icons/5236.jpg" alt="personnes tenant des feuilles" width={300} height={200} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Dignité</h5>
                    <p className="card-text">
                      Nous respectons chaque personne et groupe que nous aidons. Nous préférons ainsi accompagner plutôt qu&apos;assister au nom de la dignité.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-image">
                    <Image src="/assets/img/icons/5236.jpg" alt="mains assemblant un puzzle" width={300} height={200} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Amour</h5>
                    <p className="card-text">Nos engagements se font grâce à la formidable force que nous donne l&apos;amour.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-5 card">
                  <div className="card-image">
                    <Image src="/assets/img/icons/5236.jpg" alt="mains assemblant un puzzle" width={300} height={200} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Franchise</h5>
                    <p className="card-text">
                      Nous valorisons l&apos;authenticité et l&apos;intégrité. Nous mettons un point d&apos;;;honneur à être transparent avec nos bénévoles, nos donateurs et nos parties prenantes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-5 card">
                  <div className="card-image">
                    <Image src="/assets/img/icons/5236.jpg" alt="mains assemblant un puzzle" width={300} height={200} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Partage</h5>
                    <p className="card-text">
                      Chaque mission est l&apos;occasion de partager des choses ou des mots avec autrui peu importe d&apos;où il vient. Ce partage s&apos;incarne dans l&apos;échange, la rencontre, le don.
                    </p>
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
