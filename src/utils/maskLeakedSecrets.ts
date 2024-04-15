import { maskString } from 'mask-sensitive-data';
import { isArray, isObject, isString } from './utils';

export const maskObjectValuesInString = (data: {
  str: string;
  valuesIn: string[];
}) => {
  const { str, valuesIn } = data;
  let maskedStr = str;
  if (str) {
    valuesIn.forEach(value => {
      maskedStr = str.replaceAll(
        new RegExp(value, 'g'),
        `*`.repeat(value.length)
      );
    });
  }
  return maskedStr;
};

function checkForPotentialSecretInArrayItem(
  argumentItem: any[],
  valuesIn?: string[]
) {
  return argumentItem.map((arrayValue: any) => {
    if (isObject(arrayValue)) {
      return maskLeakedSecrets(arrayValue, valuesIn);
    }

    if (isArray(arrayValue) || isString(arrayValue)) {
      return maskLeakedSecrets(arrayValue, valuesIn);
    }
    return arrayValue;
  });
}

export const maskLeakedSecrets = (data: any, valuesIn?: string[]) => {
  if (!data) return null;
  const values = valuesIn?.length ? valuesIn : Object.values(process.env);
  if (isString(data)) {
    return maskObjectValuesInString({
      str: data,
      valuesIn: values,
    });
  }

  if (isObject(data)) {
    // mask and replace the values of the object keys
    Object.keys(data).map(key => {
      data[key] = maskLeakedSecrets(data[key], values);
    });
  }
  if (isArray(data)) {
    data = checkForPotentialSecretInArrayItem(data, values);
  }
  return data;
};
