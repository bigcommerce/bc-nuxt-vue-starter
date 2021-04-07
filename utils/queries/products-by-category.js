export const productsByCategory = (path, pageParam) => {
  return `
  query CategoryByUrl {
    site {
      route(path: "${path}") {
        node {
          id
          ... on Category {
            name
            entityId
            products(${pageParam}) {
              pageInfo {
                hasNextPage
                hasPreviousPage
								startCursor
                endCursor
              }
              edges {
                node {
                  variants {
                    edges {
                      node {
                        options {
                          edges {
                            cursor
                          }
                        }
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
