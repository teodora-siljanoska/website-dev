const KeyFeaturesBlockQuery = `
... on ComponentPageBlocksKeyFeatures{
  id
  title
  checkListItems{
    id
    cta
    checking
    description
    ctaButton
    theme
    linkButton
    __typename
  }
  __typename
}
`;
export default KeyFeaturesBlockQuery;
