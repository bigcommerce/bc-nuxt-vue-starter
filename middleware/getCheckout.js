import { cartId } from '~/utils/storage';

export default function ({ store, redirect }) {
  if (cartId) store.dispatch('checkout/getCheckout');
  else return redirect('/products');
}
