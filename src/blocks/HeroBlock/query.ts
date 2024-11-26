const HeroBlockQuery = `
... on ComponentPageBlocksHero {
    __typename
    id
    size
    title
    description
    secondTitleVps
    smallTitle
    heroImage {
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
    button {
    id
    cta
    link
    hasLink
    __typename
    }
    buttonScroll {
      id
      cta
      link
      hasLink
      __typename
      }
}
`;

export default HeroBlockQuery;
