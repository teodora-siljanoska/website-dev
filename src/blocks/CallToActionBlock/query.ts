const CallToActionBlockQuery = `
... on ComponentPageBlocksCallToAction {
  __typename
    id
    title
    description
    buttons {
      id
      cta
      link
      hasLink
    }
}
`;

export default CallToActionBlockQuery;
