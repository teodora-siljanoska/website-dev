const EhloMailBlockQuery = `
... on ComponentPageBlocksEhloMail {
  ehloFirstCard {
    titleEhloBox
    descriptionEhloBox
    performancesEhloBox
    saveTextEhlo
    withLocationEhlo{
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
    ehlo_products {
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
  ehloSecondCard{
    titleEhloBox
    descriptionEhloBox
    performancesEhloBox
    saveTextEhlo
    withLocationEhlo{
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
    ehlo_products {
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
  ehloThirdCard{
    titleEhloBox
    descriptionEhloBox
    performancesEhloBox
    saveTextEhlo
    withLocationEhlo{
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
    ehlo_products {
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
export default EhloMailBlockQuery;
