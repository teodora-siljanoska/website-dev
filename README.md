This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It works in conjunction with the Strapi project at https://github.com/layershift/website-cms

# Deployment

This Next.js app is deployed to Vercel. Deployments are performed via GitHub integration; Vercel deploys automatically whenever commits are made to this repo:
* [`production`](https://github.com/layershift/website/tree/production) - this is the **LIVE** website at www.layershift.com with CMS at content.layershift.com
* [`main`](https://github.com/layershift/website/tree/main) - this is the preview website at website.stage.town with CMS at content.stage.town
* [`dev`](https://github.com/layershift/website/tree/dev) - this is the preview website (used by Sols for development) at website.sols.stage.town with CMS at content.sols.stage.town
* any other branch - Vercel creates a preview deployment on a generated subdomain

Vercel has a "per user" pricing model, which means **only specified users (currently `dransome`, `acranson` and `MonikaMSols`) have authority to deploy.**

## Securing preview sites

Preview sites are kept out of public view via "[Vercel Authentication](https://vercel.com/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication)" - we use the "Standard Protection" option, which means:
* Vercel users
* Anyone via a [sharable link](https://vercel.com/docs/security/deployment-protection/methods-to-bypass-deployment-protection/sharable-links)

## Production

Create a pull request to the [`production`](https://github.com/layershift/website/tree/production) branch. In general, this should only be done by Damien or Andrew due to the Vercel user rules. It should **NEVER** be done by Sols outside of explicit instruction by Layershift: Layershift should always preview and verify changes via the preview website (dev branch whenever possible), and take responsibility for deploying to the live site themselves.

## The deployment process

In either case (preview or production), Vercel builds the site (`next build`) and only deploys the updated code if the build is successful (if the build errors, the deployment fails, and the site continues to run with the previous version of the code).

The build and operation of the site requires some environment variables to be defined. **These are ingested at build time**, so if they need to be changed, the site also needs to be rebuilt.

### Environment variables

These are documented in [`.env.example`](https://github.com/layershift/website/blob/main/.env.example), **but are defined via the Vercel dashboard**.

Each environment variable can be applied to any/all of 3 environments (development, preview, production). Nearly all of the variables need different values for preview vs. production (we don't currently use development at all), so please take care when defining them. As some variables are different for Sols dev branch, you should create variables for "preview" environment but click "select custom branch" and set it to "dev" for Sols staging environment. If a variable is set on preview without selecting a branch, it applies to all preview branches **except when** there is a variable created on the custom branch with an identical name, as the more specific branch takes precedence.
Please also remember to mark any API keys / other sensitive data as "sensitive" when adding the environment variable in Vercel's dashboard.

**ANY NEWLY DEFINED ENVIRONMENT VARIABLES MUST BE ADDED TO [`.env.example`](https://github.com/layershift/website/blob/main/.env.example) TOGETHER WITH AN APPROPRIATE COMMENT AND EXAMPLE VALUE**. Yes, project documentation is your responsibility to maintain. Yes, even you.
