import { gql } from '@apollo/client';
import HeroBlockQuery from '@blocks/HeroBlock/query';
import HomepageFormBlockQuery from '@blocks/HomepageFormBlock/query';
import RequirementsFormBlockQuery from '@blocks/RequirementsFormBlock/query';
import AboutHeroBlockQuery from '@blocks/AboutHeroBlock/query';
import SignUpBlockQuery from '@blocks/SignUpBlock/query';
import MarqeeBlockQuery from '@blocks/MarqueeBlock/query';
import TestimonialCardBlockQuery from '@blocks/TestimonialCardBlock/query';
import ButtonBlockQuery from '@blocks/ButtonBlock/query';
import AccordionCardBlock from '@blocks/AccordionCardBlock/query';
import ImageWithTitleBlockQuery from '@blocks/ImageWithTitleBlock/query';
import CallToActionBlockQuery from '@blocks/CallToActionBlock/query';
import LeftTitleRightDescriptionBlockQuery from '@blocks/LeftTitleRightDescriptionBlock/query';
import StepsBlockQuery from '@blocks/StepsBlock/query';
import CircledLeftImageBlockQuery from '@blocks/CircledLeftImageBlock/query';
import CircledRightImageBlockQuery from '@blocks/CircledRightImageBlock/query';
import BenefitsBlockQuery from '@blocks/BenefitsBlock/query';
import TitledTabsBlockQuery from '@blocks/TitledTabsBlock/query';
import FileBlockQuery from '@blocks/FileBlock/query';
import TitleBlockQuery from '@blocks/TitleBlock/query';
import HeroBlogBlockQuery from '@blocks/HeroBlogBlock/query';
import DescriptionBlockQuery from '@blocks/DescriptionBlock/query';
import ImageBlockQuery from '@blocks/ImageBlock/query';
import CenteredDescBlockQuery from '@blocks/CenteredDescBlock/query';
import ButtonsBlockQuery from '@blocks/ButtonBlock/query';
import TestimonialSliderBlockQuery from '@blocks/TestimonialSliderBlock/query';
import SpacingBlockQuery from '@blocks/SpacingBlock/query';
import KeyFeaturesBlockQuery from '@blocks/KeyFeaturesBlock/query';
import SmallPricingBlockQuery from '@blocks/SmallPricingBlock/query';
import SellingPointBlockQuery from '@blocks/SellingPointsBlock/query';
import AccordionPlusBlockQuery from '@blocks/AccordionPlusBlock/query';
import TeamSliderBlockQuery from '@blocks/TeamSliderBlock/query';
import ManagedVpsBlockQuery from '@blocks/ManagedVpsBlock/query';
import ResourcesBlockQuery from '@blocks/ResourcesBlock/query';
import FaqBlockQuery from '@blocks/FAQBlock/query';
import TabPricingBlockQuery from '@blocks/TabPricingBlock/query';
import CheckCardBlockQuery from '@blocks/CheckCardBlock/query';
import ContactUsFormBlockQuery from '@blocks/ContactUsFormBlock/query';
import LeftImageRightTextBlockQuery from '@blocks/LeftImageRightTextBlock/query';
import { ArticlesBlogQuery } from '@blocks/ArticlesBlogBlock/query';
import BreadcrumbsBlockQuery from '@blocks/BreadcrumbsBlock/query';
import DomainSearchBlockQuery from '@blocks/DomainSearchBlock/query';
import DomainsNameBlockQuery from '@blocks/DomainsNameBlock/query';
import TimelineBlockQuery from '@blocks/TimelineBlock/query';
import FaqListBlockQuery from '@blocks/FaqListBlock/query';
import BannerBgImageBlockQuery from '@blocks/BannerBgImageBlock/query';
import BannerBlockQuery from '@blocks/BannerBlock/query';
import BannerTealHomeBlockQuery from '@blocks/BannerTealHomeBlock/query';
import PlansPricingBlockQuery from '@blocks/PlansPricingBlock/query';
import BannerLiliacHomeBlockQuery from '@blocks/BannerLiliacHomeBlock/query';
import SmallDomainCardBlockQuery from '@blocks/SmallDomainCardBlock/query';
import PerformanceHostingBlockQuery from '@blocks/PerformanceHostingBlock/query';
import VpsCardBlockQuery from '@blocks/VpsCardBlock/query';
import MeetTheTeamBlockQuery from '@blocks/MeetTheTeamBlock/query';
import InfoCardsBlockQuery from '@blocks/InfoCardsBlock/query';
import CircleImageBlockQuery from '@blocks/CircleImageBlock/query';
import IconBannerBlockQuery from '@blocks/IconBannerBlock/query';
import NewHeroBlockQuery from '@blocks/NewHeroBlock/query';
import ContactBlockQuery from '@blocks/ContactBlock/query';
import LeftIconImageImageBlockQuery from '@blocks/LeftIconImageBlock.tsx/query';
import AgencyHostingVpsBlockQuery from '@blocks/AgencyHostingVpsBlock/query';
import TransferDomainBlockQuery from '@blocks/TransferDomainBlock/query';
import EhloMailBlockQuery from '@blocks/EhloMailBlock/query';
import CdnCardsBlockQuery from '@blocks/CdnCardsBlock/query';
import SslCardsBlockQuery from '@blocks/SslCardsBlock/query';

