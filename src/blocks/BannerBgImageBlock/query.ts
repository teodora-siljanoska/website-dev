const BannerBgImageBlockQuery = `
... on ComponentPageBlocksBannerBgImage{
  id
  bannerMainText{
    contentDescription
    alignment
    fontsize
  }
  textForLink
  linkForLink
  imgBanner{
    data{
      attributes{
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
export default BannerBgImageBlockQuery;
