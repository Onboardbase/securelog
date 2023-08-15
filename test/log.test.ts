const Log = require('../dist');

const mockedLog = jest.fn();

const mockConsoleLog = () => {
  mockedLog.mockReset();
  console.log = mockedLog;
  console.warn = mockedLog;
  console.error = mockedLog;
};

let secureLog;
const setup = (options = {}) => {
  mockConsoleLog();
  secureLog = new Log.default(options);
};

describe('Test console.log', () => {
  beforeEach(() => {
    setup();
  });
  it('should have called console.log with hello', () => {
    secureLog.log('hello');

    expect(mockedLog).toHaveBeenCalledWith(
      'Onboardbase Signatures here:',
      'hello'
    );
  });

  it('should have called console.warn with hello warn', () => {
    secureLog.warn('hello warn');
    expect(mockedLog).toHaveBeenCalledWith('hello warn');
  });

  it('should have called console.error with hello error', () => {
    secureLog.error('hello error');
    expect(mockedLog).toHaveBeenCalledWith('hello error');
  });
});
