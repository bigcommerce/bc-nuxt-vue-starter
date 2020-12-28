import { getApi } from '@/utils/api';

export default function({ $axios }, inject) {
  inject('api', getApi($axios));
}
