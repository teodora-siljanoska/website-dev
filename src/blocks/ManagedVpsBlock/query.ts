const ManagedVpsBlockQuery = `
... on ComponentPageBlocksManagedVps {
  vpsCheck(pagination: { limit: 20 }) {
  plansTitle
  checking
}
defaultBox {
  id
  titleBox
  subtitleBox
  descriptionBox
  buttonBoxCta
  buttonBoxLink
  productsDefault(pagination: { limit: 20 }) {
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
  numberOfRamDefault
  numberOfCpuDefaul
  numberOfStorageDefault
}
vpsFirstCard {
  titleVpsBox
  descriptionVpsBox
  performancesVpsBox
  withLocationMvps{
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
  saveTextVps
  numberOfRam
  numberOfCpu
  numberOfStorage
  vps_products(pagination: { limit: 20 })  {
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
        productPrices{
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
vpsSecondCard {
  titleVpsBox
  descriptionVpsBox
  performancesVpsBox
  withLocationMvps{
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
  saveTextVps
  numberOfRam
  numberOfCpu
  numberOfStorage
  vps_products(pagination: { limit: 20 }) {
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
vpsThirdCard {
  titleVpsBox
  descriptionVpsBox
  performancesVpsBox
  withLocationMvps{
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
  saveTextVps
  numberOfRam
  numberOfCpu
  numberOfStorage
  vps_products(pagination: { limit: 20 }) {
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
export default ManagedVpsBlockQuery;
