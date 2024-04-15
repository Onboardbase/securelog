import { maskLeakedSecrets } from './utils/maskLeakedSecrets';

export const maskSecretLeaks = (arg: any, valuesIn?: string[]) => {
  return maskLeakedSecrets(arg, valuesIn);
};
