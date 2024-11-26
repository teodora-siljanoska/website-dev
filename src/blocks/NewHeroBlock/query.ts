const NewHeroBlockQuery = `
... on ComponentPageBlocksNewHero {
    __typename
    id
    title
    description
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
}
`;

export default NewHeroBlockQuery;
