import { createConsola } from 'consola';
import IOptions from './interfaces/options.interface';
import SecureLog from './secureLog';
import { maskLeakedSecrets } from './utils/maskLeakedSecrets';

export const createSecureConsolaReporter = (options?: IOptions) => {
  const secureLog = new SecureLog({
    warnOnly: true,
    forceNewInstance: true,
    maskLeakedSecrets: true,
    prefix: '',
    ...options,
  });
  return createConsola({
    reporters: [
      {
        log: (data: any) => {
          secureLog.log(JSON.stringify(data));
        },
      },
    ],
  });
};
