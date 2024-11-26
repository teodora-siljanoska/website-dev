const StepsBlockQuery = `
... on ComponentPageBlocksStepsBlock {
  __typename
    id
    steps {
      id
      title
      description
      image {
        __typename
        data {
          id
          attributes {
            name
            alternativeText
            caption
            width
            height
            formats
            mime
            url
          }
          __typename
        }
      }
      __typename
    }
  }
`;
export default StepsBlockQuery;
