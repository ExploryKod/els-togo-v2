import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

export interface Slide {
    id: number
    data: {
        src?: string
        thumb?: string
    }
    alt: string
    width?: number
    height?: number
    src: any
}

type Props = {
  slide: Slide
  classNames?: string
}

export const FancySlide = ({slide, classNames}: Props) => {

    return (
        <div
            className={classNames}
            key={slide.id}
            data-fancybox="gallery"
            data-src={slide.data?.src ? slide.data.src : ""}
            data-thumb-src={slide.data?.thumb ? slide.data.thumb : ""}
          >
            <Image
              alt={slide.alt ? slide.alt : " "}
              src={slide.src ? slide.src : "https://lipsum.app/id/61/200x150"}
              width={slide.width ? slide.width : 0}
              height={slide.height ? slide.height : 0}
            />
          </div>
    )
}