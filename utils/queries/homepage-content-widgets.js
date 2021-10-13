module.exports.homePageContentWidgets = () => {
  return `
    query getHomePageContentWidgets {
      site {
        content {
          renderedRegionsByPageType(pageType: HOME) {
            regions {
              name
              html
            }
          }
        }
      }
    }
  `;
};
