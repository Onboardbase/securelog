import { createConsola } from 'consola';
import IOptions from './interfaces/options.interface';
import SecureLog from './secureLog';

export const createConsolaReporter = (options?: IOptions) => {
  const secureLog = new SecureLog(options);
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
