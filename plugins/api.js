import { getApi } from '@/api';

export default function({ $axios }, inject) {
  inject('api', getApi($axios));
}
