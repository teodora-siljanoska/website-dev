const InfoCardsBlockQuery = `
... on ComponentPageBlocksInfoCards {
  numberOfShowingCardsInRow
  infoCard (pagination: { limit: 20 }){
    infoImage {
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
    titleInfoCard
    subTitleInfoCard
    descriptionInfoCard
    aboveTitleInfoCard
    optionalCtaButtonInfoCard
    optionalLinkButtonInfoCard
    colorOfContent
  }
}
`;
export default InfoCardsBlockQuery;
