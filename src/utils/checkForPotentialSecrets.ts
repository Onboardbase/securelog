import { isArray, isObject, isString } from './utils';
import { stringOccurInObjectValues } from './stringOccurInObjectValue';

export const checkForPotentialSecrets = (data: any[]): string[] => {
  return data.reduce((acc: string[], argument: any) => {
    let result: string | string[] | null = [];
    
    if (isString(argument)) {
      result = stringOccurInObjectValues({ needle: argument, obj: process.env });
    } else if (isObject(argument)) {
      result = checkForPotentialSecrets(Object.values(argument));
    } else if (isArray(argument)) {
      result = checkForPotentialSecrets(argument);
    }

    return result ? acc.concat(result) : acc;
  }, []);
};
