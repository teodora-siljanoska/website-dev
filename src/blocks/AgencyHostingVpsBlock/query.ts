const AgencyHostingVpsBlockQuery = `
... on ComponentPageBlocksAgencyHostingVps {
  titleAgencyHosting
  standardFeatures(pagination: { limit: 20 }) {
    plansTitle
    checking
  }
  contentVPSFirst {
    titleAgyCard
    saveText
    descriptionAgyCard
    performancesAgyCard
    withLocation{
      location{
        data{
          attributes{
            sku
            name
          }
        }
      }
      pricePerCurrency{
        currency{
          data{
            attributes{
              code
            }
          }
        }
        pricePC
      }
    }
    card_products {
      data {
        attributes {
          title
          sku
          productType
          description
          productCategory {
            data {
              attributes {
                title
                sku
              }
            }
          }
          resourceVersion
          metadata
          productPrices {
            data {
              attributes {
                sku
                price
                currency
                period
                priceType
                pricingModel
                resourceVersion
                tiers
              }
            }
          }
        }
      }
    }
  }
  contentVPSSecond {
titleAgyCard
saveText
    descriptionAgyCard
    performancesAgyCard
    withLocation{
      location{
        data{
          attributes{
            sku
            name
          }
        }
      }
      pricePerCurrency{
        currency{
          data{
            attributes{
              code
            }
          }
        }
        pricePC
      }
    }
    card_products {
      data {
        attributes {
          title
          sku
          productType
          description
          productCategory {
            data {
              attributes {
                title
                sku
              }
            }
          }
          resourceVersion
          metadata
          productPrices {
            data {
              attributes {
                sku
                price
                currency
                period
                priceType
                pricingModel
                resourceVersion
                tiers
              }
            }
          }
        }
      }
    }
  }
  contentVPSThird {
titleAgyCard
saveText
    descriptionAgyCard
    performancesAgyCard
    withLocation{
      location{
        data{
          attributes{
            sku
            name
          }
        }
      }
      pricePerCurrency{
        currency{
          data{
            attributes{
              code
            }
          }
        }
        pricePC
      }
    }
    card_products {
      data {
        attributes {
          title
          sku
          productType
          description
          productCategory {
            data {
              attributes {
                title
                sku
              }
            }
          }
          resourceVersion
          metadata
          productPrices {
            data {
              attributes {
                sku
                price
                currency
                period
                priceType
                pricingModel
                resourceVersion
                tiers
              }
            }
          }
        }
      }
    }
  }
  contentVPSFourth {
titleAgyCard
saveText
    descriptionAgyCard
    performancesAgyCard
    withLocation{
      location{
        data{
          attributes{
            sku
            name
          }
        }
      }
      pricePerCurrency{
        currency{
          data{
            attributes{
              code
            }
          }
        }
        pricePC
      }
    }
    card_products {
      data {
        attributes {
          title
          sku
          productType
          description
          productCategory {
            data {
              attributes {
                title
                sku
              }
            }
          }
          resourceVersion
          metadata
          productPrices {
            data {
              attributes {
                sku
                price
                currency
                period
                priceType
                pricingModel
                resourceVersion
                tiers
              }
            }
          }
        }
      }
    }
  }
}
`;
export default AgencyHostingVpsBlockQuery;
