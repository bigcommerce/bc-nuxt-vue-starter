export const shopAll = () => {
  return `
  query CategoryByUrl {
    site {
      route(path: "/shop-all/") {
        node {
          id
          ... on Category {
            name
            entityId
            products {
              edges {
                node {
                  variants {
                    edges {
                      node {
                        id
                        entityId
                      }
                    }
                  }
                  entityId
                  name
                  path
                  defaultImage {
                    url(width: 216, height: 326)
                  }
                  prices {
                    price {
                      value
                      currencyCode
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
`;
};
