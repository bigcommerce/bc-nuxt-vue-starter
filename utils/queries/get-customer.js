export const getCustomer = () => {
  return `
    query {
      customer {
        firstName
        lastName
        email
        id: entityId
        groupId: customerGroupId
        company
        notes
        phone
        taxExemptCategory
        addressCount
        attributeCount
        storeCredit {
          currencyCode
          value
        }
      }
    }
  `;
};
