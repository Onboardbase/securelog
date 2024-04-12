import IOptions from '../interfaces/options.interface';

export const stringOccurInObjectValues = (data: {
  needle: string;
  obj: Record<string, any>;
}) => {
  const { needle, obj } = data;
  if (needle) {
    return Object.keys(obj).find(secretKey => {
      const secretValue = (obj || {})[secretKey];
      return secretValue.length > 1 && needle.includes(secretValue);
    });
  }
  return null;
};
