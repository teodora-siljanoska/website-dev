const WhyUsBlockQuery = `
... on ComponentPageBlocksWhyUsBlock {
  __typename
    id
    title
    benefits {
      id
      title
      description
      alignment
      image{
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
            previewUrl

          }
          __typename
        }
      }
    }
    backgroundImage {
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
          previewUrl

        }
        __typename
      }
    }
  }`;
export default WhyUsBlockQuery;
