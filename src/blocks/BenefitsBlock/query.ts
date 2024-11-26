// IMAGE DOESNT WORK FFS
const BenefitsBlockQuery = `
... on ComponentPageBlocksBenefits {
  __typename
    id
    title
    benefits {
      id
      title
      buttonCta
      buttonLink
      buttonColor
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
          }
          __typename
        }
      }        
    }
}`;

export default BenefitsBlockQuery;
