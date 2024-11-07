import { processPossibleSecretsInString } from 'securelog-scan/dist/fileScanner';

export const scanSecretsInString = async (rawValue: string) => {
  return await processPossibleSecretsInString({ rawValue });
};
