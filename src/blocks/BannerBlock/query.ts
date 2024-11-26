const BannerBlockQuery = `
... on ComponentPageBlocksBanner{
  titleBanner
  buttonForBanner{
    cta
    link
    hasLink
  }
  colorOfBanner
}
`;
export default BannerBlockQuery;
