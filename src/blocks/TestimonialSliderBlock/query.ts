const TestimonialSliderBlockQuery = `
... on ComponentPageBlocksTestimonialSlider {
  testimonials {
    testimonialDesc
    ceo
    readMore
    ceoImage {
      data {
        attributes {
          name
          alternativeText
          caption
          width
          height
          formats
          url
          previewUrl
          mime
        }
      }
    }
    bigImage {
      data {
        attributes {
          name
          alternativeText
          caption
          width
          height
          formats
          url
          previewUrl
          mime
        }
      }
    }
  }
}`;
export default TestimonialSliderBlockQuery;
