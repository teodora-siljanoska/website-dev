const TestimonialCardBlockQuery = `
... on ComponentPageBlocksTestimonialCard{
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
      }
      __typename
    }
  }
  description
}
`;
export default TestimonialCardBlockQuery;
