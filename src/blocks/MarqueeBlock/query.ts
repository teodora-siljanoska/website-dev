const MarqeeBlockQuery = `
... on  ComponentPageBlocksMarqee{
    id
    logos{
      data{
        id
        attributes{
          width
          height
          url
        }
      }
    }
    title
  }
`;

export default MarqeeBlockQuery;
