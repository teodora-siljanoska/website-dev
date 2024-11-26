const TitledTabsBlockQuery = `
... on ComponentPageBlocksTitledTabs {
    tabs {
      id
      tabTitle
      pairs
      hasButton
      buttonCta
      buttonLink
      __typename
    }
    __typename
  }
`;

export default TitledTabsBlockQuery;
