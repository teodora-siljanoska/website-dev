const AccordionCardBlockQuery = `
... on ComponentPageBlocksAccordionCart {
  __typename
  id
  accordions {
    id
    title
    description
    __typename
  }
  regCard {
    id
    data
    __typename
  }
}
`;
export default AccordionCardBlockQuery;
