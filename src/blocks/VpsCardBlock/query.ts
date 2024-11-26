const VpsCardBlockQuery = `
... on ComponentPageBlocksVpsCard{
  __typename
  id
  cardVps{
    __typename
    id
    titleVps
    descriptionVps
    ctaButtonVps
    linkButtonVps
    checklistItemsVps
    imageTopVps{
      data{
        attributes{
          url
        }
        __typename
      }
      __typename
    }
  }
  buttonVpsCard{
    cta
    link
    hasLink
  }
}
`;
export default VpsCardBlockQuery;
