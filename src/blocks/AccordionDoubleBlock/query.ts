const AccordionDoubleBlockQuery = `
... on ComponentPageBlocksAccordionDouble {
  __typename
    id
    accordionItemsProps {
      id
      title
      description
      __typename
    }
  }
`;
export default AccordionDoubleBlockQuery;
