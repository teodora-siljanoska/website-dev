const IconBannerBlockQuery = `
... on ComponentPageBlocksIconBanner {
  __typename
    id
    title
    description
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

export default IconBannerBlockQuery;
