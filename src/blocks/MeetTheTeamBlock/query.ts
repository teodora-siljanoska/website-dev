const MeetTheTeamBlockQuery = `
... on ComponentPageBlocksMeetTheTeam {
  imagePosition
  backgroundColor
  imageOfEmployee {
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
  nameOfEmployee
  bioOfEmployee
  positionOfEmployee
}
`;
export default MeetTheTeamBlockQuery;
