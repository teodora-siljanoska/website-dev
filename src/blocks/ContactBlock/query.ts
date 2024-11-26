const ContactBlockQuery = `
... on ComponentPageBlocksContact{
  preSalesInquiry{
    titleContactFormCard
    descriptionContactFormCard
    buttonContactFormCard
    mailToContactForm
  }
  technicalSupport{
    titleLinkCard
    descriptionLinkContent
    buttonCtaContact
    buttonLinkContact
  }
  billingInquiry{
    titleLinkCard
    descriptionLinkContent
    buttonCtaContact
    buttonLinkContact
  }
}
`;
export default ContactBlockQuery;
