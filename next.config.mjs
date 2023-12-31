/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.mjs');

/** @type {import("next").NextConfig} */
const config = {
  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  experimental: {
    /* logging: {
      fullUrl: true,
      level: 'verbose',
    }, */
    serverActions: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  reactStrictMode: true,
};

export default config;
