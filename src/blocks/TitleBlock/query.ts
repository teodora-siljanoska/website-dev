const TitleBlockQuery = `
... on ComponentPageBlocksTitle {
    id
    centeredTitle {
      id
      cta
      aligment
      fontSize
      __typename
    }
    __typename
  }
`;
export default TitleBlockQuery;
