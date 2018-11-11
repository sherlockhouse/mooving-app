import { AccountStore } from '../../common/stores/AccountStore';
import { STORE_ACCOUNT } from '../../common/constants';

const accountStore = new AccountStore();

export default {
  [STORE_ACCOUNT]: accountStore,
};