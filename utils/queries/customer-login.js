module.exports.customerLogin = () => {
  return `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        result
      }
    }
  `;
};
