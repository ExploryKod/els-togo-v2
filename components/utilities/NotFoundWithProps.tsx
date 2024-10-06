"use client"
import React from 'react'
import { MyButton } from '../Button'

type TextMessage = {text: string, text2: string, color?: string}
interface NotFoundComponentProps {
  classNames?: string
  error?: Partial<TextMessage>
  message: Partial<TextMessage>
  subject?: Partial<TextMessage>
  isTextColumn?: boolean
  website?: string
  github?: string
  isError?: boolean
}

const NotFoundWithProps: React.FC<NotFoundComponentProps > = ({
  classNames = "min-h-[100vh] p-[40px] flex gap-4 flex-col items-center",
  website = "",
  github = "",
  isError = true,
  error= {text: "", color: ""},
  message ={text: "", color: ""},
  subject = {text: "", color: ""},
  isTextColumn = false,
  ...props
}) => {
   
  return (
    <div className={classNames} {...props}>
      <div className={`min-w-[360px] border border-2 border-secondary rounded-lg`}>
          <div className="my-[20px] px-4 py-2">
            {isError ? <h1 className={`font-bold text-4xl text-center text-${error.color || "primary"}`}>{error.text || "404"}</h1> : null}
            <p className={`${isTextColumn && "flex flex-col gap-2"} my-5 text-2xl text-center text-${message.color}`}>
              <span>{message.text}</span>
              {message.text2 ? <span>{message.text2}</span> : null}
              <span className={`${subject.text ? "inline" : "hidden"} font-bold text-${subject.color}`}>{subject.text}</span>
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-4 items-center bg-background-secondary px-4 py-2 rounded-b-lg">
            <a className="" href={`/`}>
              <MyButton className="" rounded variant={"secondary"} size='medium'>
                <span className="before:z-lg">Retour</span>
              </MyButton>
            </a>
          </div>
        
      </div>

    </div>
  )
}

export default NotFoundWithProps
