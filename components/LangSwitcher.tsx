'use client'
import { capitalize } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import React, { ReactNode, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import en from '/public/flags/en.webp'
import fr from '/public/flags/fr.webp'
import es from '/public/flags/es.webp'
import { FiGlobe } from 'react-icons/fi'
import { MyButton } from './Button'


interface LangSwitcherProps {
  scrolled?: boolean
  classNames?: string
}
interface Option {
  country: string
  code: string
  flag: StaticImageData
}

const LangSwitcher = ({scrolled, classNames="flex justify-center items-center"}: LangSwitcherProps) => {
 
  const pathname = usePathname()
  const urlSegments = useSelectedLayoutSegments()

  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false)

  const options: Option[] = [
    { country: 'English', code: 'en' , flag: en }, 
    { country: 'Français', code: 'fr', flag: fr },
    { country: 'Español', code: 'es', flag: es },
  ]

  const currentLanguage = pathname && pathname.split('/').length > 1 
    ? options.find(lang => lang.code === pathname.split('/')[1])
    : null

  return (
    <div className={`${classNames}`}>
      <div className='relative'>
        <MyButton
          variant={`${scrolled ? "light" : "primary"}`}
          className='inline-flex justify-between items-center gap-3 rounded-full w-full text-destructive'
          size='medium'
          onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
          onBlur={() => setIsOptionsExpanded(false)}
        >
          <span className='lg:inline max-[375px]:inline hidden ml-2'>
          {currentLanguage ? capitalize(currentLanguage.country) : "Français"}
          </span>
          {currentLanguage ?    <Image
                      width={15}
                      height={15}
                        src={currentLanguage.flag}
                        alt={currentLanguage.country}
                      /> : <FiGlobe />}
        </MyButton>
        {isOptionsExpanded && (
          <div className='right-0 absolute bg-secondary shadow-lg mt-2 rounded-md w-full origin-top-right'>
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              {options.map(lang => {
                return (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}/${urlSegments.join('/')}`}
                  >
                    <button
                      lang={lang.code}
                      onMouseDown={e => {
                        e.preventDefault()
                      }}
                      className={`flex gap-2 w-full px-4 py-2 text-left text-sm hover:bg-background-secondary ${
                        pathname === `/${lang.code}`
                          ? 'font-bold text-white hover:text-primary hover:bg-background-secondary'
                          : 'text-white hover:text-primary'
                      }`}
                    >
                      <Image width={20} height={20} src={lang.flag} alt={lang.country} />
                      <span className={`max-[375px]:inline hidden lg:inline`}>{capitalize(lang.country)}</span>
                    </button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LangSwitcher
