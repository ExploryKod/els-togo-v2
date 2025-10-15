import "../globals.css";
import "../globals.scss";
import ConditionalClerkProvider from '@/components/ConditionalClerkProvider'
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditing } from 'next-sanity'
import type { Metadata } from "next";
import Head from "next/head";
import {
  toPlainText,
} from "next-sanity";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import type { SettingsQueryResult } from "@/sanity.types";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Header from "@/components/web/layouts/header";

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });
  
  const title = data?.title || "ELS TOGO";
  const description = data?.description ? toPlainText(data.description) : "Une association togolaise basé à Tsévié";
  const ogImage = data?.ogImage ? resolveOpenGraphImage(data.ogImage) : "";
  const metadataBase = data?.ogImage?.metadataBase ? new URL(data.ogImage.metadataBase) : undefined;
  
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

async function Footer() {
  const data = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
  });
  const footer = data?.footer || [];

  return (
    <footer className="els-footer">
         <div className="container">
            <div className="mainRow row">
                <div className="col-12 col-lg-6">
                    <div className="text--light text-xs">
                        <span>&copy;</span> 2024 Els-Togo
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <ul className="footer-list">
                        <li className="text--light text-xs modal-open-btn"><a href="/legal-notices">Mentions légales</a></li>
                        <li className="text--light text-xs modal-open-btn"><a href="/confidentiality">Politique de confidentialité</a></li>
                        <li className="text--light text-xs modal-open-btn"><a href="/credits">Crédits</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConditionalClerkProvider>
    <html lang="fr" className={`${inter.variable} bg-white text-black scroll-smooth with-scss boostrap-active`} suppressHydrationWarning >
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
          <Suspense>
            <Header />
          </Suspense>
          <main>{children}</main>
          <Suspense>
            <Footer />
          </Suspense>
        <SpeedInsights />
        <VisualEditing />
      </body>
    </html>
    </ConditionalClerkProvider>
  );
}
