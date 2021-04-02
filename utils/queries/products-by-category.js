export const productsByCategory = (path) => {
  return `
  query CategoryByUrl {
    site {
      route(path: "${path}") {
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
                  description
                  defaultImage {
                    url(width: 216, height: 326)
                  }
                  prices {
                    price {
                      value
                      currencyCode
                    }
                  }
                  reviewSummary {
                    numberOfReviews
                    summationOfRatings
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
