'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // For client-side routing in Next.js
import Image from 'next/image';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // Toggle the menu-opened class on the body
    if (newMenuState) {
      document.body.classList.add('menu-opened');
      console.log('Menu opened - body classes:', document.body.className);
      console.log('Menu state:', newMenuState);
    } else {
      document.body.classList.remove('menu-opened');
      console.log('Menu closed - body classes:', document.body.className);
      console.log('Menu state:', newMenuState);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-opened');
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-opened');
    };
  }, []);

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 499,
            display: 'block'
          }}
        />
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: '#fff',
            zIndex: 500,
            padding: '20px',
            transform: 'translateX(0)',
            transition: 'transform 500ms cubic-bezier(0.645, 0.045, 0.355, 1)',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Mobile Menu Links */}
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0, 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <li>
                <Link href="/#mission" passHref onClick={closeMenu}>
                  <span 
                    data-hash="#mission"
                    style={{
                      display: 'block',
                      padding: '15px 0',
                      color: '#333',
                      fontSize: '18px',
                      textDecoration: 'none',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    Notre mission
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#qui-sommes-nous" passHref onClick={closeMenu}>
                  <span 
                    data-hash="#qui-sommes-nous"
                    style={{
                      display: 'block',
                      padding: '15px 0',
                      color: '#333',
                      fontSize: '18px',
                      textDecoration: 'none',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    Qui sommes-nous ?
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#nos-projets" passHref onClick={closeMenu}>
                  <span 
                    data-hash="#nos-projets"
                    style={{
                      display: 'block',
                      padding: '15px 0',
                      color: '#333',
                      fontSize: '18px',
                      textDecoration: 'none',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    Nos projets
                  </span>
                </Link>
              </li>
            </ul>

            {/* Mobile Contact Button */}
            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <Link href="/#contact" passHref onClick={closeMenu}>
                <span 
                  data-hash="#contact"
                  style={{
                    display: 'block',
                    padding: '15px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textAlign: 'center',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Nous contacter
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
      
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
                    <Link href="/#mission" passHref onClick={closeMenu}>
                      <span data-hash="#mission">Notre mission</span>
                    </Link>
                  </li>
                  <li className="menu__nav-item">
                    <Link href="/#qui-sommes-nous" passHref onClick={closeMenu}>
                      <span data-hash="#qui-sommes-nous">Qui sommes-nous ?</span>
                    </Link>
                  </li>
                  <li className="menu__nav-item">
                    <Link href="/#nos-projets" passHref onClick={closeMenu}>
                      <span data-hash="#nos-projets">Nos projets</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Button */}
              <div className="col-auto ms-lg-5">
                <Link href="/#contact" passHref onClick={closeMenu}>
                  <span data-hash="#contact" className="button button--secondary">
                    Nous contacter
                  </span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Burger Menu Button for Mobile */}
          <div className="burger-menu col-auto">
            <button 
              className="burger-menu__button" 
              aria-label="Menu"
              onClick={toggleMenu}
            >
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
    </>
  );
};

export default Header;
