const { category } = require('./category');
const { productsByCategory } = require('./products-by-category');
const { productBySlug } = require('./product-by-slug');
const { customerLogin } = require('./customer-login');
const { customerLogOut } = require('./customer-logout');
const { getCustomer } = require('./get-customer');
const { homePageContentWidgets } = require('./homepage-content-widgets');
module.exports = {
  productsByCategory,
  productBySlug,
  customerLogin,
  customerLogOut,
  getCustomer,
  category,
  homePageContentWidgets
};
