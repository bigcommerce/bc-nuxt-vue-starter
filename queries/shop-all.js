export default `
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
