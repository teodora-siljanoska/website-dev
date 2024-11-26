/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import AccordionDoubleBlock from '@blocks/AccordionDoubleBlock/AccordionDoubleBlock';
import React from 'react';

import type { BlogEntity, PageEntity } from '../../utils/types';
import HeroBlock from '../blocks/HeroBlock/HeroBlock';
import WhyUsBlock from '../blocks/WhyUsBlock/WhyUsBlock';
import AboutHeroBlock from '../blocks/AboutHeroBlock/AboutHeroBlock';
import TestimonialCardBlock from '../blocks/TestimonialCardBlock/TestimonialCardBlock';
import ButtonBlock from '../blocks/ButtonBlock/ButtonBlock';
import AccordionCardBlock from '@blocks/AccordionCardBlock/AccordionCardBlock';
import ImageWithTitleBlock from '@blocks/ImageWithTitleBlock/ImageWithTitleBlock';
import CallToActionBlock from '@blocks/CallToActionBlock/CallToActionBlock';
import LeftTitleRightDescriptionBlock from '@blocks/LeftTitleRightDescriptionBlock/LeftTitleRightDescriptionBlock';
import StepsBlock from '@blocks/StepsBlock/StepsBlock';
import CircledLeftImageBlock from '@blocks/CircledLeftImageBlock/CircledLeftImageBlock';
import CircledRightImageBlock from '@blocks/CircledRightImageBlock/CircledRightImageBlock';
import BenefitsBlock from '@blocks/BenefitsBlock/BenefitsBlock';
import TitledTabsBlock from '@blocks/TitledTabsBlock/TitledTabsBlock';
import FileBlock from '@blocks/FileBlock/FileBlock';
import MarqueeBlock from '@blocks/MarqueeBlock/MarqueeBlock';
import SignUpBlock from '@blocks/SignUpBlock/SignUpBlock';
import RequirementsFormBlock from '@blocks/RequirementsFormBlock/RequrirementsFormBlock';
import HomepageFormBlock from '@blocks/HomepageFormBlock/HomepageFormBlock';
import SellingPointsBlock from '@blocks/SellingPointsBlock/SellingPointsBlock';
import KeyFeaturesBlock from '@blocks/KeyFeaturesBlock/KeyFeaturesBlock';
import SmallPricingBlock from '@blocks/SmallPricingBlock/SmallPricingBlock';
import ManagedVpsBlock from '@blocks/ManagedVpsBlock/ManagedVpsBlock';
import FaqBlock from '@blocks/FAQBlock/FaqBlock';
import LeftImageRightTextBlock from '@blocks/LeftImageRightTextBlock/LeftImageRightTextBlock';
import SpacingBlock from '@blocks/SpacingBlock/SpacingBlock';
import TeamSliderBlock from '@blocks/TeamSliderBlock/TeamSliderBlock';
import TitleBlock from '@blocks/TitleBlock/TitleBlock';
import DescriptionBlock from '@blocks/DescriptionBlock/DescriptionBlock';
import TestimonialSliderBlock from '@blocks/TestimonialSliderBlock/TestimonialSliderBlock';
import AccordionPlusBlock from '@blocks/AccordionPlusBlock/AccordionPlusBlock';
import ResourcesBlock from '@blocks/ResourcesBlock/ResourcesBlock';
import TabPricingBlock from '@blocks/TabPricingBlock/TabPricingBlock';
import CheckCardBlock from '@blocks/CheckCardBlock/CheckCardBlock';
// import ContactUsFormBlock from '@blocks/ContactUsFormBlock/ContactUsFormBlock';
import ArticlesBlogBlock from '@blocks/ArticlesBlogBlock/ArticlesBlogBlock';
import BreadcrumbsBlock from '@blocks/BreadcrumbsBlock/BreadcrumbsBlock';
import CenteredDescBlock from '@blocks/CenteredDescBlock/CenteredDescBlock';
import DomainSearchBlock from '@blocks/DomainSearchBlock/DomainSearchBlock';
import DomainsNameBlock from '@blocks/DomainsNameBlock/DomainsNameBlock';
import TimelineBlock from '@blocks/TimelineBlock/TimelineBlock';
import ImageBlock from '@blocks/ImageBlock/ImageBlock';
import FaqListBlock from '@blocks/FaqListBlock/FaqListBlock';
import BannerBgImageBlock from '@blocks/BannerBgImageBlock/BannerBgImageBlock';
import BannerBlock from '@blocks/BannerBlock/BannerBlock';
import BannerTealHomeBlock from '@blocks/BannerTealHomeBlock/BannerTealHomeBlock';
import BannerLiliacHomeBlock from '@blocks/BannerLiliacHomeBlock/BannerLiliacHomeBlock';
import PlansPricingBlock from '@blocks/PlansPricingBlock/PlansPricingBlock';
import SmallDomainCardBlock from '@blocks/SmallDomainCardBlock/SmallDomainCardBlock';
import PerformanceHostingBlock from '@blocks/PerformanceHostingBlock/PerformanceHostingBlock';
import VpsCardBlock from '@blocks/VpsCardBlock/VpsCardBlock';
import MeetTheTeamBlock from '@blocks/MeetTheTeamBlock/MeetTheTeamBlock';
import InfoCardsBlock from '@blocks/InfoCardsBlock/InfoCardsBlock';
import CircleImageBlock from '@blocks/CircleImageBlock/CircleImageBlock';
import IconBannerBlock from '@blocks/IconBannerBlock/IconBannerBlock';
import NewHeroBlock from '@blocks/NewHeroBlock/NewHeroBlock';
import ContactBlock from '@blocks/ContactBlock/ContactBlock';
import LeftIconImageBlock from '@blocks/LeftIconImageBlock.tsx/LeftIconImageBlock';
import AgencyHostingVpsBlock from '@blocks/AgencyHostingVpsBlock/AgencyHostingVpsBlock';
import TransferDomainBlock from '@blocks/TransferDomainBlock/TransferDomainBlock';
import EhloMailBlock from '@blocks/EhloMailBlock/EhloMailBlock';
import CdnCardsBlock from '@blocks/CdnCardsBlock/CdnCardsBlock';
import SslCardsBlock from '@blocks/SslCardsBlock/SslCardsBlock';

