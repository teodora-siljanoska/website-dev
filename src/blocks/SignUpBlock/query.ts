const SignUpBlockQuery = `
... on ComponentPageBlocksSignUp{
    title
    description
    ctaButton
    __typename
    product_price {
      data {
        attributes {
          sku
          price
          period
          currency
        }
      }
    }
  }
`;

export default SignUpBlockQuery;
