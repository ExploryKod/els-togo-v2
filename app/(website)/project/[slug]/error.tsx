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
    <div className="flex flex-col justify-center items-center gap-4 grow">
      <h2 className="my-2 font-bold text-xl">Une erreur est survenue...</h2>
      {error.message && <p className="my-2 font-bold text-sm italic">{error.message}</p>}
      <MyButton className="mt-3" variant={'primary'} onClick={() => reset()}>Retour</MyButton>
    </div>
  )
}