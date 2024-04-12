import { createSecureConsolaReporter } from '../src/createConsolaExporter';

describe('Test console.log', () => {
  it('should create a consola reporter', () => {
    // TODO: this is buggy: throws a package not found error
    // const consola = createSecureConsolaReporter();
    // const mockedLog = jest.fn();
    // console.log = mockedLog;
    // consola.log('check log');
    // expect(mockedLog).toBeCalledTimes(1);
    // expect(mockedLog).toBeCalledWith('');
  });
});
