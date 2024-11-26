const CheckCardBlockQuery = `
... on ComponentPageBlocksCheckCard{
    id
    card{
      id
      title
      ctaButton
      linkButton
      checklistItems
      subTitleCheckCard
      imgageCheckCard{
        data{
          id
          attributes{
            name
            alternativeText
            caption
            width
            height
            formats
            mime
            size
            url
            previewUrl                
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
`;
export default CheckCardBlockQuery;
