import { processPossibleSecretsInString } from 'securelog-scan/dist/fileScanner';

export const scanSecretsInString = async (
  rawValue: string,
  options?: { maskedValue?: string; visibleChars?: number }
) => {
  return await processPossibleSecretsInString({
    rawValue,
    maskedValue: options.maskedValue,
    visibleChars: options.visibleChars,
  });
};
