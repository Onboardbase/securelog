import consola from 'consola';
import IOptions from './interfaces/options.interface';
import SecureLog from './secureLog';

export const createConsolaExporter = (options?: IOptions) => {
  const secureLog = new SecureLog(options);
  return consola.create({
    reporters: [
      {
        log: (data: any) => {
          secureLog.log(JSON.stringify(data));
        },
      },
    ],
  });
};
