import { HeaderData } from './MegaMenu';
import MegaMenuicon from './assets/megaMenu.png';
import whyUs from './assets/whyUs.png';
import whoWeAre from './assets/whoWeAre.png';
import meetTheTeam from './assets/meetTheTeam.png';
import premiumWordPress from './assets/premiumWordPress.png';
import agencyHosting from './assets/agencyHosting.png';
import managedVPS from './assets/managedVPS.png';
import jelastic from './assets/jelastic.png';
import ehloMail from './assets/ehloMail.png';
import cdn from './assets/cdn.png';
import ssl from './assets/ssl.png';
import domains from './assets/domains.png';
import resources from './assets/resources.png';
import userVoice from './assets/userVoice.png';
import webTools from './assets/webTools.png';

import whatToExpect from './assets/whatToExpect.png';

import arrowIcon from './assets/rightArrow.png';

export const headerData: HeaderData = {
  categories: [
    {
      name: 'Domains & SSL',
      subitems: [
        {
          cta: 'Agency Wordpress Plans',
          to: 'Learn more',
          description: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
          image: MegaMenuicon,
          icon: arrowIcon,
          link: '#',
        },
        {
          cta: 'Cloud VPS',
          to: 'Learn more',
          description: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
          image: MegaMenuicon,
          icon: arrowIcon,
          link: '#',
        },
        {
          cta: 'eCommerce (Jelastic)',
          to: 'Learn more',
          description: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
          image: MegaMenuicon,
          icon: arrowIcon,
          link: '#',
        },
        {
          cta: 'Business Email',
          to: 'Learn more',
          description: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
          image: MegaMenuicon,
          icon: arrowIcon,
          link: '#',
        },
      ],
    },
    {
      name: 'Hosting Solutions',
      subitems: [
        {
          cta: 'Application Hosting',
          to: 'Learn more',
          description: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
          image: MegaMenuicon,
          icon: arrowIcon,
          link: '#',
        },
        {
          cta: 'Cloud VPS',
          to: 'Learn more',
          description: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum',
          image: MegaMenuicon,
          icon: arrowIcon,
          link: '#',
        },
      ],
    },
  ],

  navLinks: [
    { name: 'Why Us', href: 'linkHome', current: false, newTab: false },
    {
      name: 'Hosting Solutions',
      href: 'linkProducts',
      current: false,
      newTab: false,
    },
    {
      name: 'Domains & SSL',
      href: 'linkServices',
      current: false,
      newTab: false,
    },
    {
      name: 'Security Solutions',
      href: 'linkShop',
      current: false,
      newTab: false,
    },

    { name: 'Blog', href: '/main-blog', current: false, newTab: false },
  ],
};

export const headerDataWhyUs: HeaderData = {
  categories: [
    {
      name: 'Why Us',
      subitems: [
        {
          cta: 'Why Us',
          to: 'Learn more',
          description: 'Discover Our Unique Approach and Values',
          image: whyUs,
          icon: arrowIcon,
          link: '/why-us',
        },
        {
          cta: 'Who We are',
          to: 'Learn more',
          description: "Explore Layershift's 20+ Year Journey of Excellence",
          image: whoWeAre,
          icon: arrowIcon,
          link: '/who-we-are',
        },
        {
          cta: 'What to Expect',
          to: 'Learn more',
          description: 'Setting Expectations for Exceptional Service',
          image: whatToExpect,
          icon: arrowIcon,
          link: '/what-to-expect',
        },
        {
          cta: 'Meet the Team',
          to: 'Learn more',
          description: "Meet the people behind Layershift's success",
          image: meetTheTeam,
          icon: arrowIcon,
          link: '/meet-the-team',
        },
      ],
    },
  ],
};

export const headerDataSolutions: HeaderData = {
  categories: [
    {
      name: 'Hosting Solutions',
      subitems: [
        {
          cta: 'High Traffic WordPress',
          to: 'Learn more',
          description:
            'Scale to meet user demand: ideal for WordPress and E-Commerce',
          image: premiumWordPress,
          icon: arrowIcon,
          link: '/high-traffic-wordpress',
        },
        {
          cta: 'Agency Optimised VPS',
          to: 'Learn more',
          description:
            'The all-in-one package for top performing WordPress agencies',
          image: agencyHosting,
          icon: arrowIcon,
          link: '/agency-hosting',
        },
        {
          cta: 'Managed VPS Hosting',
          to: 'Learn more',
          description:
            'Customise your VPS for optimal security and performance',
          image: managedVPS,
          icon: arrowIcon,
          link: '/managed-vps',
        },
        {
          cta: 'Enscale PaaS Hosting',
          to: 'Learn more',
          description: 'Deploy Auto-scaling server clusters in just 7 clicks',
          image: jelastic,
          icon: arrowIcon,
          link: '/enscale-paas-hosting',
        },
        {
          cta: 'EhloMail',
          to: 'Learn more',
          description: 'Secure GDPR compliant email platform, hosted in the UK',
          image: ehloMail,
          icon: arrowIcon,
          link: '/ehlo-mail',
        },
      ],
    },
  ],
};

export const headerDataAdditionalProducts: HeaderData = {
  categories: [
    {
      name: 'AdditionalProducts',
      subitems: [
        {
          cta: 'Domain Registration',
          to: 'Learn more',
          description: 'Claim your online identity with a TLD domain name',
          image: ehloMail,
          icon: arrowIcon,
          link: '/domain-registration',
        },
        {
          cta: 'Domain Transfer',
          to: 'Learn more',
          description: 'Seamless renewal and transfer for your domain name',
          image: cdn,
          icon: arrowIcon,
          link: '/domain-transfer',
        },
        {
          cta: 'SSL Certificates',
          to: 'Learn more',
          description: 'Protect your apps with trusted SSL certificates',
          image: ssl,
          icon: arrowIcon,
          link: '/ssl-certificates',
        },
      ],
    },
  ],
};

export const headerDataSupport: HeaderData = {
  categories: [
    {
      name: 'Security Solutions',
      subitems: [
        {
          cta: 'CDN/WAF',
          to: 'Learn more',
          description:
            'Ensure fast, secure content delivery worldwide using our CDN',
          image: resources,
          icon: arrowIcon,
          link: '/cdn-waf',
        },
        {
          cta: 'Enscale BitNinja',
          to: 'Learn more',
          description:
            'State-of-the-art: proactive full-stack server protection',
          image: userVoice,
          icon: arrowIcon,
          link: '/bit-ninja',
        },
        {
          cta: 'Imunify360',
          to: 'Learn more',
          description:
            'Detect, clean, and protect websites against malware infections',
          image: webTools,
          icon: arrowIcon,
          link: '/imunify-360',
        },
      ],
    },
  ],
};
export default headerData;
