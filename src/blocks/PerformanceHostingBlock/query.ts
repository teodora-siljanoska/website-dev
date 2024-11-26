const PerformanceHostingBlockQuery = `
... on ComponentPageBlocksPerformanceHosting {
  hostingImage {
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
  performances {
    performanece
  }
}
`;
export default PerformanceHostingBlockQuery;
