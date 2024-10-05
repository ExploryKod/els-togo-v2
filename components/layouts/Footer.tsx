import { useTranslations } from 'next-intl'
import TransitionLink from '../TransitionLink'

export const Footer = ({locale}: any) => {
  const t = useTranslations('')

  return <div className="relative bg-button mt-5 p-0 w-full min-h-[30px]">
      <div className="flex flex-row items-center gap-4 mx-auto px-5 py-4 max-w-screen-2xl">
        <div><span className="text-sm text-white">Portfolio &copy; 2024 - All rights reserved</span></div>
        <div className="flex justify-center items-center grow">
          <a className="text-sm text-white hover:underline" href={`/${locale}/credits`}>{t('footer_link_credits')}</a>
        
        </div>
      </div>
  </div>
}
