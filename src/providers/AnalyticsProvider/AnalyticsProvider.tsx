"use client";

import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { env } from "~/env.mjs";

export const AnalyticsProvider = () => <Analytics />;

export const UmamiAnalyticsProvider = () => {
  return env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
    <Script
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      src="https://analytics.umami.is/script.js"
      strategy="lazyOnload"
    />
  ) : null;
};
