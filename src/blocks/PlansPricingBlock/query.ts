const PlansPricingBlockQuery = `
... on ComponentPageBlocksPlansPricingBlock{
  id
  plansCheckTitle
  plansCheckDescription
  plansList{
    id
    plansTitle
    checking
    __typename
  }
  rowNumber
  __typename
}
`;
export default PlansPricingBlockQuery;
