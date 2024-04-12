import { isArray, isObject, isString } from './utils';
import { stringOccurInObjectValues } from './stringOccurInObjectValue';

export const checkForPotentialSecrets = (data: any) => {
  return data
    .map((argument: any) => {
      if (isString(argument)) {
        return stringOccurInObjectValues({
          needle: argument,
          obj: process.env,
        });
      }

      if (isObject(argument)) {
        return checkForPotentialSecrets(Object.values(argument));
      }

      if (isArray(argument)) {
        return checkForPotentialSecretInArrayItem(argument);
      }
      return null;
    })
    .filter((key: string) => !!key);
};

function checkForPotentialSecretInArrayItem(argumentItem: any[]) {
  return argumentItem.map((arrayValue: any) => {
    if (isObject(arrayValue)) {
      return checkForPotentialSecrets(arrayValue);
    }

    if (isArray(arrayValue) || isString(arrayValue)) {
      return checkForPotentialSecrets(arrayValue);
    }
    return arrayValue;
  });
}
