const Log = require('../dist');

const mockedLog = jest.fn();

const mockConsoleLog = () => {
  console.log = mockedLog;
};

let secureLog;
const setup = (options = {}) => {
  mockConsoleLog();
  secureLog = new Log.default(options);
};

describe('Test console.log', () => {
  beforeAll(() => {
    setup();
  });
  it('should have called console.log with hello', () => {
    secureLog.log('hello');

    expect(mockedLog).toHaveBeenCalledWith(
      'Onboardbase Signatures here:',
      'hello'
    );
  });
});