export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages (sort: "createdAt:desc", pagination: { limit: 1000 }){
      data {
        id
        attributes {
          __typename
          publishedAt
          title
          parent {
            data {
              id
              attributes {
                title
                slug
                parent {
                  data {
                    id
                    attributes {
                      title
                      slug
                    }
                  }
                }
                children {
                  data {
                    id
                    attributes {
                      title
                      slug
                    }
                  }
                }
              }
            }
          }
          children {
            data {
              id
              attributes {
                title
                slug
              }
            }
          }
          slug
          seo {
            id
            __typename
            metaTitle
            metaDescription
            preventIndexing
            meta {
              __typename
              name
              content
              property
            }
          }
          pageBlocks {
            __typename
            ${ButtonBlockQuery}
            ${AccordionCardBlock}
            ${ImageWithTitleBlockQuery}
            ${CallToActionBlockQuery}
            ${LeftTitleRightDescriptionBlockQuery}
            ${StepsBlockQuery}
            ${CircledLeftImageBlockQuery}
            ${CircledRightImageBlockQuery}
            ${BenefitsBlockQuery}
            ${TitledTabsBlockQuery}
            ${TestimonialCardBlockQuery}
            ${FileBlockQuery}
            ${MarqeeBlockQuery}
            ${SignUpBlockQuery}
            ${TitleBlockQuery}
            ${DescriptionBlockQuery}
            ${TestimonialSliderBlockQuery}
            ${AboutHeroBlockQuery}
            ${RequirementsFormBlockQuery}
            ${HomepageFormBlockQuery}
            ${KeyFeaturesBlockQuery}
            ${SmallPricingBlockQuery}
            ${SellingPointBlockQuery}
            ${AccordionPlusBlockQuery}
            ${TeamSliderBlockQuery}
            ${SpacingBlockQuery}
            ${ResourcesBlockQuery}
            ${FaqBlockQuery}  
            ${FaqListBlockQuery}    
            ${TabPricingBlockQuery}  
            ${CheckCardBlockQuery}  
            ${ContactUsFormBlockQuery}
            ${LeftImageRightTextBlockQuery}
            ${ArticlesBlogQuery}
            ${BreadcrumbsBlockQuery}
            ${CenteredDescBlockQuery}
            ${DomainSearchBlockQuery}
            ${DomainsNameBlockQuery}
            ${ImageBlockQuery}
            ${BannerBgImageBlockQuery}
            ${BannerBlockQuery}
            ${BannerTealHomeBlockQuery}
            ${PlansPricingBlockQuery}
            ${BannerLiliacHomeBlockQuery}
            ${SmallDomainCardBlockQuery}
            ${PerformanceHostingBlockQuery}
            ${VpsCardBlockQuery}
            ${MeetTheTeamBlockQuery}
            ${InfoCardsBlockQuery}
            ${CircleImageBlockQuery}
            ${IconBannerBlockQuery}
            ${NewHeroBlockQuery}
            ${ContactBlockQuery}
            ${LeftIconImageImageBlockQuery}
            ${AgencyHostingVpsBlockQuery}
            ${TimelineBlockQuery}
            ${TransferDomainBlockQuery}
            ${EhloMailBlockQuery}
            ${CdnCardsBlockQuery}
            ${SslCardsBlockQuery}
            ${ManagedVpsBlockQuery}
            ${HeroBlockQuery}
          }
        }
      }
    } 
  }
