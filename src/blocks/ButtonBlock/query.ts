const ButtonsBlockQuery = `
... on ComponentPageBlocksButtons {
  __typename
  id
  buttons {
    id
    cta
    link
    hasLink
    color
    __typename
  }
}
`;
export default ButtonsBlockQuery;
