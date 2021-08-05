module.exports.category = () => {
  return `
    query paginateProducts{
      site {
        categoryTree {
          name
          path
          productCount
        }
      }
    }
  `;
};
