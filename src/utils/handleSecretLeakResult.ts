import IOptions from '../interfaces/options.interface';

export const handleSecretLeakResult = (
  leakedKeys: string[],
  cachedConsole: Console,
  secureLogOptions: IOptions = {}
) => {
  try {
    leakedKeys.map(key => {
      cachedConsole.warn(
        'the value of the secret: "'.concat(key, '", is being leaked!')
      );
      if (!secureLogOptions.warnOnly) {
        throw new Error('potential secret leak');
      }
    });
  } catch (error) {
    cachedConsole.error(error);
  }
};
