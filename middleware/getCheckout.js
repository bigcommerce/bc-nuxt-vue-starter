import { getCartId } from '~/utils/storage';

export default function ({ store, redirect }) {
  if (getCartId()) store.dispatch('checkout/getCheckout');
  else return redirect('/products');
}
