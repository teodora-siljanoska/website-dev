const FaqListBlockQuery = `
... on ComponentPageBlocksFaqList{
    id
    activeData
    content{
      id
      title
      items
      __typename
    }
    __typename
  }
`;
export default FaqListBlockQuery;
