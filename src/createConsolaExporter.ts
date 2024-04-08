import { createConsola } from 'consola';
import IOptions from './interfaces/options.interface';
import SecureLog from './secureLog';

export const createConsolaExporter = (options?: IOptions) => {
  const secureLog = new SecureLog(options);
  return createConsola({
    reporters: [
      {
        log: (...args: any) => {
          secureLog.log(args);
        },
      },
    ],
  });
};