interface P {
  singlePageData: PageEntity;
}

export function Blocks({ singlePageData }: P) {
  return (
    <>
      {singlePageData?.attributes?.pageBlocks
        ? singlePageData.attributes.pageBlocks.map(
            (block: any, i): JSX.Element | null | undefined => {
              switch (block?.__typename) {
                case 'ComponentPageBlocksHero':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <HeroBlock {...block} />
                    </React.Fragment>
                  );
                  break;

                case 'ComponentPageBlocksWhyUsBlock':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <WhyUsBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksTitle':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TitleBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksBenefits':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <BenefitsBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksTitledTabs':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TitledTabsBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksFiles':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <FileBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksMarqee':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <MarqueeBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksSignUp':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <SignUpBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksRequirementsForm':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <RequirementsFormBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksHomepageForm':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <HomepageFormBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksSellingPoints':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <SellingPointsBlock {...block} />
                    </React.Fragment>
                  );
                  break;

                case 'ComponentPageBlocksAboutHero':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <AboutHeroBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksTestimonialCard':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TestimonialCardBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksAccordionDouble':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <AccordionDoubleBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksKeyFeatures':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <KeyFeaturesBlock {...block} />
                    </React.Fragment>
                  );
                  break;

                case 'ComponentPageBlocksButtons':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <ButtonBlock {...block} />
                    </React.Fragment>
                  );
                  break;

                case 'ComponentPageBlocksAccordionCart':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <AccordionCardBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksImageWithTitle':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <ImageWithTitleBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksCallToAction':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <CallToActionBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksLeftTitleRightDescription':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <LeftTitleRightDescriptionBlock {...block} />
                    </React.Fragment>
                  );
                  break;

                case 'ComponentPageBlocksDescription':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <DescriptionBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksCenteredDesc':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <CenteredDescBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksStepsBlock':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <StepsBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksCircledLeftImage':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <CircledLeftImageBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksCircledRightImage':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <CircledRightImageBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksAccordionDouble':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <AccordionDoubleBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksSmallPricing':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <SmallPricingBlock {...block} />
                    </React.Fragment>
                  );
                  break;

                case 'ComponentPageBlocksButtons':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <ButtonBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksManagedVps':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <ManagedVpsBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksKeyFeatures':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <KeyFeaturesBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksAccordionCart':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <AccordionCardBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksFaq':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <FaqBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksFaqList':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <FaqListBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksBreadcrumbs':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <BreadcrumbsBlock page={singlePageData} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksCheckCard':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <CheckCardBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksTabPricing':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TabPricingBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksLeftImageRightText':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <LeftImageRightTextBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksSpacing':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <SpacingBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksTeamSlider':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TeamSliderBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksTitle':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TitleBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksTestimonialSlider':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TestimonialSliderBlock {...block} />
                    </React.Fragment>
                  );
                  break;

                case 'ComponentPageBlocksAccordionPlus':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <AccordionPlusBlock {...block} />
                    </React.Fragment>
                  );
                  break;

                case 'ComponentPageBlocksResources':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <ResourcesBlock {...block} />
                    </React.Fragment>
                  );
                  break;

                case 'ComponentPageBlocksDomainSearch':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <DomainSearchBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksDomainsName':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <DomainsNameBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksTransferDomain':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TransferDomainBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                // case 'ComponentPageBlocksContactUsForm':
                //   return (
                //     <React.Fragment key={`${i}block.__typename`}>
                //       <ContactUsFormBlock />
                //     </React.Fragment>
                //   );
                //   break;
                case 'ComponentPageBlocksTimeline':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <TimelineBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksImage':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <ImageBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksBannerBgImage':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <BannerBgImageBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksBanner':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <BannerBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksBannerTealHome':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <BannerTealHomeBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksBannerLiliacHome':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <BannerLiliacHomeBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksPlansPricingBlock':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <PlansPricingBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksSmallCards':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <SmallDomainCardBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksPerformanceHosting':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <PerformanceHostingBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksVpsCard':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <VpsCardBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksMeetTheTeam':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <MeetTheTeamBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksInfoCards':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <InfoCardsBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksCircleImage':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <CircleImageBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksIconBanner':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <IconBannerBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksNewHero':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <NewHeroBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksContact':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <ContactBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksLeftIconImage':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <LeftIconImageBlock {...block} />
                    </React.Fragment>
                  );
                  break;

                case 'ComponentPageBlocksAgencyHostingVps':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <AgencyHostingVpsBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksEhloMail':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <EhloMailBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksCdnCards':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <CdnCardsBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                case 'ComponentPageBlocksSslCards':
                  return (
                    <React.Fragment key={`${i}block.__typename`}>
                      <SslCardsBlock {...block} />
                    </React.Fragment>
                  );
                  break;
                default:
                  return null;
              }
            }
          )
        : null}
    </>
  );
}

export default Blocks;
