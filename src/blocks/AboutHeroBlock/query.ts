const AboutHeroBlockQuery = `
... on ComponentPageBlocksAboutHero{
  __typename
  id
  description
  title
  mobileSpacing
  backgroundImage{
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
export default AboutHeroBlockQuery;
