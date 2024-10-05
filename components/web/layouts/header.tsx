import React from 'react';
import Link from 'next/link'; // For client-side routing in Next.js
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="mainHeader">
      <div className="container">
        <div className="align-items-center g-lg-0 mainRow row">
          {/* Logo Section */}
          <div className="col-auto logo">
            <Link href="/#homepage" passHref>
              <div data-hash="#homepage">
                <Image
                  src="/assets/img/logo-els.jpg" 
                  alt="Logo ELS-TOGO"
                  width={50}
                  height={50} 
                />
              </div>
            </Link>
          </div>

          {/* Navigation Section */}
          <nav className="col nav">
            <div className="g-lg-0 nav-and-cta row">
              {/* Menu Links */}
              <div className="col-auto me-lg-3">
                <ul className="header-menu">
                  <li className="menu__nav-item">
                    <Link href="/#mission" passHref>
                      <span data-hash="#mission">Notre mission</span>
                    </Link>
                  </li>
                  <li className="menu__nav-item">
                    <Link href="/#qui-sommes-nous" passHref>
                      <span data-hash="#qui-sommes-nous">Qui sommes-nous ?</span>
                    </Link>
                  </li>
                  <li className="menu__nav-item">
                    <Link href="/#nos-projets" passHref>
                      <span data-hash="#nos-projets">Nos projets</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Button */}
              <div className="col-auto ms-lg-5">
                <Link href="/#contact" passHref>
                  <span data-hash="#contact" className="button button--secondary">
                    Nous contacter
                  </span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Burger Menu Button for Mobile */}
          <div className="burger-menu col-auto">
            <button className="burger-menu__button" aria-label="Menu">
              <svg viewBox="0 0 100 100">
                <path
                  className="line line1"
                  d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                />
                <path className="line line2" d="M 20,50 H 80" />
                <path
                  className="line line3"
                  d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
