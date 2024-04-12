// import { createConsolaReporter } from '../src/createConsolaExporter';
import { consola } from 'consola';
import { createConsolaReporter } from '../dist/secure-log.cjs.production.min';

describe('Test console.log', () => {
  it('should create a consola reporter', () => {
    // TODO: this is buggy: throws a package not found error
    // const consola = createConsolaReporter();
    // const mockedLog = jest.fn();
    // console.log = mockedLog;
    // consola.log('check log');
    // expect(mockedLog).toBeCalledTimes(1);
    // expect(mockedLog).toBeCalledWith('');
  });
});
