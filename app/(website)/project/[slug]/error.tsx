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
    <div className="flex flex-col justify-center items-center min-h-[var(--content-min-h)] gap-4">
      <h2 className="my-2 font-bold text-xl">Loading...</h2>
      {error.digest && <p className="my-2 font-bold text-sm italic">{error.digest}</p>}
      <MyButton variant={'primary'} className="" onClick={() => reset()}>Retour</MyButton>
    </div>
  )
}