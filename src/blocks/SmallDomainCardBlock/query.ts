const SmallDomainCardBlockQuery = `
... on ComponentPageBlocksSmallCards {
  smallCard {
    imgDomain {
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
    priceTitle
    descCard
  }
}
`;
export default SmallDomainCardBlockQuery;
