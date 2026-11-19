# SDS Documentation Nuxt Layer

A Nuxt 4 layer for SEI documentation sites.

## Setup

Use a Node.js version supported by `package.json`; `.nvmrc` pins the version used in CI. Install the dependencies:

```bash
npm install
```

## Working on your layer

Your layer is at the root of this repository, it is exactly like a regular Nuxt project, except you can publish it on NPM.

The `.playground` directory should help you on trying your layer during development.

Running `npm run dev` will prepare and boot `.playground` directory, which imports the layer.

Run the release checks before publishing:

```bash
npm run check
```

This prepares Nuxt, type-checks the application and server, runs ESLint and integration tests, and builds the playground for production. The integration tests install the packed layer into an isolated consumer, then verify rendered content, styles, navigation, sitemap URLs under a base path, missing-page 404s, and content-service failures.

TypeScript is held at 6.x because Vue and ESLint tooling require the compiler API absent from TypeScript 7. `vue-tsc` is pinned to 3.3.13 because 3.3.14 incorrectly reports `.value` errors for non-ref template bindings. Recheck both compatibility constraints before upgrading.

Nuxt Icon 2.6.3 still registers its DevTools panel using the deprecated `addCustomTab` API, producing `NDT_DEP_0005` during Nuxt preparation. This is an upstream development-tool integration warning, not a site runtime failure. The compatibility API remains supported throughout DevTools 4; Nuxt Icon must migrate before DevTools 5. See the [DevTools migration guide](https://nuxt.com/modules/devtools/module-migration#ndt_dep_0005).

Run `npm audit` before deployment as well. Functional checks do not clear dependency advisories. The current dependency tree still reports advisories for Zod 3 through Nuxt Content and minimatch 10 through Nitro's archiver dependencies. Compatible upstream fixes or explicit security risk acceptance are required before production approval; forcing Zod 4 or downgrading Nuxt Content to v2 is not a safe automated fix.

## Distributing your layer

Your Nuxt layer is shaped exactly the same as any other Nuxt project, except you can publish it on NPM.

To do so, you only have to check if `files` in `package.json` are valid, then run:

```bash
npm publish --access public
```

Once done, your users will only have to run:

```bash
npm install @cmu-sei/sds-documentation-site
```

Then add the dependency to their `extends` in `nuxt.config`:

```ts
export default defineNuxtConfig({
  extends: ['@cmu-sei/sds-documentation-site']
})
```

The package requires Nuxt 4.6.4 or newer within Nuxt 4 and Vue 3.5.45 or newer within Vue 3. Only layer source and public assets are published; the playground, tests, and release scripts are excluded.

## Sitemap configuration

Set the public site URL in the consuming application's `app/app.config.ts`:

```ts
export default defineAppConfig({
  sitemap: {
    hostname: 'https://docs.example.com',
  },
})
```

Also set `site.url` in `nuxt.config.ts` (or `NUXT_SITE_URL`) for modules using Nuxt Site Config. A root hostname uses the application's `app.baseURL` in sitemap links; an explicit hostname path takes precedence. The hostname must be an absolute HTTP(S) URL.

## Link validation

The layer includes internal link validation for generated sites. It is disabled by default so upgrading the layer does not change existing builds.

Enable it when generating a downstream application in CI:

```bash
SDS_LINK_CHECK=true npm run generate
```

Generation exits with a nonzero status when a rendered page contains a broken internal route or fragment, or a route fails to prerender (including an unconfigured or invalid sitemap). Remote URLs are not fetched, and trailing-slash style is not enforced, so third-party availability and URL formatting do not make pull requests fail. Add this command to each downstream application's pull request workflow and make that workflow a required status check before merging.

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Or statically generate it with:

```bash
npm run generate
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Google Analytics

We use the `nuxt-gtag` package to integrate with Google Tag Manager. See their [documentation](https://www.npmjs.com/package/nuxt-gtag) for details.

Instead of hard-coding your Google tag ID in your Nuxt configuration, you can set your desired option in your project's `.env` file, leveraging automatically replaced public runtime config values by matching environment variables at runtime.

```bash
# Overwrites the `gtag.id` module option
NUXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX
```