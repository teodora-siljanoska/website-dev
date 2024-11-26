const LeftIconImageImageBlockQuery = `
... on ComponentPageBlocksLeftIconImage {
  __typename
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
    icon {
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
  }
`;

export default LeftIconImageImageBlockQuery;
