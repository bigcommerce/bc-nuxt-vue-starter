export const getCustomer = () => {
  return `
    query {
      customer {
        firstName
        lastName
        email
        id: entityId
        groupId: customerGroupId
      }
    }
  `;
};
