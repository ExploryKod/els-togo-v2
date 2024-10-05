"use client"
import React, { PropsWithChildren, useEffect } from 'react';


interface SectionText {
  title?: string;
  text?: string;
}

interface ContactInfo {
  address: string;
  schedules: string;
  phone: string;
  email: string;
}

type ContactProps = {
  sections: {
    contact: SectionText[];
  };
  contacts: ContactInfo[];
} & PropsWithChildren

function Contact({ sections, contacts, children }: ContactProps) {

  useEffect(() => {
    
    const contactForm = document.querySelector('.contact-container__email');
    if (contactForm) {
      const emaildecode = (e: any) => {
        let email = atob(e.dataset.email); 
        e.href = 'mailto:' + email;
        e.innerHTML = email;
      };

      const emailTag = document.querySelector('.contact-email__link');
      if (emailTag) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              emaildecode(entry.target); 
            }
          });
        });
        observer.observe(emailTag);
      }
    }
  }, []);

  return (
    <section id="contact" className="my-5 main__contact-section main__section">
      <div className="container">
        <div className="mb-2 col-12 row">
          {sections.contact.length > 0 &&
            sections.contact.map((sectionText, index) => (
              <React.Fragment key={index}>
                <h2 className="pre-title pre-title--centered">
                  {sectionText.title || 'Nous contacter'}
                </h2>
                <div className="my-2">
                  <p className="els-text--centered els-text--secondary els-text-lg">
                    {sectionText.text ||
                      `Si vous voulez vous engager avec nous, nous serons très heureux de vous accueillir: 
                      contactez-nous par email ou téléphone.`}
                  </p>
                </div>
              </React.Fragment>
            ))}
        </div>

        <div className="row">
  
          <div className="col-12 col-lg-6">
            <div id="map" className="map">
                {children}
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="justify-content-center contact-container row">
              <div className="contact-container__email">
                {contacts.length > 0 &&
                  contacts.map((contact, index) => (
                    <div key={index}>
                      <span className="pb-3 els-text-lg contact-address els-text">
                        {contact.address}
                      </span>
                      <span className="pb-3 els-text-lg contact-schedules els-text">
                        Horaires d’ouverture : <br />
                        {contact.schedules}
                      </span>
                      <a href={`tel:${contact.phone}`} className="pb-3 els-text-lg contact-tel els-text">
                        {contact.phone || '(+000) 00 00 00 00'}
                      </a>
                    </div>
                  ))}
                <div className="els-text-lg contact-email-text els-text">
                  <a
                    className="contact-email__link"
                    href="#"
                    data-email="ZWxzdG9nbzJAZ21haWwuY29t" 
                  >
                    [email-hidden]
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
