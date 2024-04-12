import { checkForPotentialSecrets } from './utils';

export const validateSecretLeak = (...args: []) => {
  const checkResult = checkForPotentialSecrets(args);
  return !!checkResult?.length;
};
