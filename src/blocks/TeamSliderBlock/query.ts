const TeamSliderBlockQuery = `
... on ComponentPageBlocksTeamSlider {
    id
    title
    slide {
      id
      testimonialDesc
      ceo
      bigImage {
        data {
          id
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
            url
            size
            previewUrl
          }
          __typename
        }
        __typename
      }
      backgroundImage {
        data {
          id
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
            url
            size
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
export default TeamSliderBlockQuery;
