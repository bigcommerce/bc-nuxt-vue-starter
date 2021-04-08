export const customerLogOut = () => {
  return `
    mutation Logout {
      logout {
        result
      }
    }
  `;
};
