'use client'
import { capitalize } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { FiSun } from 'react-icons/fi'
import { useOnClickOutside } from 'usehooks-ts'
import { MyButton } from './Button'

export default function ThemeSwitch() {
  const t = useTranslations('')
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false) // New state to control dropdown visibility
  const { setTheme, resolvedTheme, themes, theme } = useTheme()
  const ref = useRef(null)
  useEffect(() => setMounted(true), [])
  useOnClickOutside(ref, () => setIsOpen(false))
  if (!mounted)
    return (
      <MyButton
        size='small'
        type='button'
        className='inline-flex justify-between items-center gap-3 w-fit min-w-[95px] text-destructive'
        id='options-menu'
        aria-expanded={isOpen}
        onClick={() => {}}
      >
        <span className='ml-2'>{t('Theme')}</span>
        <FiSun />
      </MyButton>
    )

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div ref={ref} className='inline-block relative text-left'>
      <MyButton
        size='small'
        type='button'
        className='inline-flex justify-between items-center gap-3 w-full min-w-[95px] text-destructive'
        id='options-menu'
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <span className='ml-2'>{t('Theme')}</span>
        <FiSun />
      </MyButton>
      {isOpen && (
        <div className='right-0 absolute bg-dropdown shadow-lg mt-2 rounded-md w-full origin-top-right'>
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {themes.map(themeItem => {
              return (
                <button
                  key={themeItem}
                  onClick={() => {
                    setTheme(themeItem)
                    setIsOpen(false)
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-dropdownHover ${
                    themeItem === theme
                      ? 'bg-selected text-primary hover:bg-selected'
                      : 'text-secondary'
                  }`}
                >
                  {capitalize(themeItem)}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
