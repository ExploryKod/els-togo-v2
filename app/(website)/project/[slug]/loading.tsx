'use client'
import { MyButton } from "@/components/Button"
import React from "react"
 
export default function Loading({

}: {
}) {

  return (
    <div  className="flex flex-col justify-center items-center min-h-screen">
      <div className={`min-w-[360px] max-w-[800px] border border-2 border-secondary rounded-lg`}>
        <div className="my-[20px] px-4 py-2">
          <p className="font-bold text-4xl text-center text-primary">En cours de chargement...</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 bg-background-secondary px-4 py-2 rounded-b-lg">
          <p>Merci pour votre patience.</p>
        </div>
      
    </div>

  </div>
  )
}