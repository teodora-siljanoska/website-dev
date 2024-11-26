const BannerTealHomeBlockQuery = `
... on ComponentPageBlocksBannerTealHome {
  id
  contentTealBanner
  buttonBannerTeal {
    cta
    link
    hasLink
  }
  rightTopImage {
    data {
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
      }
    }
  }
}
`;
export default BannerTealHomeBlockQuery;
