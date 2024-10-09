'use client'
import { MyButton } from "@/components/Button"
import React from "react"
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  return (
    <div className="min-h-screen project-page">
      <div className="flex flex-col justify-center items-center gap-4 container">
        <h2 className="my-2 font-bold text-xl">Une erreur est survenue sur la route check file...</h2>
        {error.message && <p className="my-2 font-bold text-sm italic">{error.message}</p>}
        <MyButton className="mt-3" variant={'primary'} onClick={() => reset()}>Retour</MyButton>
      </div>
    </div>
  )
}