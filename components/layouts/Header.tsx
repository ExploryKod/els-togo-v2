'use client'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'
import Image from 'next/image'
import brand from '@/public/corporate/brand_bgno.webp'
import LangSwitcher from '../LangSwitcher'
import { MyButton } from '../Button';

interface Props {
  locale: string
}
export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('')
  const paths = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuOpenClass, setMenuOpenClass] = useState<string>("");
  const [scrolled, setScrolled] = useState<boolean>(true);

  // Datas
  const isHome = paths === `/${locale}`
  const navLinks = [
    // { href: `/${locale}/#about`, label: 'Mon_parcours' },
    { href: isHome ? "#skills" : `/${locale}/#skills`, label: 'Mes_compétences' },
    { href: isHome ? "#projects" : `/${locale}/#projects`, label: 'Mes_projets' },
  ];

  const ToggleBurgerMenu = () => {
   
    if(!isMenuOpen) {
      setIsMenuOpen(!isMenuOpen);
      setMenuOpenClass("hamburger-toggle") 
    } else {
      setIsMenuOpen(!isMenuOpen);
      setMenuOpenClass("")
    }
  }

  const scrollHeader = () => { 
    if (window.scrollY >= 20) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHeader);

    return () => {
      window.removeEventListener('scroll', scrollHeader);
    };
  }, []);



    return (
        <>
        <header className={`max-[375px]:mb-5  h-[96px] ${scrolled && !isMenuOpen ? "bg-secondary" : "bg-background"} transition duration-400 ease-in top-0 z-max fixed p-4 w-full`}>
          <nav className={`flex justify-between items-center gap-4 mx-auto max-w-screen-2xl max-container`}>
            <a href="/" className={`px-4 max-[375px]:w-[75%]
            ${scrolled ? "rounded-lg bg-white hover:opacity-75": "bg-transparent"} font-bold text-3xl`}>
                <Image
                  src={brand}
                  alt="Amaury Franssen"
                  blurDataURL="blur"
                  placeholder="blur" 
                />
            </a>

          <div className={`max-xl:grow flex justify-end lg:justify-center`}>
            <div className="lg:hidden max-[375px]:hidden">
              <LangSwitcher />
            </div>
              <ul className={`justify-end px-16 py-2  flex xl:justify-center items-center gap-16 max-lg:hidden`}>
                {navLinks.map((item) => (
                  <li key={item.label} className={`whitespace-nowrap`}>
                    <a
                      href={item.href}
                      className={`linear-anim-link ${scrolled ? "text-white":"text-button"} cursor-pointer ${scrolled ? "linear-color-light" : "linear-color-primary"}`}
                    >
                      {t(item.label)}
                    </a>
                  </li>
                ))}
              </ul>
          </div>
    
         
            <div className="flex justify-end gap-2 max-lg:hidden wide:mr-24 font-medium text-lg">
              <LangSwitcher scrolled={scrolled} />
              <a href={"mailto:amauryfranssen@gmail.com"}>
                <MyButton variant={`${scrolled ? "light" : "primary"}`} rounded size='medium'>{t('header_end_btn')}</MyButton>
              </a>
            </div>
          
            <div
              className={`hidden max-lg:block cursor-pointer grid place-content-center h-10 ${menuOpenClass}`}

              onClick={ToggleBurgerMenu}
            >
                   <div
                  className={`before:absolute after:absolute before:content-[''] after:content-[''] 
                    ${scrolled && !isMenuOpen ? "bg-white before:bg-white after:bg-white" : "bg-button before:bg-button after:bg-button"} 
                    rounded-full before:rounded-full after:rounded-full 
                    w-10 before:w-10 after:w-10 h-[6px] before:h-[6px] after:h-[6px] transition-all before:transition-all after:transition-all before:-translate-y-4 after:translate-y-4 duration-150 before:duration-150 after:duration-150`}
                  >
                  </div>
                  
            </div>
          </nav>
          <LangSwitcher classNames="min-[375px]:hidden my-2 flex justify-center items-center"/>
        </header>

        <div className={`ease-in ${isMenuOpen ? 
                        "fixed top-[96px] bottom-0 left-0 right-0 lg:hidden z-sub-header translate-y-0 opacity-1 event-auto" : 
                        "static -translate-y-[100%] h-0 opacity-0 event-none"}`}>
            <nav className={`h-full transition-translate duration-300 delay-100 ${isMenuOpen  ? 
                          "pt-[96px] bg-background-secondary translate-y-0 opacity-1 event-auto" : 
                          "-translate-y-[100%] opacity-0 event-none"}`}>
              <ul className="flex flex-col gap-5 lg:hidden px-5 py-5 h-full">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-lg text-slate-gray leading-normal"
                    >
                      {t(item.label)}
                    </a>
                  </li>
                ))}
                <li className="mt-5">
                <a
                      href={"mailto:amauryfranssen@gmail.com"}
                      className="text-lg text-slate-gray leading-normal"
                    >
                      <MyButton rounded size='medium'>{t('header_end_btn')}</MyButton>
                    </a>
                </li>
              </ul>
          </nav>
        </div>
        
      </>
    )
}
