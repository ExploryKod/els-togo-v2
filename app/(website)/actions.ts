"use server";

import { draftMode } from "next/headers";

export async function page() {
  "use server";
  await Promise.allSettled([
    draftMode().disable(),
    // Simulate a delay to show the loading state
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);
}
