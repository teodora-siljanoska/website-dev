const TimelineBlockQuery = `
... on ComponentPageBlocksTimeline{
    id
    element(pagination: { limit: 1000 }){
      id
      title
      desc
      buttonLink
      buttonCTA
      __typename
    }
    __typename
  }
`;
export default TimelineBlockQuery;
