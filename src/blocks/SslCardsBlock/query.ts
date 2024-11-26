const SslCardsBlockQuery = `
... on ComponentPageBlocksSslCards {
  contactText
  firstSSLCard {
    titleSSLBuy
    descriptionSSLBuy
    sslproduct {
      data {
        attributes {
          title
          sku
          productType
          description
          productCategory {
            data {
              attributes {
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
                product {
                  data {
                    attributes {
                      title
                      sku
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  secondSSLCard {
    titleSSLBuy
    descriptionSSLBuy
    sslproduct {
      data {
        attributes {
          title
          sku
          productType
          description
          productCategory {
            data {
              attributes {
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
                product {
                  data {
                    attributes {
                      title
                      sku
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  thirdSLLCard{
    titleSSLOrder
    descriptionSSLOrder
    priceStartFrom
  }
  forthSSLCard{
    titleSSLOrder
    descriptionSSLOrder
    priceStartFrom
  }
}
`;
export default SslCardsBlockQuery;
