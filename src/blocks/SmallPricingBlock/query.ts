const SmallPricingBlockQuery = `
... on ComponentPageBlocksSmallPricing {
    id
    title
    cards {
      id
      title
      price
      value
      ctaButton
      linkButton
      checklistItems
      __typename
    }
    __typename
  }
`;
export default SmallPricingBlockQuery;
