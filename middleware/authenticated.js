export default async function ({ store, redirect }) {
  const storefrontStatus = await store.dispatch(
    'storefront/getStorefrontStatus'
  );
  if (storefrontStatus) store.dispatch('customer/isLoggedIn');
  else return redirect('/error');
}
