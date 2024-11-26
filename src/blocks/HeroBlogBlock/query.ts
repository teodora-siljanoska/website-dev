const HeroBlogBlockQuery = `
... on ComponentPageBlocksHeroBlog{
  id
  smallTitle
  title
  description
  heroImage{
    data{
      id
      attributes{
        name
        alternativeText
        caption
        width
        height
        formats
        hash
        mime
        size
        url
        previewUrl
      }
      __typename
    }
    __typename
  }
  size
  __typename
}
`;

export default HeroBlogBlockQuery;