`;
export const GET_ALL_BLOGS = gql`
  query GetAllBlogs {
    blogs(sort: "createdAt:desc", pagination: { limit: 1000 }) {
      data {
        id
        attributes {
          __typename
          publishedAt
          title
          author
          category
          thumbnail{
            __typename
            data {
                id
                attributes {
                  name
                  alternativeText
                  caption
                  width
                  height
                  formats
                  mime
                  url
                }
                __typename
              }
          }
          slug
          seo {
            id
            __typename
            metaTitle
            metaDescription
            preventIndexing
            meta {
              __typename
              name
              content
            }
          }
          blogBlocks {
            __typename
            ${HeroBlogBlockQuery}
            ${TitleBlockQuery}
            ${ImageBlockQuery}
            ${CenteredDescBlockQuery}
            ${ButtonsBlockQuery}
            ${TestimonialCardBlockQuery}
            ${DescriptionBlockQuery}
            ${SpacingBlockQuery}
          }
        }
      }
    }
  }
`;
export const GET_HEADER = gql`
  query GetHeader {
    header {
      data {
        id
        attributes {
          logoHeader {
            data {
              id
              attributes {
                name
                alternativeText
                caption
                width
                height
                formats
                hash
                ext
                mime
                size
                url
                previewUrl
                provider
                provider_metadata
              }
            }
          }
          tabHeader {
            id
            titleTabHeader
            linkTabHeader
            options
            optionsTabHeader {
              id
              logoOptionTab {
                data {
                  id
                  attributes {
                    mime
                    alternativeText
                    caption
                    width
                    height
                    formats
                    hash
                    ext
                    mime
                    size
                    url
                    previewUrl
                    provider_metadata
                    provider
                  }
                }
              }
              titleOptionTab
              blurbOptionTab
              buttonOptionTab
              linkOptionTab
            }
          }
          buttonHeader {
            id
            buttons {
              id
              cta
              link
              color
              hasLink
            }
          }
          contactInfoHeader
        }
      }
    }
  }
`;
export const GET_FOOTER = gql`
  query GetFooter {
    footer {
      data {
        id
        attributes {
          footerLogo {
            data {
              id
              attributes {
                mime
                alternativeText
                caption
                width
                height
                formats
                hash
                ext
                mime
                size
                url
                previewUrl
                provider_metadata
                provider
              }
            }
          }
          socialMedia {
            id
            logoSocialMedia {
              data {
                id
                attributes {
                  mime
                  alternativeText
                  caption
                  width
                  height
                  formats
                  hash
                  ext
                  mime
                  size
                  url
                  previewUrl
                  provider_metadata
                  provider
                }
              }
            }
            linkSocialMedia
          }
          helpAndSupport {
            id
            labelFooter
            linkFooter
          }
          present
        }
      }
    }
  }
`;
export const GET_VPS_CONFIGURATO = gql`
  query GetVPSConfigurator {
    vpsConfigurator {
      data {
        id
        attributes {
          defaultProducts(pagination: { limit: 20 }) {
            data {
              attributes {
                title
                sku
                productType
                description
                productCategory {
                  data {
                    attributes {
                      title
                      sku
                    }
                  }
                }
                resourceVersion
                metadata
                productPrices {
                  data {
                    attributes {
                      sku
                      price
                      currency
                      period
                      priceType
                      pricingModel
                      resourceVersion
                      tiers
                    }
                  }
                }
              }
            }
          }
          defaultRam
          defaultCpu
          defaultStorage
          breadcrumbVPS
          vpsHero {
            id
            size
            title
            description
            secondTitleVps
            smallTitle
            heroImage {
              __typename
              data {
                id
                attributes {
                  name
                  alternativeText
                  caption
                  width
                  height
                  formats
                  mime
                  url
                }
                __typename
              }
            }
            button {
              id
              cta
              link
              hasLink
              __typename
            }
            buttonScroll {
              id
              cta
              link
              hasLink
              __typename
            }
          }
          mainTitle
          keyFeaturesVps {
            id
            checkListItemProps {
              id
              cta
              checking
              ctaButton
              linkButton
              theme
              description
            }
          }
          titleLocation
          locationBoxText
          resourcesTitle
          vpsResources {
            id
            ramText {
              id
              titleResources
              descriptionRes
            }
            vcpu {
              id
              titleResources
              descriptionRes
            }
            storage {
              id
              titleResources
              descriptionRes
            }
          }
          serverTitle
          firstBoxText
          secondBoxTitle
          thirdBoxText
          advancedTitle
          fourthBoxTile
          fiftBoxTitle
          contactVps {
            id
            titleCont
            DescCont
            buttonContCta
            linkButtonCont
          }
          createdAt
        }
      }
    }
  }
