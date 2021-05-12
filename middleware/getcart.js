export default function ({ store, redirect }) {
  store.dispatch('carts/getCart');
  if (!store.state.carts.products.length) {
    return redirect('/products');
  }
}
