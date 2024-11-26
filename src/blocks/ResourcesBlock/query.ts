const ResourcesBlockQuery = `
... on ComponentPageBlocksResources{
    id
    title
    resourceCard{
      id
      data
      __typename
    }
    __typename
  }
`;
export default ResourcesBlockQuery;
