import IOptions from '../src/interfaces/options.interface';
import SecureLog from '../src/secureLog';

const actualProcessEnv = Object.assign({}, process.env);

const mockMethodNames = ['log', 'warn', 'error'] as const;

const mockObj: {
  [K in typeof mockMethodNames[number]]?: jest.Mock | any;
} = mockMethodNames.reduce(
  (accObj, key) => ({ ...accObj, [key]: jest.fn() }),
  {}
);

const resetMocks = () => {
  mockMethodNames.forEach(methodName => mockObj[methodName]?.mockReset());
};

const mockConsoleMethods = () => {
  mockMethodNames.forEach(methodName => {
    const mockedMethod = mockObj[methodName];
    console[methodName] = mockedMethod ?? console[methodName];
  });
};

const secrets = { PORT: '9200' };

const setupConsoleMocks = () => {
  resetMocks();
  mockConsoleMethods();
};

let secureLog: SecureLog;
const setup = (options: IOptions = {}) => {
  setupConsoleMocks();
  process.env = secrets;
  secureLog = new SecureLog(options);
};

const cleanup = () => {
  secureLog.useActualConsole();
  Object.assign(process.env, actualProcessEnv);
  console.log('Cleaned up Mocks');
};

describe('Test console.log', () => {
  beforeEach(() =>
    setup({
      forceNewInstance: true,
      globalConsoleObject: console,
    })
  );
  afterEach(() => cleanup());

  it('should have called console.log with hello', () => {
    secureLog.log('hello');
    expect(mockObj.log).toHaveBeenCalledWith(
      'Onboardbase Signatures here:',
      'hello'
    );
  });

  it('should have called console.warn with hello warn', () => {
    secureLog.warn('hello warn');
    expect(mockObj.warn).toHaveBeenCalledWith(
      'Onboardbase Signatures here:',
      'hello warn'
    );
  });

  it('should have called console.error with hello error', () => {
    secureLog.error('hello error');
    expect(mockObj.error).toHaveBeenCalledWith(
      'Onboardbase Signatures here:',
      'hello error'
    );
  });

  it('should mask secrets when they are part of log', () => {
    secureLog.log(`running on port ${secrets.PORT}`);
    expect(mockObj.warn).toHaveBeenCalledWith(
      'the value of the secret: "PORT", is being leaked!'
    );
  });
});