`;
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      data {
        id
        attributes {
          title
          sku
          productType
          description
          productCategory {
            data {
              attributes {
                title
                sku
              }
            }
          }
          resourceVersion
          metadata
          productPrices {
            data {
              attributes {
                sku
                price
                currency
                period
                priceType
                pricingModel
                tiers
                resourceVersion
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $company: String!
    $addressLine1: String!
    $addressLine2: String!
    $addressLine3: String!
    $country: String!
    $city: String!
    $postCode: String!
    $stateCode: String!
    $currencyCode: String!
    $vatNumber: String!
  ) {
    createCustomer(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        company: $company
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        addressLine3: $addressLine3
        country: $country
        city: $city
        postCode: $postCode
        stateCode: $stateCode
        currencyCode: $currencyCode
        vatNumber: $vatNumber
      }
    ) {
      data {
        id
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $paymentMethod: String
    $paymentType: String
    $orderItems: JSON
    $customer: JSON
    $paymentSource: String
    $coupon: String
  ) {
    createOrder(
      data: {
        paymentMethod: $paymentMethod
        orderItems: $orderItems
        customer: $customer
        paymentType: $paymentType
        paymentSource: $paymentSource
        coupon: $coupon
      }
    ) {
      data {
        id
        attributes {
          paymentIntent
          status
        }
      }
    }
  }
`;

export const CREATE_ESTIMATE = gql`
  mutation CreateEstimate(
    $orderItems: JSON!
    $customer: JSON
    $coupon: String
  ) {
    estimateOrder(
      data: { orderItems: $orderItems, customer: $customer, coupon: $coupon }
    ) {
      token
      nextEstimates
      estimates
      paymentSources
    }
  }
`;

export const CONFIRM_ORDER = gql`
  mutation ConfirmOrder(
    $paymentIntent: JSON!
    $orderItems: JSON!
    $coupon: String
  ) {
    confirmOrder(
      data: {
        paymentIntent: $paymentIntent
        orderItems: $orderItems
        coupon: $coupon
      }
    ) {
      status
    }
  }
`;

export const GET_PORTAL_SESSION = gql`
  query GetPortalSession {
    portalSession {
      data {
        id
        attributes {
          token
          accessUrl
        }
      }
    }
  }
`;

export const LOCATIONS_QUERY = gql`
  query Locations {
    locations {
      data {
        attributes {
          name
          description
          sku
        }
      }
    }
  }
`;

export const CURRENCIES_QUERY = gql`
  query Currencies {
    currencies {
      data {
        attributes {
          code
          name
          symbol
        }
      }
    }
  }
`;

export const VM_PORDUCTS_QUERY = gql`
  query Products($location: String!, $currency: String!) {
    products(
      filters: {
        sku: { contains: $location }
        productType: { eq: "plan" }
        productCategory: { sku: { eq: "VM" } }
      }
    ) {
      data {
        attributes {
          productType
          title
          sku
          metadata
          productPrices(filters: { currency: { eq: $currency } }) {
            data {
              attributes {
                price
                sku
                currency
              }
            }
          }
        }
      }
    }
  }
`;

export const ALL_PORDUCTS_QUERY = gql`
  query Products($currency: String!) {
    products(
      filters: { productType: { eq: "plan" } }
      pagination: { limit: 1000 }
    ) {
      data {
        attributes {
          productType
          title
          sku
          metadata
          productPrices(filters: { currency: { eq: $currency } }) {
            data {
              attributes {
                price
                sku
                currency
              }
            }
          }
        }
      }
    }
  }
`;

export const VM_ADDONS_QUERY = gql`
  query Adddons($currency: String!) {
    products(
      pagination: { limit: 100 }
      filters: {
        productType: { eq: "addon" }
        productCategory: { sku: { eq: "VM" } }
      }
    ) {
      data {
        attributes {
          title
          sku
          productType
          description
          metadata
          productPrices(filters: { currency: { eq: $currency } }) {
            data {
              attributes {
                tiers
                price
                sku
                period
                currency
                pricingModel
              }
            }
          }
        }
      }
    }
  }
`;

export const ALL_ADDONS_QUERY = gql`
  query Adddons($currency: String!) {
    products(
      pagination: { limit: 100 }
      filters: { productType: { eq: "addon" } }
    ) {
      data {
        attributes {
          title
          sku
          productType
          description
          metadata
          productPrices(filters: { currency: { eq: $currency } }) {
            data {
              attributes {
                tiers
                price
                sku
                currency
                pricingModel
              }
            }
          }
        }
      }
    }
  }
`;
