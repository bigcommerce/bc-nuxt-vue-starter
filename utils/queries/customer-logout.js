module.exports.customerLogOut = () => {
  return `
    mutation Logout {
      logout {
        result
      }
    }
  `;
};
