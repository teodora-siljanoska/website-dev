/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true, // redirects handled manually in middleware for /kb/
  reactStrictMode: true,
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(','),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_REMOTE_PATTERN_HOSTNAME,
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  async headers() {
    const cspHeader = `
      connect-src 'self' ${process.env.NEXT_PUBLIC_CONNECT_URL};
      script-src 'self' ${process.env.NEXT_PUBLIC_SCRIPT_URL} 'unsafe-inline' 'unsafe-eval';
      frame-src ${process.env.NEXT_PUBLIC_FRAMESRC_URL};
      style-src 'self' fonts.googleapis.com https: 'unsafe-inline';
      img-src ${process.env.NEXT_PUBLIC_IMG_URL} 'self' data:;
      font-src 'self' ${process.env.NEXT_PUBLIC_FONT_URL} data:;
      object-src 'none';
      base-uri 'self' https://stats.layershift.com;
      form-action 'self';
      frame-ancestors https://stats.layershift.com;
      block-all-mixed-content;
      upgrade-insecure-requests;
    `;

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/renew/:id(\\d{6,7})',
        destination:
          'https://go.layershift.com/redirect.php?action=renew&id=:id',
        permanent: true,
      },
      {
        source: '/upgrade/:id(\\d{6,7})',
        destination:
          'https://go.layershift.com/redirect.php?action=upgrade&id=:id',
        permanent: true,
      },
      {
        source: '/order/:id(\\d{6,7})',
        destination:
          'https://go.layershift.com/redirect.php?action=order&id=:id',
        permanent: true,
      },
      {
        source: '/invoice/:id(\\d{6,7})',
        destination:
          'https://go.layershift.com/redirect.php?action=invoice&id=:id',
        permanent: true,
      },
      {
        source: '/terminate/:id(\\d{2,5})',
        destination:
          'https://go.layershift.com/redirect.php?action=terminate&id=:id',
        permanent: true,
      },
      {
        source: '/managed-cloud-vps',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/enscale',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/jelastic',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/jelastic-paas',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/ehlomail-enterprise-email',
        destination: '/ehlomail-business-email',
        permanent: true,
      },
      {
        source: '/hosting',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/hosting/fully-managed-dedicated',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/hosting/multi-server-clusters',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/hosting/ssl-certificates',
        destination: '/ssl-certificates',
        permanent: true,
      },
      {
        source: '/support',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/solutions',
        destination: '/',
        permanent: true,
      },
      {
        source: '/solutions/agency-hosting',
        destination: '/agency-optimised-vps',
        permanent: true,
      },
      {
        source: '/solutions/startup-hosting',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/solutions/magento-hosting',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/solutions/enterprise-hosting',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/solutions/saas-hosting',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/mylayershift',
        destination: 'https://control.layershift.com/',
        permanent: true,
      },
      {
        source: '/fully-managed-hosting',
        destination: '/what-to-expect',
        permanent: true,
      },
      {
        source: '/about/care-packs',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about/infrastructure',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about/why-layershift',
        destination: '/why-us',
        permanent: true,
      },
      {
        source: '/about/testimonials-and-reviews',
        destination: '/',
        permanent: true,
      },
      {
        source: '/hosting/jelastic-paas',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/hosting/domain-names',
        destination: '/domain-registration',
        permanent: true,
      },
      {
        source: '/hosting/cloud-vps',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/legal/PrivacyandCookiesPolicy.pdf',
        destination: '/legal',
        permanent: true,
      },
      {
        source: '/hosting-services/cloud-vps-hosting',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/about/testimonials',
        destination: '/',
        permanent: true,
      },
      {
        source: '/hosting-services/jelastic-cloud-hosting',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/hosting/jelastic-cloud',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/hosting/jelastic-php-cloud',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/legal/ManagedHostingServiceLevelAgreement.pdf',
        destination: '/legal',
        permanent: true,
      },
      {
        source: '/hosting-services/jelastic-cloud',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/hosting-services/ssl-certificates',
        destination: '/ssl-certificates',
        permanent: true,
      },
      {
        source: '/hosting-services/cloud-vps-extreme-hosting',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/hosting/private-jelastic-paas',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/hosting-services/dedicated-hosting',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/sgpromo/blog/cloud_vps_offer',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/hosting/try-jelastic-free',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/hosting/traffic-guard',
        destination: '/content-delivery-network',
        permanent: true,
      },
      {
        source: '/about/fully-managed',
        destination: '/what-to-expect',
        permanent: true,
      },
      {
        source: '/legal/EnscaleServiceLevelAgreement.pdf',
        destination: '/legal',
        permanent: true,
      },
      {
        source: '/cloudcontrol',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/hosting/dedicated',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/legal/JelasticCloudHostingServiceLevelAgreement.pdf',
        destination: '/legal',
        permanent: true,
      },
      {
        source: '/legal/SecurityPolicy.pdf',
        destination: '/legal',
        permanent: true,
      },
      {
        source: '/website-builder',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/hosting-services/complex-hosting',
        destination: '/enscale-paas-hosting',
        permanent: true,
      },
      {
        source: '/hosting/cloud-vps-extreme',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/kb/cloud-vps/email/how-to-configure-plesk-mail',
        destination: '/kb/managed-vps/email/how-to-configure-plesk-mail',
        permanent: true,
      },
      {
        source: '/solutions/shared-hosting-provider',
        destination: '/fully-managed-vps',
        permanent: true,
      },
      {
        source: '/directdebit',
        destination: 'https://pay.gocardless.com/AL00006GA7VK81',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/kb/',
        destination: `${process.env.NEXT_PUBLIC_KB_URL}/kb/`,
      },
      {
        source: '/kb/:path*',
        destination: `${process.env.NEXT_PUBLIC_KB_URL}/kb/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'layershift',
    project: 'website',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
