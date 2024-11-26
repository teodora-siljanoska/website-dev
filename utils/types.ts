export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BlogBlogBlocksDynamicZoneInput: any;
  DateTime: any;
  I18NLocaleCode: any;
  JSON: any;
  Long: any;
  PagePageBlocksDynamicZoneInput: any;
  Upload: any;
};

export type Blog = {
  __typename?: 'Blog';
  author?: Maybe<Scalars['String']>;
  blogBlocks?: Maybe<Array<Maybe<BlogBlogBlocksDynamicZone>>>;
  category?: Maybe<Enum_Blog_Category>;
  createdAt?: Maybe<Scalars['DateTime']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  seo?: Maybe<ComponentPageUtilsSeo>;
  slug: Scalars['String'];
  thumbnail?: Maybe<UploadFileEntityResponse>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BlogBlogBlocksDynamicZone = ComponentPageBlocksButtons | ComponentPageBlocksCenteredDesc | ComponentPageBlocksDescription | ComponentPageBlocksHeroBlog | ComponentPageBlocksImage | ComponentPageBlocksSpacing | ComponentPageBlocksTestimonialCard | ComponentPageBlocksTitle | Error;

export type BlogEntity = {
  __typename?: 'BlogEntity';
  attributes?: Maybe<Blog>;
  id?: Maybe<Scalars['ID']>;
};

export type BlogEntityResponse = {
  __typename?: 'BlogEntityResponse';
  data?: Maybe<BlogEntity>;
};

export type BlogEntityResponseCollection = {
  __typename?: 'BlogEntityResponseCollection';
  data: Array<BlogEntity>;
  meta: ResponseCollectionMeta;
};

export type BlogFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BlogFiltersInput>>>;
  author?: InputMaybe<StringFilterInput>;
  category?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<BlogFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BlogFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentPageUtilsSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BlogInput = {
  author?: InputMaybe<Scalars['String']>;
  blogBlocks?: InputMaybe<Array<Scalars['BlogBlogBlocksDynamicZoneInput']>>;
  category?: InputMaybe<Enum_Blog_Category>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<ComponentPageUtilsSeoInput>;
  slug?: InputMaybe<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  eqi?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  nei?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentPageBlocksAboutHero = {
  __typename?: 'ComponentPageBlocksAboutHero';
  backgroundImage?: Maybe<UploadFileEntityResponse>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mobileSpacing?: Maybe<Enum_Componentpageblocksabouthero_Mobilespacing>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksAccordionCart = {
  __typename?: 'ComponentPageBlocksAccordionCart';
  accordions?: Maybe<Array<Maybe<ComponentPageComponentsAccordionItem>>>;
  id: Scalars['ID'];
  regCard?: Maybe<ComponentPageComponentsRegCard>;
};


export type ComponentPageBlocksAccordionCartAccordionsArgs = {
  filters?: InputMaybe<ComponentPageComponentsAccordionItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksAccordionDouble = {
  __typename?: 'ComponentPageBlocksAccordionDouble';
  accordionItemsProps?: Maybe<Array<Maybe<ComponentPageComponentsAccordionArrowItem>>>;
  id: Scalars['ID'];
};


export type ComponentPageBlocksAccordionDoubleAccordionItemsPropsArgs = {
  filters?: InputMaybe<ComponentPageComponentsAccordionArrowItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksAccordionPlus = {
  __typename?: 'ComponentPageBlocksAccordionPlus';
  accordionItems?: Maybe<Array<Maybe<ComponentPageComponentsAccordionItem>>>;
  id: Scalars['ID'];
};


export type ComponentPageBlocksAccordionPlusAccordionItemsArgs = {
  filters?: InputMaybe<ComponentPageComponentsAccordionItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksAgencyHostingVps = {
  __typename?: 'ComponentPageBlocksAgencyHostingVps';
  contentVPSFirst?: Maybe<ComponentPageComponentsAgyCard>;
  contentVPSFourth?: Maybe<ComponentPageComponentsAgyCard>;
  contentVPSSecond?: Maybe<ComponentPageComponentsAgyCard>;
  contentVPSThird?: Maybe<ComponentPageComponentsAgyCard>;
  id: Scalars['ID'];
  standardFeatures?: Maybe<Array<Maybe<ComponentPageComponentsPlansCheckList>>>;
  titleAgencyHosting?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksAgencyHostingVpsStandardFeaturesArgs = {
  filters?: InputMaybe<ComponentPageComponentsPlansCheckListFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksArticles = {
  __typename?: 'ComponentPageBlocksArticles';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksBanner = {
  __typename?: 'ComponentPageBlocksBanner';
  buttonForBanner?: Maybe<ComponentPageComponentsButton>;
  colorOfBanner?: Maybe<Enum_Componentpageblocksbanner_Colorofbanner>;
  id: Scalars['ID'];
  titleBanner?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksBannerBgImage = {
  __typename?: 'ComponentPageBlocksBannerBgImage';
  bannerMainText?: Maybe<ComponentPageComponentsDescription>;
  id: Scalars['ID'];
  imgBanner?: Maybe<UploadFileEntityResponse>;
  linkForLink?: Maybe<Scalars['String']>;
  textForLink?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksBannerLiliacHome = {
  __typename?: 'ComponentPageBlocksBannerLiliacHome';
  contentLiliacBanner?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  titleLiliacBanner?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksBannerTealHome = {
  __typename?: 'ComponentPageBlocksBannerTealHome';
  buttonBannerTeal?: Maybe<ComponentPageComponentsButton>;
  contentTealBanner?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  rightTopImage?: Maybe<UploadFileEntityResponse>;
};

export type ComponentPageBlocksBenefits = {
  __typename?: 'ComponentPageBlocksBenefits';
  benefits?: Maybe<Array<Maybe<ComponentPageComponentsBenefit>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksBenefitsBenefitsArgs = {
  filters?: InputMaybe<ComponentPageComponentsBenefitFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksBreadcrumbs = {
  __typename?: 'ComponentPageBlocksBreadcrumbs';
  breadcrumb?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ComponentPageBlocksButtons = {
  __typename?: 'ComponentPageBlocksButtons';
  buttons?: Maybe<Array<Maybe<ComponentPageComponentsButtonWithColor>>>;
  id: Scalars['ID'];
};


export type ComponentPageBlocksButtonsButtonsArgs = {
  filters?: InputMaybe<ComponentPageComponentsButtonWithColorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksButtonsInput = {
  buttons?: InputMaybe<Array<InputMaybe<ComponentPageComponentsButtonWithColorInput>>>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ComponentPageBlocksCallToAction = {
  __typename?: 'ComponentPageBlocksCallToAction';
  buttons?: Maybe<Array<Maybe<ComponentPageComponentsButton>>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksCallToActionButtonsArgs = {
  filters?: InputMaybe<ComponentPageComponentsButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksCdnCards = {
  __typename?: 'ComponentPageBlocksCdnCards';
  contactContent?: Maybe<Scalars['String']>;
  firstCDNCard?: Maybe<ComponentPageComponentsCdnCard>;
  firstCDNddosCard?: Maybe<ComponentPageComponentsCdnCard>;
  id: Scalars['ID'];
  innerFirstTitle?: Maybe<Scalars['String']>;
  innerSecondTitle?: Maybe<Scalars['String']>;
  secondCDNCard?: Maybe<ComponentPageComponentsCdnCard>;
  secondCDNddosCard?: Maybe<ComponentPageComponentsCdnCard>;
  tabFirstTitleCDN?: Maybe<Scalars['String']>;
  tabSecondTitleCDN?: Maybe<Scalars['String']>;
  thirdCDNCard?: Maybe<ComponentPageComponentsCdnCard>;
  thirdCDNddosCard?: Maybe<ComponentPageComponentsCdnCard>;
};

export type ComponentPageBlocksCenteredDesc = {
  __typename?: 'ComponentPageBlocksCenteredDesc';
  centeredDesc?: Maybe<ComponentPageComponentsCenteredDescription>;
  id: Scalars['ID'];
};

export type ComponentPageBlocksCheckCard = {
  __typename?: 'ComponentPageBlocksCheckCard';
  card?: Maybe<Array<Maybe<ComponentPageComponentsCheckCard>>>;
  id: Scalars['ID'];
};


export type ComponentPageBlocksCheckCardCardArgs = {
  filters?: InputMaybe<ComponentPageComponentsCheckCardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksCircleImage = {
  __typename?: 'ComponentPageBlocksCircleImage';
  id: Scalars['ID'];
  imageBlock?: Maybe<UploadFileEntityResponse>;
  leftBottom?: Maybe<ComponentPageComponentsCircleItem>;
  leftTop?: Maybe<ComponentPageComponentsCircleItem>;
  rightBottom?: Maybe<ComponentPageComponentsCircleItem>;
  rightTop?: Maybe<ComponentPageComponentsCircleItem>;
};

export type ComponentPageBlocksCircledLeftImage = {
  __typename?: 'ComponentPageBlocksCircledLeftImage';
  button?: Maybe<ComponentPageComponentsButton>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksCircledRightImage = {
  __typename?: 'ComponentPageBlocksCircledRightImage';
  button?: Maybe<ComponentPageComponentsButton>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksContact = {
  __typename?: 'ComponentPageBlocksContact';
  billingInquiry?: Maybe<ComponentPageComponentsContactLinkCard>;
  id: Scalars['ID'];
  preSalesInquiry?: Maybe<ComponentPageComponentsContactCard>;
  technicalSupport?: Maybe<ComponentPageComponentsContactLinkCard>;
};

export type ComponentPageBlocksContactUsForm = {
  __typename?: 'ComponentPageBlocksContactUsForm';
  id: Scalars['ID'];
  nemaPotrebaOdPolevo?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksDescription = {
  __typename?: 'ComponentPageBlocksDescription';
  alignment?: Maybe<Enum_Componentpageblocksdescription_Alignment>;
  cta?: Maybe<Scalars['String']>;
  fontSize?: Maybe<Enum_Componentpageblocksdescription_Fontsize>;
  id: Scalars['ID'];
};

export type ComponentPageBlocksDomainSearch = {
  __typename?: 'ComponentPageBlocksDomainSearch';
  ctaButton?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksDomainsName = {
  __typename?: 'ComponentPageBlocksDomainsName';
  id: Scalars['ID'];
  nameExtension?: Maybe<Scalars['JSON']>;
};

export type ComponentPageBlocksEhloMail = {
  __typename?: 'ComponentPageBlocksEhloMail';
  ehloFirstCard?: Maybe<ComponentPageComponentsEhloBox>;
  ehloSecondCard?: Maybe<ComponentPageComponentsEhloBox>;
  ehloThirdCard?: Maybe<ComponentPageComponentsEhloBox>;
  id: Scalars['ID'];
};

export type ComponentPageBlocksFaq = {
  __typename?: 'ComponentPageBlocksFaq';
  activeData: Scalars['Int'];
  data?: Maybe<Array<Maybe<ComponentPageComponentsAccordionAndTitle>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksFaqDataArgs = {
  filters?: InputMaybe<ComponentPageComponentsAccordionAndTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksFaqList = {
  __typename?: 'ComponentPageBlocksFaqList';
  activeData: Scalars['Int'];
  content?: Maybe<Array<Maybe<ComponentPageComponentsContent>>>;
  id: Scalars['ID'];
};


export type ComponentPageBlocksFaqListContentArgs = {
  filters?: InputMaybe<ComponentPageComponentsContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksFiles = {
  __typename?: 'ComponentPageBlocksFiles';
  files: UploadFileRelationResponseCollection;
  id: Scalars['ID'];
};


export type ComponentPageBlocksFilesFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksHero = {
  __typename?: 'ComponentPageBlocksHero';
  button?: Maybe<ComponentPageComponentsButton>;
  buttonScroll?: Maybe<ComponentPageComponentsButton>;
  description?: Maybe<Scalars['String']>;
  heroImage?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
  secondTitleVps?: Maybe<Scalars['String']>;
  size?: Maybe<Enum_Componentpageblockshero_Size>;
  smallTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksHeroBlog = {
  __typename?: 'ComponentPageBlocksHeroBlog';
  description?: Maybe<Scalars['String']>;
  heroImage?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
  size?: Maybe<Enum_Componentpageblocksheroblog_Size>;
  smallTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksHeroInput = {
  button?: InputMaybe<ComponentPageComponentsButtonInput>;
  buttonScroll?: InputMaybe<ComponentPageComponentsButtonInput>;
  description?: InputMaybe<Scalars['String']>;
  heroImage?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  secondTitleVps?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Enum_Componentpageblockshero_Size>;
  smallTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentPageBlocksHomepageForm = {
  __typename?: 'ComponentPageBlocksHomepageForm';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksIconBanner = {
  __typename?: 'ComponentPageBlocksIconBanner';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imgTitle?: Maybe<Array<Maybe<ComponentPageComponentsImageWithTitle>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksIconBannerImgTitleArgs = {
  filters?: InputMaybe<ComponentPageComponentsImageWithTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksImage = {
  __typename?: 'ComponentPageBlocksImage';
  desc?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  mobileImage?: Maybe<UploadFileEntityResponse>;
};

export type ComponentPageBlocksImageWithTitle = {
  __typename?: 'ComponentPageBlocksImageWithTitle';
  id: Scalars['ID'];
  imgTitle?: Maybe<Array<Maybe<ComponentPageComponentsImageWithTitle>>>;
  isThreeInRow?: Maybe<Scalars['Boolean']>;
};


export type ComponentPageBlocksImageWithTitleImgTitleArgs = {
  filters?: InputMaybe<ComponentPageComponentsImageWithTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksInfoCards = {
  __typename?: 'ComponentPageBlocksInfoCards';
  id: Scalars['ID'];
  infoCard?: Maybe<Array<Maybe<ComponentPageComponentsInfoCard>>>;
  numberOfShowingCardsInRow?: Maybe<Enum_Componentpageblocksinfocards_Numberofshowingcardsinrow>;
};


export type ComponentPageBlocksInfoCardsInfoCardArgs = {
  filters?: InputMaybe<ComponentPageComponentsInfoCardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksKeyFeatures = {
  __typename?: 'ComponentPageBlocksKeyFeatures';
  checkListItems?: Maybe<Array<Maybe<ComponentPageComponentsCheckListItem>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksKeyFeaturesCheckListItemsArgs = {
  filters?: InputMaybe<ComponentPageComponentsCheckListItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksKeyFeaturesVps = {
  __typename?: 'ComponentPageBlocksKeyFeaturesVps';
  checkListItemProps?: Maybe<Array<Maybe<ComponentPageComponentsCheckListItem>>>;
  id: Scalars['ID'];
};


export type ComponentPageBlocksKeyFeaturesVpsCheckListItemPropsArgs = {
  filters?: InputMaybe<ComponentPageComponentsCheckListItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksKeyFeaturesVpsInput = {
  checkListItemProps?: InputMaybe<Array<InputMaybe<ComponentPageComponentsCheckListItemInput>>>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ComponentPageBlocksLeftIconImage = {
  __typename?: 'ComponentPageBlocksLeftIconImage';
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksLeftImageRightText = {
  __typename?: 'ComponentPageBlocksLeftImageRightText';
  circledImage?: Maybe<UploadFileEntityResponse>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksLeftTitleRightDescription = {
  __typename?: 'ComponentPageBlocksLeftTitleRightDescription';
  description?: Maybe<Scalars['String']>;
  descriptionTwo?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksManagedVps = {
  __typename?: 'ComponentPageBlocksManagedVps';
  defaultBox?: Maybe<ComponentPageComponentsDefaultBox>;
  id: Scalars['ID'];
  vpsCheck?: Maybe<Array<Maybe<ComponentPageComponentsPlansCheckList>>>;
  vpsFirstCard?: Maybe<ComponentPageComponentsVpsBox>;
  vpsSecondCard?: Maybe<ComponentPageComponentsVpsBox>;
  vpsThirdCard?: Maybe<ComponentPageComponentsVpsBox>;
};


export type ComponentPageBlocksManagedVpsVpsCheckArgs = {
  filters?: InputMaybe<ComponentPageComponentsPlansCheckListFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksMarqee = {
  __typename?: 'ComponentPageBlocksMarqee';
  id: Scalars['ID'];
  logos?: Maybe<UploadFileRelationResponseCollection>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksMarqeeLogosArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksMeetTheTeam = {
  __typename?: 'ComponentPageBlocksMeetTheTeam';
  backgroundColor?: Maybe<Enum_Componentpageblocksmeettheteam_Backgroundcolor>;
  bioOfEmployee?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageOfEmployee?: Maybe<UploadFileEntityResponse>;
  imagePosition?: Maybe<Enum_Componentpageblocksmeettheteam_Imageposition>;
  nameOfEmployee?: Maybe<Scalars['String']>;
  positionOfEmployee?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksNewHero = {
  __typename?: 'ComponentPageBlocksNewHero';
  button?: Maybe<ComponentPageComponentsButton>;
  description?: Maybe<Scalars['String']>;
  heroImage?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksPerformanceHosting = {
  __typename?: 'ComponentPageBlocksPerformanceHosting';
  hostingImage?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
  performances?: Maybe<Array<Maybe<ComponentPageComponentsPerformance>>>;
};


export type ComponentPageBlocksPerformanceHostingPerformancesArgs = {
  filters?: InputMaybe<ComponentPageComponentsPerformanceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksPlansPricingBlock = {
  __typename?: 'ComponentPageBlocksPlansPricingBlock';
  id: Scalars['ID'];
  plansCheckDescription?: Maybe<Scalars['String']>;
  plansCheckTitle?: Maybe<Scalars['String']>;
  plansList?: Maybe<Array<Maybe<ComponentPageComponentsPlansCheckList>>>;
  rowNumber?: Maybe<Enum_Componentpageblocksplanspricingblock_Rownumber>;
};


export type ComponentPageBlocksPlansPricingBlockPlansListArgs = {
  filters?: InputMaybe<ComponentPageComponentsPlansCheckListFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksRequirementsForm = {
  __typename?: 'ComponentPageBlocksRequirementsForm';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksResources = {
  __typename?: 'ComponentPageBlocksResources';
  id: Scalars['ID'];
  resourceCard?: Maybe<Array<Maybe<ComponentPageComponentsResources>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksResourcesResourceCardArgs = {
  filters?: InputMaybe<ComponentPageComponentsResourcesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksSellingPoints = {
  __typename?: 'ComponentPageBlocksSellingPoints';
  benefits?: Maybe<Array<Maybe<ComponentPageComponentsBenefit>>>;
  columns?: Maybe<Enum_Componentpageblockssellingpoints_Columns>;
  id: Scalars['ID'];
};


export type ComponentPageBlocksSellingPointsBenefitsArgs = {
  filters?: InputMaybe<ComponentPageComponentsBenefitFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksSignUp = {
  __typename?: 'ComponentPageBlocksSignUp';
  ctaButton?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  product_price?: Maybe<ProductPriceEntityResponse>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksSmallCards = {
  __typename?: 'ComponentPageBlocksSmallCards';
  id: Scalars['ID'];
  smallCard?: Maybe<Array<Maybe<ComponentPageComponentsSmallCard>>>;
};


export type ComponentPageBlocksSmallCardsSmallCardArgs = {
  filters?: InputMaybe<ComponentPageComponentsSmallCardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksSmallPricing = {
  __typename?: 'ComponentPageBlocksSmallPricing';
  cards?: Maybe<Array<Maybe<ComponentPageComponentsSmallPricing>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksSmallPricingCardsArgs = {
  filters?: InputMaybe<ComponentPageComponentsSmallPricingFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksSpacing = {
  __typename?: 'ComponentPageBlocksSpacing';
  id: Scalars['ID'];
  sizeHeight?: Maybe<Enum_Componentpageblocksspacing_Sizeheight>;
};

export type ComponentPageBlocksSslCards = {
  __typename?: 'ComponentPageBlocksSslCards';
  contactText?: Maybe<Scalars['String']>;
  firstSSLCard?: Maybe<ComponentPageComponentsSslBuy>;
  forthSSLCard?: Maybe<ComponentPageComponentsSslOrder>;
  id: Scalars['ID'];
  secondSSLCard?: Maybe<ComponentPageComponentsSslBuy>;
  thirdSLLCard?: Maybe<ComponentPageComponentsSslOrder>;
};

export type ComponentPageBlocksStepsBlock = {
  __typename?: 'ComponentPageBlocksStepsBlock';
  id: Scalars['ID'];
  steps?: Maybe<Array<Maybe<ComponentPageComponentsStep>>>;
};


export type ComponentPageBlocksStepsBlockStepsArgs = {
  filters?: InputMaybe<ComponentPageComponentsStepFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksTabHeader = {
  __typename?: 'ComponentPageBlocksTabHeader';
  id: Scalars['ID'];
  linkTabHeader?: Maybe<Scalars['String']>;
  options?: Maybe<Scalars['Boolean']>;
  optionsTabHeader?: Maybe<Array<Maybe<ComponentPageComponentsOptionsTabHeader>>>;
  titleTabHeader?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksTabHeaderOptionsTabHeaderArgs = {
  filters?: InputMaybe<ComponentPageComponentsOptionsTabHeaderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksTabHeaderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageBlocksTabHeaderFiltersInput>>>;
  linkTabHeader?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageBlocksTabHeaderFiltersInput>;
  options?: InputMaybe<BooleanFilterInput>;
  optionsTabHeader?: InputMaybe<ComponentPageComponentsOptionsTabHeaderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageBlocksTabHeaderFiltersInput>>>;
  titleTabHeader?: InputMaybe<StringFilterInput>;
};

export type ComponentPageBlocksTabHeaderInput = {
  id?: InputMaybe<Scalars['ID']>;
  linkTabHeader?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Scalars['Boolean']>;
  optionsTabHeader?: InputMaybe<Array<InputMaybe<ComponentPageComponentsOptionsTabHeaderInput>>>;
  titleTabHeader?: InputMaybe<Scalars['String']>;
};

export type ComponentPageBlocksTabPricing = {
  __typename?: 'ComponentPageBlocksTabPricing';
  carts?: Maybe<Array<Maybe<ComponentPageComponentsTabPricingCard>>>;
  id: Scalars['ID'];
};


export type ComponentPageBlocksTabPricingCartsArgs = {
  filters?: InputMaybe<ComponentPageComponentsTabPricingCardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksTeamSlider = {
  __typename?: 'ComponentPageBlocksTeamSlider';
  id: Scalars['ID'];
  slide?: Maybe<Array<Maybe<ComponentPageComponentsOurTeam>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksTeamSliderSlideArgs = {
  filters?: InputMaybe<ComponentPageComponentsOurTeamFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksTestBlock = {
  __typename?: 'ComponentPageBlocksTestBlock';
  id: Scalars['ID'];
  testingYnit?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksTestimonialCard = {
  __typename?: 'ComponentPageBlocksTestimonialCard';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
};

export type ComponentPageBlocksTestimonialSlider = {
  __typename?: 'ComponentPageBlocksTestimonialSlider';
  id: Scalars['ID'];
  testimonials?: Maybe<Array<Maybe<ComponentPageComponentsTestimonialImage>>>;
};


export type ComponentPageBlocksTestimonialSliderTestimonialsArgs = {
  filters?: InputMaybe<ComponentPageComponentsTestimonialImageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksTimeline = {
  __typename?: 'ComponentPageBlocksTimeline';
  element?: Maybe<Array<Maybe<ComponentPageComponentsVerticalElement>>>;
  id: Scalars['ID'];
};


export type ComponentPageBlocksTimelineElementArgs = {
  filters?: InputMaybe<ComponentPageComponentsVerticalElementFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksTitle = {
  __typename?: 'ComponentPageBlocksTitle';
  centeredTitle?: Maybe<ComponentPageComponentsTitle>;
  id: Scalars['ID'];
};

export type ComponentPageBlocksTitledTabs = {
  __typename?: 'ComponentPageBlocksTitledTabs';
  id: Scalars['ID'];
  tabs?: Maybe<Array<Maybe<ComponentPageComponentsTitledTab>>>;
};


export type ComponentPageBlocksTitledTabsTabsArgs = {
  filters?: InputMaybe<ComponentPageComponentsTitledTabFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksTransferDomain = {
  __typename?: 'ComponentPageBlocksTransferDomain';
  id: Scalars['ID'];
  notSupportedNonUk?: Maybe<Scalars['String']>;
  notSupportedRegNonUk?: Maybe<Scalars['String']>;
  notSupportedRegUk?: Maybe<Scalars['String']>;
  notSupportedUk?: Maybe<Scalars['String']>;
  supportedNonUk?: Maybe<Scalars['String']>;
  supportedUk?: Maybe<Scalars['String']>;
};

export type ComponentPageBlocksVpsCard = {
  __typename?: 'ComponentPageBlocksVpsCard';
  buttonVpsCard?: Maybe<ComponentPageComponentsButton>;
  cardVps?: Maybe<Array<Maybe<ComponentPageComponentsVpsCard>>>;
  id: Scalars['ID'];
};


export type ComponentPageBlocksVpsCardCardVpsArgs = {
  filters?: InputMaybe<ComponentPageComponentsVpsCardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageBlocksVpsResources = {
  __typename?: 'ComponentPageBlocksVpsResources';
  id: Scalars['ID'];
  ramText?: Maybe<ComponentPageComponentsResourcesText>;
  storage?: Maybe<ComponentPageComponentsResourcesText>;
  vcpu?: Maybe<ComponentPageComponentsResourcesText>;
};

export type ComponentPageBlocksVpsResourcesInput = {
  id?: InputMaybe<Scalars['ID']>;
  ramText?: InputMaybe<ComponentPageComponentsResourcesTextInput>;
  storage?: InputMaybe<ComponentPageComponentsResourcesTextInput>;
  vcpu?: InputMaybe<ComponentPageComponentsResourcesTextInput>;
};

export type ComponentPageBlocksWhyUsBlock = {
  __typename?: 'ComponentPageBlocksWhyUsBlock';
  backgroundImage?: Maybe<UploadFileEntityResponse>;
  benefits?: Maybe<Array<Maybe<ComponentPageComponentsBenefit>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentPageBlocksWhyUsBlockBenefitsArgs = {
  filters?: InputMaybe<ComponentPageComponentsBenefitFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageComponentsAccordion = {
  __typename?: 'ComponentPageComponentsAccordion';
  accordionItems?: Maybe<Array<Maybe<ComponentPageComponentsAccordionItem>>>;
  id: Scalars['ID'];
  shape?: Maybe<Enum_Componentpagecomponentsaccordion_Shape>;
};


export type ComponentPageComponentsAccordionAccordionItemsArgs = {
  filters?: InputMaybe<ComponentPageComponentsAccordionItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageComponentsAccordionAndTitle = {
  __typename?: 'ComponentPageComponentsAccordionAndTitle';
  accordionItems: Scalars['JSON'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ComponentPageComponentsAccordionAndTitleFiltersInput = {
  accordionItems?: InputMaybe<JsonFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsAccordionAndTitleFiltersInput>>>;
  not?: InputMaybe<ComponentPageComponentsAccordionAndTitleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsAccordionAndTitleFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsAccordionArrowItem = {
  __typename?: 'ComponentPageComponentsAccordionArrowItem';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsAccordionArrowItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsAccordionArrowItemFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsAccordionArrowItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsAccordionArrowItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsAccordionItem = {
  __typename?: 'ComponentPageComponentsAccordionItem';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsAccordionItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsAccordionItemFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsAccordionItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsAccordionItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsAgyCard = {
  __typename?: 'ComponentPageComponentsAgyCard';
  card_products?: Maybe<ProductRelationResponseCollection>;
  descriptionAgyCard?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  performancesAgyCard?: Maybe<Scalars['String']>;
  saveText?: Maybe<Scalars['String']>;
  titleAgyCard?: Maybe<Scalars['String']>;
  withLocation?: Maybe<Array<Maybe<ComponentPageComponentsWithLocation>>>;
};


export type ComponentPageComponentsAgyCardCard_ProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentPageComponentsAgyCardWithLocationArgs = {
  filters?: InputMaybe<ComponentPageComponentsWithLocationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageComponentsBenefit = {
  __typename?: 'ComponentPageComponentsBenefit';
  alignment?: Maybe<Enum_Componentpagecomponentsbenefit_Alignment>;
  buttonColor?: Maybe<Enum_Componentpagecomponentsbenefit_Buttoncolor>;
  buttonCta?: Maybe<Scalars['String']>;
  buttonLink?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsBenefitFiltersInput = {
  alignment?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsBenefitFiltersInput>>>;
  buttonColor?: InputMaybe<StringFilterInput>;
  buttonCta?: InputMaybe<StringFilterInput>;
  buttonLink?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsBenefitFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsBenefitFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsButton = {
  __typename?: 'ComponentPageComponentsButton';
  cta?: Maybe<Scalars['String']>;
  hasLink?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsButtonFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsButtonFiltersInput>>>;
  cta?: InputMaybe<StringFilterInput>;
  hasLink?: InputMaybe<BooleanFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsButtonFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsButtonFiltersInput>>>;
};

export type ComponentPageComponentsButtonInput = {
  cta?: InputMaybe<Scalars['String']>;
  hasLink?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<Scalars['String']>;
};

export type ComponentPageComponentsButtonWithColor = {
  __typename?: 'ComponentPageComponentsButtonWithColor';
  color?: Maybe<Enum_Componentpagecomponentsbuttonwithcolor_Color>;
  cta?: Maybe<Scalars['String']>;
  hasLink?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsButtonWithColorFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsButtonWithColorFiltersInput>>>;
  color?: InputMaybe<StringFilterInput>;
  cta?: InputMaybe<StringFilterInput>;
  hasLink?: InputMaybe<BooleanFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsButtonWithColorFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsButtonWithColorFiltersInput>>>;
};

export type ComponentPageComponentsButtonWithColorInput = {
  color?: InputMaybe<Enum_Componentpagecomponentsbuttonwithcolor_Color>;
  cta?: InputMaybe<Scalars['String']>;
  hasLink?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<Scalars['String']>;
};

export type ComponentPageComponentsCdnCard = {
  __typename?: 'ComponentPageComponentsCdnCard';
  cdn_addon?: Maybe<ProductEntityResponse>;
  cdn_product?: Maybe<ProductEntityResponse>;
  descriptionCDN?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  performancesCDNCard?: Maybe<Scalars['String']>;
  saveTextCdnCard?: Maybe<Scalars['String']>;
  titleCDN?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsCenteredDescription = {
  __typename?: 'ComponentPageComponentsCenteredDescription';
  alignment?: Maybe<Enum_Componentpagecomponentscentereddescription_Alignment>;
  cta?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ComponentPageComponentsCheckCard = {
  __typename?: 'ComponentPageComponentsCheckCard';
  checklistItems?: Maybe<Scalars['JSON']>;
  ctaButton?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imgageCheckCard?: Maybe<UploadFileEntityResponse>;
  linkButton?: Maybe<Scalars['String']>;
  subTitleCheckCard?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsCheckCardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsCheckCardFiltersInput>>>;
  checklistItems?: InputMaybe<JsonFilterInput>;
  ctaButton?: InputMaybe<StringFilterInput>;
  linkButton?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsCheckCardFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsCheckCardFiltersInput>>>;
  subTitleCheckCard?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsCheckListItem = {
  __typename?: 'ComponentPageComponentsCheckListItem';
  checking?: Maybe<Enum_Componentpagecomponentschecklistitem_Checking>;
  cta?: Maybe<Scalars['String']>;
  ctaButton?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  linkButton?: Maybe<Scalars['String']>;
  theme?: Maybe<Enum_Componentpagecomponentschecklistitem_Theme>;
};

export type ComponentPageComponentsCheckListItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsCheckListItemFiltersInput>>>;
  checking?: InputMaybe<StringFilterInput>;
  cta?: InputMaybe<StringFilterInput>;
  ctaButton?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  linkButton?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsCheckListItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsCheckListItemFiltersInput>>>;
  theme?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsCheckListItemInput = {
  checking?: InputMaybe<Enum_Componentpagecomponentschecklistitem_Checking>;
  cta?: InputMaybe<Scalars['String']>;
  ctaButton?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  linkButton?: InputMaybe<Scalars['String']>;
  theme?: InputMaybe<Enum_Componentpagecomponentschecklistitem_Theme>;
};

export type ComponentPageComponentsCircleItem = {
  __typename?: 'ComponentPageComponentsCircleItem';
  descriptionItemCircle?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  titleItemCircle?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsContactCard = {
  __typename?: 'ComponentPageComponentsContactCard';
  buttonContactFormCard?: Maybe<Scalars['String']>;
  descriptionContactFormCard?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mailToContactForm?: Maybe<Scalars['String']>;
  titleContactFormCard?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsContactLinkCard = {
  __typename?: 'ComponentPageComponentsContactLinkCard';
  buttonCtaContact?: Maybe<Scalars['String']>;
  buttonLinkContact?: Maybe<Scalars['String']>;
  descriptionLinkContent?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  titleLinkCard?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsContactVps = {
  __typename?: 'ComponentPageComponentsContactVps';
  DescCont?: Maybe<Scalars['String']>;
  buttonContCta?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  linkButtonCont?: Maybe<Scalars['String']>;
  titleCont?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsContactVpsInput = {
  DescCont?: InputMaybe<Scalars['String']>;
  buttonContCta?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  linkButtonCont?: InputMaybe<Scalars['String']>;
  titleCont?: InputMaybe<Scalars['String']>;
};

export type ComponentPageComponentsContent = {
  __typename?: 'ComponentPageComponentsContent';
  id: Scalars['ID'];
  items?: Maybe<Scalars['JSON']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsContentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsContentFiltersInput>>>;
  items?: InputMaybe<JsonFilterInput>;
  not?: InputMaybe<ComponentPageComponentsContentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsContentFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsCustomServerCard = {
  __typename?: 'ComponentPageComponentsCustomServerCard';
  cartValue?: Maybe<Scalars['JSON']>;
  ctaButton?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  linkButton?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsDefaultBox = {
  __typename?: 'ComponentPageComponentsDefaultBox';
  buttonBoxCta?: Maybe<Scalars['String']>;
  buttonBoxLink?: Maybe<Scalars['String']>;
  descriptionBox?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  numberOfCpuDefaul?: Maybe<Scalars['Long']>;
  numberOfRamDefault?: Maybe<Scalars['Long']>;
  numberOfStorageDefault?: Maybe<Scalars['Long']>;
  productsDefault?: Maybe<ProductRelationResponseCollection>;
  subtitleBox?: Maybe<Scalars['String']>;
  titleBox?: Maybe<Scalars['String']>;
};


export type ComponentPageComponentsDefaultBoxProductsDefaultArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageComponentsDescription = {
  __typename?: 'ComponentPageComponentsDescription';
  alignment?: Maybe<Enum_Componentpagecomponentsdescription_Alignment>;
  contentDescription?: Maybe<Scalars['String']>;
  fontsize?: Maybe<Enum_Componentpagecomponentsdescription_Fontsize>;
  id: Scalars['ID'];
};

export type ComponentPageComponentsEhloBox = {
  __typename?: 'ComponentPageComponentsEhloBox';
  descriptionEhloBox?: Maybe<Scalars['String']>;
  ehlo_products?: Maybe<ProductRelationResponseCollection>;
  id: Scalars['ID'];
  performancesEhloBox?: Maybe<Scalars['String']>;
  saveTextEhlo?: Maybe<Scalars['String']>;
  titleEhloBox?: Maybe<Scalars['String']>;
  withLocationEhlo?: Maybe<Array<Maybe<ComponentPageComponentsWithLocation>>>;
};


export type ComponentPageComponentsEhloBoxEhlo_ProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentPageComponentsEhloBoxWithLocationEhloArgs = {
  filters?: InputMaybe<ComponentPageComponentsWithLocationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageComponentsHelpAndSupport = {
  __typename?: 'ComponentPageComponentsHelpAndSupport';
  id: Scalars['ID'];
  labelFooter?: Maybe<Scalars['String']>;
  linkFooter?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsHelpAndSupportFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsHelpAndSupportFiltersInput>>>;
  labelFooter?: InputMaybe<StringFilterInput>;
  linkFooter?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsHelpAndSupportFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsHelpAndSupportFiltersInput>>>;
};

export type ComponentPageComponentsHelpAndSupportInput = {
  id?: InputMaybe<Scalars['ID']>;
  labelFooter?: InputMaybe<Scalars['String']>;
  linkFooter?: InputMaybe<Scalars['String']>;
};

export type ComponentPageComponentsImageWithTitle = {
  __typename?: 'ComponentPageComponentsImageWithTitle';
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsImageWithTitleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsImageWithTitleFiltersInput>>>;
  not?: InputMaybe<ComponentPageComponentsImageWithTitleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsImageWithTitleFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsInfoCard = {
  __typename?: 'ComponentPageComponentsInfoCard';
  aboveTitleInfoCard?: Maybe<Scalars['String']>;
  colorOfContent?: Maybe<Enum_Componentpagecomponentsinfocard_Colorofcontent>;
  descriptionInfoCard?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  infoImage?: Maybe<UploadFileEntityResponse>;
  optionalCtaButtonInfoCard?: Maybe<Scalars['String']>;
  optionalLinkButtonInfoCard?: Maybe<Scalars['String']>;
  subTitleInfoCard?: Maybe<Scalars['String']>;
  titleInfoCard?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsInfoCardFiltersInput = {
  aboveTitleInfoCard?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsInfoCardFiltersInput>>>;
  colorOfContent?: InputMaybe<StringFilterInput>;
  descriptionInfoCard?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsInfoCardFiltersInput>;
  optionalCtaButtonInfoCard?: InputMaybe<StringFilterInput>;
  optionalLinkButtonInfoCard?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsInfoCardFiltersInput>>>;
  subTitleInfoCard?: InputMaybe<StringFilterInput>;
  titleInfoCard?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsOptionsTabHeader = {
  __typename?: 'ComponentPageComponentsOptionsTabHeader';
  blurbOptionTab?: Maybe<Scalars['String']>;
  buttonOptionTab?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  linkOptionTab?: Maybe<Scalars['String']>;
  logoOptionTab?: Maybe<UploadFileEntityResponse>;
  titleOptionTab?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsOptionsTabHeaderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsOptionsTabHeaderFiltersInput>>>;
  blurbOptionTab?: InputMaybe<StringFilterInput>;
  buttonOptionTab?: InputMaybe<StringFilterInput>;
  linkOptionTab?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsOptionsTabHeaderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsOptionsTabHeaderFiltersInput>>>;
  titleOptionTab?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsOptionsTabHeaderInput = {
  blurbOptionTab?: InputMaybe<Scalars['String']>;
  buttonOptionTab?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  linkOptionTab?: InputMaybe<Scalars['String']>;
  logoOptionTab?: InputMaybe<Scalars['ID']>;
  titleOptionTab?: InputMaybe<Scalars['String']>;
};

export type ComponentPageComponentsOurTeam = {
  __typename?: 'ComponentPageComponentsOurTeam';
  backgroundImage?: Maybe<UploadFileEntityResponse>;
  bigImage?: Maybe<UploadFileEntityResponse>;
  ceo?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  testimonialDesc?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsOurTeamFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsOurTeamFiltersInput>>>;
  ceo?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsOurTeamFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsOurTeamFiltersInput>>>;
  testimonialDesc?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsPerformance = {
  __typename?: 'ComponentPageComponentsPerformance';
  id: Scalars['ID'];
  performanece?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsPerformanceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsPerformanceFiltersInput>>>;
  not?: InputMaybe<ComponentPageComponentsPerformanceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsPerformanceFiltersInput>>>;
  performanece?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsPlansCheckList = {
  __typename?: 'ComponentPageComponentsPlansCheckList';
  checking?: Maybe<Enum_Componentpagecomponentsplanschecklist_Checking>;
  id: Scalars['ID'];
  plansTitle?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsPlansCheckListFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsPlansCheckListFiltersInput>>>;
  checking?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsPlansCheckListFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsPlansCheckListFiltersInput>>>;
  plansTitle?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsPricePerCurrency = {
  __typename?: 'ComponentPageComponentsPricePerCurrency';
  currency?: Maybe<CurrencyEntityResponse>;
  id: Scalars['ID'];
  pricePC?: Maybe<Scalars['Float']>;
};

export type ComponentPageComponentsPricePerCurrencyFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsPricePerCurrencyFiltersInput>>>;
  currency?: InputMaybe<CurrencyFiltersInput>;
  not?: InputMaybe<ComponentPageComponentsPricePerCurrencyFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsPricePerCurrencyFiltersInput>>>;
  pricePC?: InputMaybe<FloatFilterInput>;
};

export type ComponentPageComponentsPriceSsl = {
  __typename?: 'ComponentPageComponentsPriceSsl';
  currency?: Maybe<CurrencyEntityResponse>;
  id: Scalars['ID'];
  priceSSL?: Maybe<Scalars['Float']>;
};

export type ComponentPageComponentsRegCard = {
  __typename?: 'ComponentPageComponentsRegCard';
  data?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
};

export type ComponentPageComponentsResources = {
  __typename?: 'ComponentPageComponentsResources';
  data?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
};

export type ComponentPageComponentsResourcesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsResourcesFiltersInput>>>;
  data?: InputMaybe<JsonFilterInput>;
  not?: InputMaybe<ComponentPageComponentsResourcesFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsResourcesFiltersInput>>>;
};

export type ComponentPageComponentsResourcesText = {
  __typename?: 'ComponentPageComponentsResourcesText';
  descriptionRes?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  titleResources?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsResourcesTextInput = {
  descriptionRes?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  titleResources?: InputMaybe<Scalars['String']>;
};

export type ComponentPageComponentsServerCard = {
  __typename?: 'ComponentPageComponentsServerCard';
  annualPrice?: Maybe<Scalars['Float']>;
  cartValue?: Maybe<Scalars['JSON']>;
  checklistItems?: Maybe<Scalars['JSON']>;
  ctaFirstButton?: Maybe<Scalars['String']>;
  ctaSecondButton?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  linkFirstButton?: Maybe<Scalars['String']>;
  linkSecondButton?: Maybe<Scalars['String']>;
  monthPrice?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  valuta?: Maybe<Enum_Componentpagecomponentsservercard_Valuta>;
};

export type ComponentPageComponentsSmallCard = {
  __typename?: 'ComponentPageComponentsSmallCard';
  descCard?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imgDomain?: Maybe<UploadFileEntityResponse>;
  priceTitle?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsSmallCardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsSmallCardFiltersInput>>>;
  descCard?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsSmallCardFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsSmallCardFiltersInput>>>;
  priceTitle?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsSmallPricing = {
  __typename?: 'ComponentPageComponentsSmallPricing';
  checklistItems?: Maybe<Scalars['JSON']>;
  ctaButton?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  linkButton?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  value?: Maybe<Enum_Componentpagecomponentssmallpricing_Value>;
};

export type ComponentPageComponentsSmallPricingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsSmallPricingFiltersInput>>>;
  checklistItems?: InputMaybe<JsonFilterInput>;
  ctaButton?: InputMaybe<StringFilterInput>;
  linkButton?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsSmallPricingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsSmallPricingFiltersInput>>>;
  price?: InputMaybe<FloatFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  value?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsSocialMedia = {
  __typename?: 'ComponentPageComponentsSocialMedia';
  id: Scalars['ID'];
  linkSocialMedia?: Maybe<Scalars['String']>;
  logoSocialMedia?: Maybe<UploadFileEntityResponse>;
};

export type ComponentPageComponentsSocialMediaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsSocialMediaFiltersInput>>>;
  linkSocialMedia?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsSocialMediaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsSocialMediaFiltersInput>>>;
};

export type ComponentPageComponentsSocialMediaInput = {
  id?: InputMaybe<Scalars['ID']>;
  linkSocialMedia?: InputMaybe<Scalars['String']>;
  logoSocialMedia?: InputMaybe<Scalars['ID']>;
};

export type ComponentPageComponentsSslBuy = {
  __typename?: 'ComponentPageComponentsSslBuy';
  descriptionSSLBuy?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  sslproduct?: Maybe<ProductEntityResponse>;
  titleSSLBuy?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsSslOrder = {
  __typename?: 'ComponentPageComponentsSslOrder';
  descriptionSSLOrder?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  priceStartFrom?: Maybe<Scalars['JSON']>;
  titleSSLOrder?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsStep = {
  __typename?: 'ComponentPageComponentsStep';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsStepFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsStepFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsStepFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsStepFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsTabPricingCard = {
  __typename?: 'ComponentPageComponentsTabPricingCard';
  data?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
};

export type ComponentPageComponentsTabPricingCardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsTabPricingCardFiltersInput>>>;
  data?: InputMaybe<JsonFilterInput>;
  not?: InputMaybe<ComponentPageComponentsTabPricingCardFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsTabPricingCardFiltersInput>>>;
};

export type ComponentPageComponentsTestimonialImage = {
  __typename?: 'ComponentPageComponentsTestimonialImage';
  bigImage?: Maybe<UploadFileEntityResponse>;
  ceo?: Maybe<Scalars['String']>;
  ceoImage?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
  readMore?: Maybe<Scalars['String']>;
  testimonialDesc?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsTestimonialImageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsTestimonialImageFiltersInput>>>;
  ceo?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsTestimonialImageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsTestimonialImageFiltersInput>>>;
  readMore?: InputMaybe<StringFilterInput>;
  testimonialDesc?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsTitle = {
  __typename?: 'ComponentPageComponentsTitle';
  aligment?: Maybe<Enum_Componentpagecomponentstitle_Aligment>;
  cta?: Maybe<Scalars['String']>;
  fontSize?: Maybe<Enum_Componentpagecomponentstitle_Fontsize>;
  id: Scalars['ID'];
};

export type ComponentPageComponentsTitledTab = {
  __typename?: 'ComponentPageComponentsTitledTab';
  buttonCta?: Maybe<Scalars['String']>;
  buttonLink?: Maybe<Scalars['String']>;
  hasButton?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  pairs?: Maybe<Scalars['JSON']>;
  tabTitle?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsTitledTabFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsTitledTabFiltersInput>>>;
  buttonCta?: InputMaybe<StringFilterInput>;
  buttonLink?: InputMaybe<StringFilterInput>;
  hasButton?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<ComponentPageComponentsTitledTabFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsTitledTabFiltersInput>>>;
  pairs?: InputMaybe<JsonFilterInput>;
  tabTitle?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsVerticalElement = {
  __typename?: 'ComponentPageComponentsVerticalElement';
  buttonCTA?: Maybe<Scalars['String']>;
  buttonLink?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsVerticalElementFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsVerticalElementFiltersInput>>>;
  buttonCTA?: InputMaybe<StringFilterInput>;
  buttonLink?: InputMaybe<StringFilterInput>;
  desc?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsVerticalElementFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsVerticalElementFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsVpsBox = {
  __typename?: 'ComponentPageComponentsVpsBox';
  descriptionVpsBox?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  numberOfCpu?: Maybe<Scalars['Long']>;
  numberOfRam?: Maybe<Scalars['Long']>;
  numberOfStorage?: Maybe<Scalars['Long']>;
  performancesVpsBox?: Maybe<Scalars['String']>;
  saveTextVps?: Maybe<Scalars['String']>;
  titleVpsBox?: Maybe<Scalars['String']>;
  vps_products?: Maybe<ProductRelationResponseCollection>;
  withLocationMvps?: Maybe<Array<Maybe<ComponentPageComponentsWithLocation>>>;
};


export type ComponentPageComponentsVpsBoxVps_ProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentPageComponentsVpsBoxWithLocationMvpsArgs = {
  filters?: InputMaybe<ComponentPageComponentsWithLocationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageComponentsVpsCard = {
  __typename?: 'ComponentPageComponentsVpsCard';
  checklistItemsVps?: Maybe<Scalars['JSON']>;
  ctaButtonVps?: Maybe<Scalars['String']>;
  descriptionVps?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageTopVps?: Maybe<UploadFileEntityResponse>;
  linkButtonVps?: Maybe<Scalars['String']>;
  titleVps?: Maybe<Scalars['String']>;
};

export type ComponentPageComponentsVpsCardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsVpsCardFiltersInput>>>;
  checklistItemsVps?: InputMaybe<JsonFilterInput>;
  ctaButtonVps?: InputMaybe<StringFilterInput>;
  descriptionVps?: InputMaybe<StringFilterInput>;
  linkButtonVps?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageComponentsVpsCardFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsVpsCardFiltersInput>>>;
  titleVps?: InputMaybe<StringFilterInput>;
};

export type ComponentPageComponentsWithLocation = {
  __typename?: 'ComponentPageComponentsWithLocation';
  id: Scalars['ID'];
  location?: Maybe<LocationEntityResponse>;
  pricePerCurrency?: Maybe<Array<Maybe<ComponentPageComponentsPricePerCurrency>>>;
};


export type ComponentPageComponentsWithLocationPricePerCurrencyArgs = {
  filters?: InputMaybe<ComponentPageComponentsPricePerCurrencyFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageComponentsWithLocationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageComponentsWithLocationFiltersInput>>>;
  location?: InputMaybe<LocationFiltersInput>;
  not?: InputMaybe<ComponentPageComponentsWithLocationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageComponentsWithLocationFiltersInput>>>;
  pricePerCurrency?: InputMaybe<ComponentPageComponentsPricePerCurrencyFiltersInput>;
};

export type ComponentPageUtilsSeo = {
  __typename?: 'ComponentPageUtilsSeo';
  id: Scalars['ID'];
  meta?: Maybe<Array<Maybe<ComponentPageUtilsSeoMeta>>>;
  metaDescription?: Maybe<Scalars['String']>;
  metaTitle?: Maybe<Scalars['String']>;
  preventIndexing?: Maybe<Scalars['Boolean']>;
};


export type ComponentPageUtilsSeoMetaArgs = {
  filters?: InputMaybe<ComponentPageUtilsSeoMetaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentPageUtilsSeoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageUtilsSeoFiltersInput>>>;
  meta?: InputMaybe<ComponentPageUtilsSeoMetaFiltersInput>;
  metaDescription?: InputMaybe<StringFilterInput>;
  metaTitle?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageUtilsSeoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageUtilsSeoFiltersInput>>>;
  preventIndexing?: InputMaybe<BooleanFilterInput>;
};

export type ComponentPageUtilsSeoInput = {
  id?: InputMaybe<Scalars['ID']>;
  meta?: InputMaybe<Array<InputMaybe<ComponentPageUtilsSeoMetaInput>>>;
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  preventIndexing?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentPageUtilsSeoMeta = {
  __typename?: 'ComponentPageUtilsSeoMeta';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Enum_Componentpageutilsseometa_Name>;
};

export type ComponentPageUtilsSeoMetaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentPageUtilsSeoMetaFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentPageUtilsSeoMetaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentPageUtilsSeoMetaFiltersInput>>>;
};

export type ComponentPageUtilsSeoMetaInput = {
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Enum_Componentpageutilsseometa_Name>;
};

export type Core = {
  __typename?: 'Core';
  chargebeeApp?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  fusionauthClientId: Scalars['String'];
  fusionauthEndpoint?: Maybe<Scalars['String']>;
  stripePublishableKey: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CoreEntity = {
  __typename?: 'CoreEntity';
  attributes?: Maybe<Core>;
  id?: Maybe<Scalars['ID']>;
};

export type CoreEntityResponse = {
  __typename?: 'CoreEntityResponse';
  data?: Maybe<CoreEntity>;
};

export type CoreInput = {
  chargebeeApp?: InputMaybe<Scalars['String']>;
  chargebeeFullAccessApikey?: InputMaybe<Scalars['String']>;
  chargebeeGatewayId?: InputMaybe<Scalars['String']>;
  chargebeePublicApikey?: InputMaybe<Scalars['String']>;
  fraudCheckToken?: InputMaybe<Scalars['String']>;
  fraudCheckUrl?: InputMaybe<Scalars['String']>;
  fusionauthApiKey?: InputMaybe<Scalars['String']>;
  fusionauthApplicationId?: InputMaybe<Scalars['String']>;
  fusionauthClientId?: InputMaybe<Scalars['String']>;
  fusionauthClientSecret?: InputMaybe<Scalars['String']>;
  fusionauthEndpoint?: InputMaybe<Scalars['String']>;
  fusionauthTenantId?: InputMaybe<Scalars['String']>;
  stripePublishableKey?: InputMaybe<Scalars['String']>;
  stripeSecretKey?: InputMaybe<Scalars['String']>;
};

export type Currency = {
  __typename?: 'Currency';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CurrencyEntity = {
  __typename?: 'CurrencyEntity';
  attributes?: Maybe<Currency>;
  id?: Maybe<Scalars['ID']>;
};

export type CurrencyEntityResponse = {
  __typename?: 'CurrencyEntityResponse';
  data?: Maybe<CurrencyEntity>;
};

export type CurrencyEntityResponseCollection = {
  __typename?: 'CurrencyEntityResponseCollection';
  data: Array<CurrencyEntity>;
  meta: ResponseCollectionMeta;
};

export type CurrencyFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CurrencyFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CurrencyFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CurrencyFiltersInput>>>;
  symbol?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CurrencyInput = {
  code?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
};

export type Customer = {
  __typename?: 'Customer';
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  addressLine3?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  company?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  currencyCode: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  orderItems?: Maybe<Scalars['JSON']>;
  phone: Scalars['String'];
  postCode: Scalars['String'];
  stateCode?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  vatNumber?: Maybe<Scalars['String']>;
};

export type CustomerEntity = {
  __typename?: 'CustomerEntity';
  attributes?: Maybe<Customer>;
  id?: Maybe<Scalars['ID']>;
};

export type CustomerEntityResponse = {
  __typename?: 'CustomerEntityResponse';
  data?: Maybe<CustomerEntity>;
};

export type CustomerEntityResponseCollection = {
  __typename?: 'CustomerEntityResponseCollection';
  data: Array<CustomerEntity>;
  meta: ResponseCollectionMeta;
};

export type CustomerFiltersInput = {
  addressLine1?: InputMaybe<StringFilterInput>;
  addressLine2?: InputMaybe<StringFilterInput>;
  addressLine3?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<CustomerFiltersInput>>>;
  city?: InputMaybe<StringFilterInput>;
  company?: InputMaybe<StringFilterInput>;
  country?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  currencyCode?: InputMaybe<StringFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  firstName?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lastName?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CustomerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CustomerFiltersInput>>>;
  orderItems?: InputMaybe<JsonFilterInput>;
  phone?: InputMaybe<StringFilterInput>;
  postCode?: InputMaybe<StringFilterInput>;
  stateCode?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  vatNumber?: InputMaybe<StringFilterInput>;
};

export type CustomerInput = {
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  addressLine3?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  currencyCode?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  orderItems?: InputMaybe<Scalars['JSON']>;
  phone?: InputMaybe<Scalars['String']>;
  postCode?: InputMaybe<Scalars['String']>;
  stateCode?: InputMaybe<Scalars['String']>;
  vatNumber?: InputMaybe<Scalars['String']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  eqi?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  nei?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export enum Enum_Blog_Category {
  BestPractice = 'Best_Practice',
  CaseStudies = 'Case_Studies',
  CloudVps = 'Cloud_VPS',
  Company = 'Company',
  DomainNames = 'Domain_names',
  Events = 'Events',
  GuestPosts = 'Guest_Posts',
  HintsAndTips = 'Hints_and_Tips',
  JelasticPaaS = 'Jelastic_PaaS',
  Php = 'PHP',
  SslCertificates = 'SSL_Certificates',
  Uncategorized = 'Uncategorized'
}

export enum Enum_Componentpageblocksabouthero_Mobilespacing {
  L = 'l',
  M = 'm',
  None = 'none',
  S = 's',
  Xl = 'xl',
  Xs = 'xs',
  Xxl = 'xxl',
  Xxxl = 'xxxl'
}

export enum Enum_Componentpageblocksbanner_Colorofbanner {
  Liliac = 'liliac',
  Teal = 'teal'
}

export enum Enum_Componentpageblocksdescription_Alignment {
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export enum Enum_Componentpageblocksdescription_Fontsize {
  Big = 'Big',
  Small = 'Small'
}

export enum Enum_Componentpageblocksheroblog_Size {
  Large = 'large',
  Small = 'small'
}

export enum Enum_Componentpageblockshero_Size {
  Large = 'large',
  Small = 'small'
}

export enum Enum_Componentpageblocksinfocards_Numberofshowingcardsinrow {
  Four = 'four',
  Three = 'three',
  Two = 'two'
}

export enum Enum_Componentpageblocksmeettheteam_Backgroundcolor {
  Lilac = 'lilac',
  Teal = 'teal',
  White = 'white'
}

export enum Enum_Componentpageblocksmeettheteam_Imageposition {
  Left = 'left',
  Right = 'right'
}

export enum Enum_Componentpageblocksplanspricingblock_Rownumber {
  Double = 'double',
  Single = 'single',
  Triple = 'triple'
}

export enum Enum_Componentpageblockssellingpoints_Columns {
  Five = 'Five',
  Four = 'Four',
  Six = 'Six',
  Three = 'Three',
  Two = 'Two'
}

export enum Enum_Componentpageblocksspacing_Sizeheight {
  L = 'l',
  M = 'm',
  S = 's',
  Xl = 'xl',
  Xs = 'xs',
  Xxl = 'xxl',
  Xxxl = 'xxxl'
}

export enum Enum_Componentpagecomponentsaccordion_Shape {
  Arrow = 'arrow',
  Plus = 'plus'
}

export enum Enum_Componentpagecomponentsbenefit_Alignment {
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export enum Enum_Componentpagecomponentsbenefit_Buttoncolor {
  Primary = 'primary',
  Tertiary = 'tertiary'
}

export enum Enum_Componentpagecomponentsbuttonwithcolor_Color {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary'
}

export enum Enum_Componentpagecomponentscentereddescription_Alignment {
  Blog = 'blog',
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export enum Enum_Componentpagecomponentschecklistitem_Checking {
  Check = 'check',
  Cross = 'cross',
  Empty = 'empty'
}

export enum Enum_Componentpagecomponentschecklistitem_Theme {
  Quaternary = 'quaternary',
  Secondary = 'secondary',
  Simple = 'simple'
}

export enum Enum_Componentpagecomponentsdescription_Alignment {
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export enum Enum_Componentpagecomponentsdescription_Fontsize {
  Big = 'big',
  Small = 'small'
}

export enum Enum_Componentpagecomponentsinfocard_Colorofcontent {
  Purple = 'purple',
  Teal = 'teal'
}

export enum Enum_Componentpagecomponentsplanschecklist_Checking {
  Check = 'check',
  Cross = 'cross',
  Empty = 'empty'
}

export enum Enum_Componentpagecomponentsservercard_Valuta {
  Dollar = 'dollar',
  Euro = 'euro',
  Pound = 'pound'
}

export enum Enum_Componentpagecomponentssmallpricing_Value {
  Dollar = 'dollar',
  Euro = 'euro',
  Pound = 'pound'
}

export enum Enum_Componentpagecomponentstitle_Aligment {
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export enum Enum_Componentpagecomponentstitle_Fontsize {
  Big = 'Big',
  Small = 'Small'
}

export enum Enum_Componentpageutilsseometa_Name {
  Author = 'author',
  Keywords = 'keywords',
  Rating = 'rating'
}

export enum Enum_Productprice_Currency {
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD'
}

export enum Enum_Productprice_Period {
  Month = 'month',
  Year = 'year'
}

export enum Enum_Productprice_Pricetype {
  Addon = 'addon',
  Plan = 'plan'
}

export enum Enum_Product_Producttype {
  Addon = 'addon',
  Plan = 'plan'
}

export type Error = {
  __typename?: 'Error';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  eqi?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  nei?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type Footer = {
  __typename?: 'Footer';
  createdAt?: Maybe<Scalars['DateTime']>;
  footerLogo?: Maybe<UploadFileEntityResponse>;
  helpAndSupport?: Maybe<Array<Maybe<ComponentPageComponentsHelpAndSupport>>>;
  present?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  socialMedia?: Maybe<Array<Maybe<ComponentPageComponentsSocialMedia>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type FooterHelpAndSupportArgs = {
  filters?: InputMaybe<ComponentPageComponentsHelpAndSupportFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type FooterSocialMediaArgs = {
  filters?: InputMaybe<ComponentPageComponentsSocialMediaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FooterEntity = {
  __typename?: 'FooterEntity';
  attributes?: Maybe<Footer>;
  id?: Maybe<Scalars['ID']>;
};

export type FooterEntityResponse = {
  __typename?: 'FooterEntityResponse';
  data?: Maybe<FooterEntity>;
};

export type FooterInput = {
  footerLogo?: InputMaybe<Scalars['ID']>;
  helpAndSupport?: InputMaybe<Array<InputMaybe<ComponentPageComponentsHelpAndSupportInput>>>;
  present?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  socialMedia?: InputMaybe<Array<InputMaybe<ComponentPageComponentsSocialMediaInput>>>;
};

export type GenericMorph = Blog | ComponentPageBlocksAboutHero | ComponentPageBlocksAccordionCart | ComponentPageBlocksAccordionDouble | ComponentPageBlocksAccordionPlus | ComponentPageBlocksAgencyHostingVps | ComponentPageBlocksArticles | ComponentPageBlocksBanner | ComponentPageBlocksBannerBgImage | ComponentPageBlocksBannerLiliacHome | ComponentPageBlocksBannerTealHome | ComponentPageBlocksBenefits | ComponentPageBlocksBreadcrumbs | ComponentPageBlocksButtons | ComponentPageBlocksCallToAction | ComponentPageBlocksCdnCards | ComponentPageBlocksCenteredDesc | ComponentPageBlocksCheckCard | ComponentPageBlocksCircleImage | ComponentPageBlocksCircledLeftImage | ComponentPageBlocksCircledRightImage | ComponentPageBlocksContact | ComponentPageBlocksContactUsForm | ComponentPageBlocksDescription | ComponentPageBlocksDomainSearch | ComponentPageBlocksDomainsName | ComponentPageBlocksEhloMail | ComponentPageBlocksFaq | ComponentPageBlocksFaqList | ComponentPageBlocksFiles | ComponentPageBlocksHero | ComponentPageBlocksHeroBlog | ComponentPageBlocksHomepageForm | ComponentPageBlocksIconBanner | ComponentPageBlocksImage | ComponentPageBlocksImageWithTitle | ComponentPageBlocksInfoCards | ComponentPageBlocksKeyFeatures | ComponentPageBlocksKeyFeaturesVps | ComponentPageBlocksLeftIconImage | ComponentPageBlocksLeftImageRightText | ComponentPageBlocksLeftTitleRightDescription | ComponentPageBlocksManagedVps | ComponentPageBlocksMarqee | ComponentPageBlocksMeetTheTeam | ComponentPageBlocksNewHero | ComponentPageBlocksPerformanceHosting | ComponentPageBlocksPlansPricingBlock | ComponentPageBlocksRequirementsForm | ComponentPageBlocksResources | ComponentPageBlocksSellingPoints | ComponentPageBlocksSignUp | ComponentPageBlocksSmallCards | ComponentPageBlocksSmallPricing | ComponentPageBlocksSpacing | ComponentPageBlocksSslCards | ComponentPageBlocksStepsBlock | ComponentPageBlocksTabHeader | ComponentPageBlocksTabPricing | ComponentPageBlocksTeamSlider | ComponentPageBlocksTestBlock | ComponentPageBlocksTestimonialCard | ComponentPageBlocksTestimonialSlider | ComponentPageBlocksTimeline | ComponentPageBlocksTitle | ComponentPageBlocksTitledTabs | ComponentPageBlocksTransferDomain | ComponentPageBlocksVpsCard | ComponentPageBlocksVpsResources | ComponentPageBlocksWhyUsBlock | ComponentPageComponentsAccordion | ComponentPageComponentsAccordionAndTitle | ComponentPageComponentsAccordionArrowItem | ComponentPageComponentsAccordionItem | ComponentPageComponentsAgyCard | ComponentPageComponentsBenefit | ComponentPageComponentsButton | ComponentPageComponentsButtonWithColor | ComponentPageComponentsCdnCard | ComponentPageComponentsCenteredDescription | ComponentPageComponentsCheckCard | ComponentPageComponentsCheckListItem | ComponentPageComponentsCircleItem | ComponentPageComponentsContactCard | ComponentPageComponentsContactLinkCard | ComponentPageComponentsContactVps | ComponentPageComponentsContent | ComponentPageComponentsCustomServerCard | ComponentPageComponentsDefaultBox | ComponentPageComponentsDescription | ComponentPageComponentsEhloBox | ComponentPageComponentsHelpAndSupport | ComponentPageComponentsImageWithTitle | ComponentPageComponentsInfoCard | ComponentPageComponentsOptionsTabHeader | ComponentPageComponentsOurTeam | ComponentPageComponentsPerformance | ComponentPageComponentsPlansCheckList | ComponentPageComponentsPricePerCurrency | ComponentPageComponentsPriceSsl | ComponentPageComponentsRegCard | ComponentPageComponentsResources | ComponentPageComponentsResourcesText | ComponentPageComponentsServerCard | ComponentPageComponentsSmallCard | ComponentPageComponentsSmallPricing | ComponentPageComponentsSocialMedia | ComponentPageComponentsSslBuy | ComponentPageComponentsSslOrder | ComponentPageComponentsStep | ComponentPageComponentsTabPricingCard | ComponentPageComponentsTestimonialImage | ComponentPageComponentsTitle | ComponentPageComponentsTitledTab | ComponentPageComponentsVerticalElement | ComponentPageComponentsVpsBox | ComponentPageComponentsVpsCard | ComponentPageComponentsWithLocation | ComponentPageUtilsSeo | ComponentPageUtilsSeoMeta | Core | Currency | Customer | Footer | Header | I18NLocale | Location | Order | Page | PortalSession | Product | ProductCategory | ProductPrice | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | VpsConfigurator;

export type Header = {
  __typename?: 'Header';
  buttonHeader?: Maybe<ComponentPageBlocksButtons>;
  contactInfoHeader?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  logoHeader?: Maybe<UploadFileEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  tabHeader?: Maybe<Array<Maybe<ComponentPageBlocksTabHeader>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type HeaderTabHeaderArgs = {
  filters?: InputMaybe<ComponentPageBlocksTabHeaderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type HeaderEntity = {
  __typename?: 'HeaderEntity';
  attributes?: Maybe<Header>;
  id?: Maybe<Scalars['ID']>;
};

export type HeaderEntityResponse = {
  __typename?: 'HeaderEntityResponse';
  data?: Maybe<HeaderEntity>;
};

export type HeaderInput = {
  buttonHeader?: InputMaybe<ComponentPageBlocksButtonsInput>;
  contactInfoHeader?: InputMaybe<Scalars['String']>;
  logoHeader?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  tabHeader?: InputMaybe<Array<InputMaybe<ComponentPageBlocksTabHeaderInput>>>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  eqi?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  nei?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  eqi?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  nei?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  eqi?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  nei?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Location = {
  __typename?: 'Location';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  sku: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LocationEntity = {
  __typename?: 'LocationEntity';
  attributes?: Maybe<Location>;
  id?: Maybe<Scalars['ID']>;
};

export type LocationEntityResponse = {
  __typename?: 'LocationEntityResponse';
  data?: Maybe<LocationEntity>;
};

export type LocationEntityResponseCollection = {
  __typename?: 'LocationEntityResponseCollection';
  data: Array<LocationEntity>;
  meta: ResponseCollectionMeta;
};

export type LocationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<LocationFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<LocationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<LocationFiltersInput>>>;
  sku?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type LocationInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
};

export type LongFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  contains?: InputMaybe<Scalars['Long']>;
  containsi?: InputMaybe<Scalars['Long']>;
  endsWith?: InputMaybe<Scalars['Long']>;
  eq?: InputMaybe<Scalars['Long']>;
  eqi?: InputMaybe<Scalars['Long']>;
  gt?: InputMaybe<Scalars['Long']>;
  gte?: InputMaybe<Scalars['Long']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  lt?: InputMaybe<Scalars['Long']>;
  lte?: InputMaybe<Scalars['Long']>;
  ne?: InputMaybe<Scalars['Long']>;
  nei?: InputMaybe<Scalars['Long']>;
  not?: InputMaybe<LongFilterInput>;
  notContains?: InputMaybe<Scalars['Long']>;
  notContainsi?: InputMaybe<Scalars['Long']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  startsWith?: InputMaybe<Scalars['Long']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  confirmOrder: OrderConfirmResponse;
  createBlog?: Maybe<BlogEntityResponse>;
  createCurrency?: Maybe<CurrencyEntityResponse>;
  createCustomer?: Maybe<CustomerEntityResponse>;
  createLocation?: Maybe<LocationEntityResponse>;
  createOrder?: Maybe<OrderEntityResponse>;
  createPage?: Maybe<PageEntityResponse>;
  createPageLocalization?: Maybe<PageEntityResponse>;
  createProduct?: Maybe<ProductEntityResponse>;
  createProductCategory?: Maybe<ProductCategoryEntityResponse>;
  createProductPrice?: Maybe<ProductPriceEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteBlog?: Maybe<BlogEntityResponse>;
  deleteCore?: Maybe<CoreEntityResponse>;
  deleteCurrency?: Maybe<CurrencyEntityResponse>;
  deleteCustomer?: Maybe<CustomerEntityResponse>;
  deleteFooter?: Maybe<FooterEntityResponse>;
  deleteHeader?: Maybe<HeaderEntityResponse>;
  deleteLocation?: Maybe<LocationEntityResponse>;
  deleteOrder?: Maybe<OrderEntityResponse>;
  deletePage?: Maybe<PageEntityResponse>;
  deletePortalSession?: Maybe<PortalSessionEntityResponse>;
  deleteProduct?: Maybe<ProductEntityResponse>;
  deleteProductCategory?: Maybe<ProductCategoryEntityResponse>;
  deleteProductPrice?: Maybe<ProductPriceEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteVpsConfigurator?: Maybe<VpsConfiguratorEntityResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  estimateOrder: OrderEstimateResponse;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateBlog?: Maybe<BlogEntityResponse>;
  updateCore?: Maybe<CoreEntityResponse>;
  updateCurrency?: Maybe<CurrencyEntityResponse>;
  updateCustomer?: Maybe<CustomerEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateFooter?: Maybe<FooterEntityResponse>;
  updateHeader?: Maybe<HeaderEntityResponse>;
  updateLocation?: Maybe<LocationEntityResponse>;
  updateOrder?: Maybe<OrderEntityResponse>;
  updatePage?: Maybe<PageEntityResponse>;
  updatePortalSession?: Maybe<PortalSessionEntityResponse>;
  updateProduct?: Maybe<ProductEntityResponse>;
  updateProductCategory?: Maybe<ProductCategoryEntityResponse>;
  updateProductPrice?: Maybe<ProductPriceEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVpsConfigurator?: Maybe<VpsConfiguratorEntityResponse>;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationConfirmOrderArgs = {
  data: OrderInput;
};


export type MutationCreateBlogArgs = {
  data: BlogInput;
};


export type MutationCreateCurrencyArgs = {
  data: CurrencyInput;
};


export type MutationCreateCustomerArgs = {
  data: CustomerInput;
};


export type MutationCreateLocationArgs = {
  data: LocationInput;
};


export type MutationCreateOrderArgs = {
  data: OrderInput;
};


export type MutationCreatePageArgs = {
  data: PageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageLocalizationArgs = {
  data?: InputMaybe<PageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateProductArgs = {
  data: ProductInput;
};


export type MutationCreateProductCategoryArgs = {
  data: ProductCategoryInput;
};


export type MutationCreateProductPriceArgs = {
  data: ProductPriceInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteBlogArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCurrencyArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteLocationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePageArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProductCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProductPriceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationEstimateOrderArgs = {
  data: OrderInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateBlogArgs = {
  data: BlogInput;
  id: Scalars['ID'];
};


export type MutationUpdateCoreArgs = {
  data: CoreInput;
};


export type MutationUpdateCurrencyArgs = {
  data: CurrencyInput;
  id: Scalars['ID'];
};


export type MutationUpdateCustomerArgs = {
  data: CustomerInput;
  id: Scalars['ID'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateFooterArgs = {
  data: FooterInput;
};


export type MutationUpdateHeaderArgs = {
  data: HeaderInput;
};


export type MutationUpdateLocationArgs = {
  data: LocationInput;
  id: Scalars['ID'];
};


export type MutationUpdateOrderArgs = {
  data: OrderInput;
  id: Scalars['ID'];
};


export type MutationUpdatePageArgs = {
  data: PageInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePortalSessionArgs = {
  data: PortalSessionInput;
};


export type MutationUpdateProductArgs = {
  data: ProductInput;
  id: Scalars['ID'];
};


export type MutationUpdateProductCategoryArgs = {
  data: ProductCategoryInput;
  id: Scalars['ID'];
};


export type MutationUpdateProductPriceArgs = {
  data: ProductPriceInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUpdateVpsConfiguratorArgs = {
  data: VpsConfiguratorInput;
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type Order = {
  __typename?: 'Order';
  coupon?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  customer?: Maybe<Scalars['JSON']>;
  estimates?: Maybe<Scalars['JSON']>;
  invoices?: Maybe<Scalars['JSON']>;
  orderItems: Scalars['JSON'];
  paymentIntent?: Maybe<Scalars['JSON']>;
  paymentMethod?: Maybe<Scalars['String']>;
  paymentSource?: Maybe<Scalars['String']>;
  paymentSources?: Maybe<Scalars['JSON']>;
  paymentType?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrderConfirmResponse = {
  __typename?: 'OrderConfirmResponse';
  status?: Maybe<Scalars['String']>;
};

export type OrderEntity = {
  __typename?: 'OrderEntity';
  attributes?: Maybe<Order>;
  id?: Maybe<Scalars['ID']>;
};

export type OrderEntityResponse = {
  __typename?: 'OrderEntityResponse';
  data?: Maybe<OrderEntity>;
};

export type OrderEntityResponseCollection = {
  __typename?: 'OrderEntityResponseCollection';
  data: Array<OrderEntity>;
  meta: ResponseCollectionMeta;
};

export type OrderEstimateResponse = {
  __typename?: 'OrderEstimateResponse';
  estimates?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  nextEstimates?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  paymentSources?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  token?: Maybe<Scalars['String']>;
};

export type OrderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  coupon?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customer?: InputMaybe<JsonFilterInput>;
  estimates?: InputMaybe<JsonFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  invoices?: InputMaybe<JsonFilterInput>;
  not?: InputMaybe<OrderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  orderItems?: InputMaybe<JsonFilterInput>;
  paymentIntent?: InputMaybe<JsonFilterInput>;
  paymentMethod?: InputMaybe<StringFilterInput>;
  paymentSource?: InputMaybe<StringFilterInput>;
  paymentSources?: InputMaybe<JsonFilterInput>;
  paymentType?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  token?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OrderInput = {
  coupon?: InputMaybe<Scalars['String']>;
  customer?: InputMaybe<Scalars['JSON']>;
  estimates?: InputMaybe<Scalars['JSON']>;
  invoices?: InputMaybe<Scalars['JSON']>;
  orderItems?: InputMaybe<Scalars['JSON']>;
  paymentIntent?: InputMaybe<Scalars['JSON']>;
  paymentMethod?: InputMaybe<Scalars['String']>;
  paymentSource?: InputMaybe<Scalars['String']>;
  paymentSources?: InputMaybe<Scalars['JSON']>;
  paymentType?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type Page = {
  __typename?: 'Page';
  children?: Maybe<PageRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PageRelationResponseCollection>;
  pageBlocks?: Maybe<Array<Maybe<PagePageBlocksDynamicZone>>>;
  parent?: Maybe<PageEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  seo?: Maybe<ComponentPageUtilsSeo>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type PageChildrenArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type PageLocalizationsArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PageEntity = {
  __typename?: 'PageEntity';
  attributes?: Maybe<Page>;
  id?: Maybe<Scalars['ID']>;
};

export type PageEntityResponse = {
  __typename?: 'PageEntityResponse';
  data?: Maybe<PageEntity>;
};

export type PageEntityResponseCollection = {
  __typename?: 'PageEntityResponseCollection';
  data: Array<PageEntity>;
  meta: ResponseCollectionMeta;
};

export type PageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  children?: InputMaybe<PageFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PageFiltersInput>;
  not?: InputMaybe<PageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  parent?: InputMaybe<PageFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentPageUtilsSeoFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  pageBlocks?: InputMaybe<Array<Scalars['PagePageBlocksDynamicZoneInput']>>;
  parent?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<ComponentPageUtilsSeoInput>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PagePageBlocksDynamicZone = ComponentPageBlocksAboutHero | ComponentPageBlocksAccordionCart | ComponentPageBlocksAccordionDouble | ComponentPageBlocksAccordionPlus | ComponentPageBlocksAgencyHostingVps | ComponentPageBlocksArticles | ComponentPageBlocksBanner | ComponentPageBlocksBannerBgImage | ComponentPageBlocksBannerLiliacHome | ComponentPageBlocksBannerTealHome | ComponentPageBlocksBenefits | ComponentPageBlocksBreadcrumbs | ComponentPageBlocksButtons | ComponentPageBlocksCallToAction | ComponentPageBlocksCdnCards | ComponentPageBlocksCenteredDesc | ComponentPageBlocksCheckCard | ComponentPageBlocksCircleImage | ComponentPageBlocksCircledLeftImage | ComponentPageBlocksCircledRightImage | ComponentPageBlocksContact | ComponentPageBlocksContactUsForm | ComponentPageBlocksDescription | ComponentPageBlocksDomainSearch | ComponentPageBlocksDomainsName | ComponentPageBlocksEhloMail | ComponentPageBlocksFaq | ComponentPageBlocksFaqList | ComponentPageBlocksFiles | ComponentPageBlocksHero | ComponentPageBlocksHomepageForm | ComponentPageBlocksIconBanner | ComponentPageBlocksImage | ComponentPageBlocksImageWithTitle | ComponentPageBlocksInfoCards | ComponentPageBlocksKeyFeatures | ComponentPageBlocksLeftIconImage | ComponentPageBlocksLeftImageRightText | ComponentPageBlocksLeftTitleRightDescription | ComponentPageBlocksManagedVps | ComponentPageBlocksMarqee | ComponentPageBlocksMeetTheTeam | ComponentPageBlocksNewHero | ComponentPageBlocksPerformanceHosting | ComponentPageBlocksPlansPricingBlock | ComponentPageBlocksRequirementsForm | ComponentPageBlocksResources | ComponentPageBlocksSellingPoints | ComponentPageBlocksSignUp | ComponentPageBlocksSmallCards | ComponentPageBlocksSmallPricing | ComponentPageBlocksSpacing | ComponentPageBlocksSslCards | ComponentPageBlocksStepsBlock | ComponentPageBlocksTabPricing | ComponentPageBlocksTeamSlider | ComponentPageBlocksTestimonialCard | ComponentPageBlocksTestimonialSlider | ComponentPageBlocksTimeline | ComponentPageBlocksTitle | ComponentPageBlocksTitledTabs | ComponentPageBlocksTransferDomain | ComponentPageBlocksVpsCard | ComponentPageBlocksWhyUsBlock | Error;

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection';
  data: Array<PageEntity>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type PortalSession = {
  __typename?: 'PortalSession';
  accessUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  token?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PortalSessionEntity = {
  __typename?: 'PortalSessionEntity';
  attributes?: Maybe<PortalSession>;
  id?: Maybe<Scalars['ID']>;
};

export type PortalSessionEntityResponse = {
  __typename?: 'PortalSessionEntityResponse';
  data?: Maybe<PortalSessionEntity>;
};

export type PortalSessionInput = {
  accessUrl?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  productCategory?: Maybe<ProductCategoryEntityResponse>;
  productPrices?: Maybe<ProductPriceRelationResponseCollection>;
  productType: Enum_Product_Producttype;
  resourceVersion: Scalars['Long'];
  sku: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ProductProductPricesArgs = {
  filters?: InputMaybe<ProductPriceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  products?: Maybe<ProductRelationResponseCollection>;
  resourceVersion: Scalars['Long'];
  sku: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ProductCategoryProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ProductCategoryEntity = {
  __typename?: 'ProductCategoryEntity';
  attributes?: Maybe<ProductCategory>;
  id?: Maybe<Scalars['ID']>;
};

export type ProductCategoryEntityResponse = {
  __typename?: 'ProductCategoryEntityResponse';
  data?: Maybe<ProductCategoryEntity>;
};

export type ProductCategoryEntityResponseCollection = {
  __typename?: 'ProductCategoryEntityResponseCollection';
  data: Array<ProductCategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type ProductCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ProductCategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ProductCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProductCategoryFiltersInput>>>;
  products?: InputMaybe<ProductFiltersInput>;
  resourceVersion?: InputMaybe<LongFilterInput>;
  sku?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProductCategoryInput = {
  description?: InputMaybe<Scalars['String']>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  resourceVersion?: InputMaybe<Scalars['Long']>;
  sku?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ProductEntity = {
  __typename?: 'ProductEntity';
  attributes?: Maybe<Product>;
  id?: Maybe<Scalars['ID']>;
};

export type ProductEntityResponse = {
  __typename?: 'ProductEntityResponse';
  data?: Maybe<ProductEntity>;
};

export type ProductEntityResponseCollection = {
  __typename?: 'ProductEntityResponseCollection';
  data: Array<ProductEntity>;
  meta: ResponseCollectionMeta;
};

export type ProductFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  metadata?: InputMaybe<JsonFilterInput>;
  not?: InputMaybe<ProductFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  productCategory?: InputMaybe<ProductCategoryFiltersInput>;
  productPrices?: InputMaybe<ProductPriceFiltersInput>;
  productType?: InputMaybe<StringFilterInput>;
  resourceVersion?: InputMaybe<LongFilterInput>;
  sku?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProductInput = {
  description?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  productCategory?: InputMaybe<Scalars['ID']>;
  productPrices?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  productType?: InputMaybe<Enum_Product_Producttype>;
  resourceVersion?: InputMaybe<Scalars['Long']>;
  sku?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ProductPrice = {
  __typename?: 'ProductPrice';
  createdAt?: Maybe<Scalars['DateTime']>;
  currency: Enum_Productprice_Currency;
  period: Enum_Productprice_Period;
  price?: Maybe<Scalars['Float']>;
  priceType: Enum_Productprice_Pricetype;
  pricingModel: Scalars['String'];
  product?: Maybe<ProductEntityResponse>;
  resourceVersion: Scalars['Long'];
  sku: Scalars['String'];
  tiers?: Maybe<Scalars['JSON']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductPriceEntity = {
  __typename?: 'ProductPriceEntity';
  attributes?: Maybe<ProductPrice>;
  id?: Maybe<Scalars['ID']>;
};

export type ProductPriceEntityResponse = {
  __typename?: 'ProductPriceEntityResponse';
  data?: Maybe<ProductPriceEntity>;
};

export type ProductPriceEntityResponseCollection = {
  __typename?: 'ProductPriceEntityResponseCollection';
  data: Array<ProductPriceEntity>;
  meta: ResponseCollectionMeta;
};

export type ProductPriceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ProductPriceFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  currency?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ProductPriceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProductPriceFiltersInput>>>;
  period?: InputMaybe<StringFilterInput>;
  price?: InputMaybe<FloatFilterInput>;
  priceType?: InputMaybe<StringFilterInput>;
  pricingModel?: InputMaybe<StringFilterInput>;
  product?: InputMaybe<ProductFiltersInput>;
  resourceVersion?: InputMaybe<LongFilterInput>;
  sku?: InputMaybe<StringFilterInput>;
  tiers?: InputMaybe<JsonFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProductPriceInput = {
  currency?: InputMaybe<Enum_Productprice_Currency>;
  period?: InputMaybe<Enum_Productprice_Period>;
  price?: InputMaybe<Scalars['Float']>;
  priceType?: InputMaybe<Enum_Productprice_Pricetype>;
  pricingModel?: InputMaybe<Scalars['String']>;
  product?: InputMaybe<Scalars['ID']>;
  resourceVersion?: InputMaybe<Scalars['Long']>;
  sku?: InputMaybe<Scalars['String']>;
  tiers?: InputMaybe<Scalars['JSON']>;
};

export type ProductPriceRelationResponseCollection = {
  __typename?: 'ProductPriceRelationResponseCollection';
  data: Array<ProductPriceEntity>;
};

export type ProductRelationResponseCollection = {
  __typename?: 'ProductRelationResponseCollection';
  data: Array<ProductEntity>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  blog?: Maybe<BlogEntityResponse>;
  blogs?: Maybe<BlogEntityResponseCollection>;
  core?: Maybe<CoreEntityResponse>;
  currencies?: Maybe<CurrencyEntityResponseCollection>;
  currency?: Maybe<CurrencyEntityResponse>;
  customer?: Maybe<CustomerEntityResponse>;
  customers?: Maybe<CustomerEntityResponseCollection>;
  footer?: Maybe<FooterEntityResponse>;
  header?: Maybe<HeaderEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  location?: Maybe<LocationEntityResponse>;
  locations?: Maybe<LocationEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  order?: Maybe<OrderEntityResponse>;
  orders?: Maybe<OrderEntityResponseCollection>;
  page?: Maybe<PageEntityResponse>;
  pages?: Maybe<PageEntityResponseCollection>;
  portalSession?: Maybe<PortalSessionEntityResponse>;
  product?: Maybe<ProductEntityResponse>;
  productCategories?: Maybe<ProductCategoryEntityResponseCollection>;
  productCategory?: Maybe<ProductCategoryEntityResponse>;
  productPrice?: Maybe<ProductPriceEntityResponse>;
  productPrices?: Maybe<ProductPriceEntityResponseCollection>;
  products?: Maybe<ProductEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  vpsConfigurator?: Maybe<VpsConfiguratorEntityResponse>;
};


export type QueryBlogArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryBlogsArgs = {
  filters?: InputMaybe<BlogFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCurrenciesArgs = {
  filters?: InputMaybe<CurrencyFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCurrencyArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryCustomerArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryCustomersArgs = {
  filters?: InputMaybe<CustomerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFooterArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryHeaderArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryLocationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryLocationsArgs = {
  filters?: InputMaybe<LocationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryOrderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryProductCategoriesArgs = {
  filters?: InputMaybe<ProductCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryProductCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryProductPriceArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryProductPricesArgs = {
  filters?: InputMaybe<ProductPriceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryVpsConfiguratorArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  eqi?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  nei?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Scalars['ID']>;
  folderPath?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String'];
  pathId: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  pathId?: InputMaybe<Scalars['Int']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type VpsConfigurator = {
  __typename?: 'VpsConfigurator';
  advancedTitle?: Maybe<Scalars['String']>;
  breadcrumbVPS?: Maybe<Scalars['String']>;
  contactVps?: Maybe<ComponentPageComponentsContactVps>;
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultCpu?: Maybe<Scalars['Int']>;
  defaultProducts?: Maybe<ProductRelationResponseCollection>;
  defaultRam?: Maybe<Scalars['Int']>;
  defaultStorage?: Maybe<Scalars['Int']>;
  fiftBoxTitle?: Maybe<Scalars['String']>;
  firstBoxText?: Maybe<Scalars['String']>;
  fourthBoxTile?: Maybe<Scalars['String']>;
  keyFeaturesVps?: Maybe<ComponentPageBlocksKeyFeaturesVps>;
  locationBoxText?: Maybe<Scalars['String']>;
  mainTitle?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  resourcesTitle?: Maybe<Scalars['String']>;
  secondBoxTitle?: Maybe<Scalars['String']>;
  serverTitle?: Maybe<Scalars['String']>;
  thirdBoxText?: Maybe<Scalars['String']>;
  titleLocation?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  vpsHero?: Maybe<ComponentPageBlocksHero>;
  vpsResources?: Maybe<ComponentPageBlocksVpsResources>;
};


export type VpsConfiguratorDefaultProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type VpsConfiguratorEntity = {
  __typename?: 'VpsConfiguratorEntity';
  attributes?: Maybe<VpsConfigurator>;
  id?: Maybe<Scalars['ID']>;
};

export type VpsConfiguratorEntityResponse = {
  __typename?: 'VpsConfiguratorEntityResponse';
  data?: Maybe<VpsConfiguratorEntity>;
};

export type VpsConfiguratorInput = {
  advancedTitle?: InputMaybe<Scalars['String']>;
  breadcrumbVPS?: InputMaybe<Scalars['String']>;
  contactVps?: InputMaybe<ComponentPageComponentsContactVpsInput>;
  defaultCpu?: InputMaybe<Scalars['Int']>;
  defaultProducts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  defaultRam?: InputMaybe<Scalars['Int']>;
  defaultStorage?: InputMaybe<Scalars['Int']>;
  fiftBoxTitle?: InputMaybe<Scalars['String']>;
  firstBoxText?: InputMaybe<Scalars['String']>;
  fourthBoxTile?: InputMaybe<Scalars['String']>;
  keyFeaturesVps?: InputMaybe<ComponentPageBlocksKeyFeaturesVpsInput>;
  locationBoxText?: InputMaybe<Scalars['String']>;
  mainTitle?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  resourcesTitle?: InputMaybe<Scalars['String']>;
  secondBoxTitle?: InputMaybe<Scalars['String']>;
  serverTitle?: InputMaybe<Scalars['String']>;
  thirdBoxText?: InputMaybe<Scalars['String']>;
  titleLocation?: InputMaybe<Scalars['String']>;
  vpsHero?: InputMaybe<ComponentPageBlocksHeroInput>;
  vpsResources?: InputMaybe<ComponentPageBlocksVpsResourcesInput>;
};
