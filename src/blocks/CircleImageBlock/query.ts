const CircleImageBlockQuery = `
... on ComponentPageBlocksCircleImage {
  imageBlock {
    data {
      attributes {
        name
        alternativeText
        caption
        width
        height
        formats
        hash
        ext
        mime
        size
        url
        previewUrl
        provider
      }
    }
  }
  leftTop {
    titleItemCircle
    descriptionItemCircle
  }
  leftBottom {
    titleItemCircle
    descriptionItemCircle
  }
  rightTop {
    titleItemCircle
    descriptionItemCircle
  }
  rightBottom {
    titleItemCircle
    descriptionItemCircle
  }
}
`;
export default CircleImageBlockQuery;
