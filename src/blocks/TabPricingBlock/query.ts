const TabPricingBlockQuery = `
... on ComponentPageBlocksTabPricing {
    id
    carts {
      id
      data
      __typename
    }
    __typename
  }
`;
export default TabPricingBlockQuery;
