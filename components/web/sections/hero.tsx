import Image from 'next/image';

type SectionText = {
  pretitle?: string;
  title?: string;
  text?: string;
  buttonData?: {
    url: string;
    text: string;
  };
};

type HeroProps = {
  sections?: {
    intro?: SectionText[];
  };
};

export default function Hero({ sections }: HeroProps) {
  return (
    <section id="hero" className="image-text">
      <div className="container">
        <div className="mainRow row">
          {/* Text Wrapper */}
          <div className="col-12 col-lg-6 image-text__textWrapper">
            {sections?.intro?.length ? (
              sections.intro.map((sectionText, index) => (
                <div key={index}>
                  <div className="pre-title">
                    {sectionText.pretitle
                      ? sectionText.pretitle
                      : 'Association ELS - Togo'}
                  </div>
                  <div className="title">
                    {sectionText.title
                      ? sectionText.title
                      : "Nous aidons à développer l'éducation, les loisirs et la santé."}
                  </div>
                  <p className="els-text-lg">
                    {sectionText.text
                      ? sectionText.text
                      : `Nous pensons que chacun a le droit d'être éduqué, soigné et protégé.
                        Nous apportons notre pierre pour que chacun puisse vivre dans un environnement sain.`}
                  </p>
                  <a
                    href={
                      sectionText.buttonData?.url
                        ? sectionText.buttonData.url
                        : '#contact'
                    }
                    className="button"
                  >
                    {sectionText.buttonData?.text
                      ? sectionText.buttonData.text
                      : "Je veux m'engager"}
                  </a>
                </div>
              ))
            ) : (
              <div>
                <div className="pre-title">Association ELS - Togo</div>
                <div className="title">
                  Nous aidons à développer l&apos;éducation, les loisirs et la santé.
                </div>
                <p className="els-text-lg">
                  Nous pensons que chacun a le droit d&apos;être éduqué, soigné et
                  protégé. Nous apportons notre pierre pour que chacun puisse
                  vivre dans un environnement sain.
                </p>
                <a href="#contact" className="button">
                  Je veux m&apos;engager
                </a>
              </div>
            )}
          </div>

          {/* Image Wrapper */}
          <div className="col-12 col-lg-6 image-text__imageWrapper ps-lg-5">
            {/* Optionally, use Next.js Image for optimization */}
            <Image
              src="/assets/img/livre-ecole.jpg"
              alt="école"
              width={500} // You can adjust the width and height as needed
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
