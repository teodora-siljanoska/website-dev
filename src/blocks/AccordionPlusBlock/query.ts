const AccordionPlusBlockQuery = `
... on ComponentPageBlocksAccordionPlus{
    id
    accordionItems{
      id
      title
      description
      __typename
    }
    __typename
  }
`;
export default AccordionPlusBlockQuery;
