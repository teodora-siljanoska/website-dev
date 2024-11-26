const ImageWithTitleBlockQuery = `
... on ComponentPageBlocksImageWithTitle {
  __typename
    id
    isThreeInRow
    imgTitle{
      __typename
      title
      id
      image{
        __typename
        data{
          attributes{
            url
            previewUrl
            width
            height
          }
        }
      }
    }
  }
`;

export default ImageWithTitleBlockQuery;
