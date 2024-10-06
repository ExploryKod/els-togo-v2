// FILE: /components/TransitionLink.tsx

"use client";

import { useRouter } from "next/navigation";
import { animatePageOut } from "@/components/animation/transition";

export default function TransitionLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    animatePageOut(href, router);
  };

  return (
    <button
      className="border-[1px] hover:bg-black p-4 border-black rounded-xl hover:text-neutral-100 cursor-pointer"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}