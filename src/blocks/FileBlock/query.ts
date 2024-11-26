const FileBlockQuery = `
... on ComponentPageBlocksFiles{
    id
    __typename
    files{
      data{
        attributes{
          url
          name
        }
      }
    }
  }
`;
export default FileBlockQuery;
